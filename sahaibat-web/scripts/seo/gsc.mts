// Google Search Console: queries and pages for the last 28 days and the 28
// before, for each property in GSC_SITES. Uses a service account (added as a
// user on the property) — no Google SDK, just a signed JWT.
//
//   GSC_SERVICE_ACCOUNT_JSON  the service account key JSON
//   GSC_SITES                 comma-separated, default "sc-domain:sahaibat.com"

import crypto from "node:crypto";
import { log, writeOut } from "./lib.mts";

const SA = process.env.GSC_SERVICE_ACCOUNT_JSON;
const SITES = (process.env.GSC_SITES || "sc-domain:sahaibat.com").split(",").map((s) => s.trim()).filter(Boolean);
const BRAND = /sah\s?a?i?\s?bat|sahaibat|sahabat dok|sahaibatdok|kasih sahaibat/i;

export type Row = { query: string; page: string; clicks: number; impressions: number; ctr: number; position: number };

async function token() {
  const sa = JSON.parse(SA!);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  if (!r.ok) throw new Error(`Google token: ${r.status} ${await r.text()}`);
  return (await r.json()).access_token as string;
}

const day = (offset: number) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

async function query(tok: string, site: string, start: string, end: string): Promise<Row[]> {
  const rows: Row[] = [];
  for (let startRow = 0; startRow < 25000; startRow += 5000) {
    const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["query", "page"], rowLimit: 5000, startRow, dataState: "final" }),
    });
    if (!r.ok) throw new Error(`Search Console ${site}: ${r.status} ${await r.text()}`);
    const batch = ((await r.json()).rows ?? []).map((x: any) => ({ query: x.keys[0], page: x.keys[1], clicks: x.clicks, impressions: x.impressions, ctr: x.ctr, position: x.position }));
    rows.push(...batch);
    if (batch.length < 5000) break;
  }
  return rows;
}

const sum = (rows: Row[], f: (r: Row) => boolean = () => true) => {
  const r = rows.filter(f);
  return { clicks: r.reduce((a, b) => a + b.clicks, 0), impressions: r.reduce((a, b) => a + b.impressions, 0) };
};

export async function gsc() {
  if (!SA) {
    log("gsc: GSC_SERVICE_ACCOUNT_JSON not set, skipping");
    const empty = { available: false, sites: {} };
    writeOut("gsc.json", empty);
    return empty;
  }
  const tok = await token();
  // Search Console data lags ~3 days.
  const cur = { start: day(31), end: day(3) };
  const prev = { start: day(59), end: day(32) };
  const sites: Record<string, unknown> = {};
  for (const site of SITES) {
    const now = await query(tok, site, cur.start, cur.end);
    const before = await query(tok, site, prev.start, prev.end);
    const nonBrand = (r: Row) => !BRAND.test(r.query);
    sites[site] = {
      period: cur,
      totals: { all: sum(now), nonBranded: sum(now, nonBrand), allPrev: sum(before), nonBrandedPrev: sum(before, nonBrand) },
      rows: now,
      prevRows: before,
    };
    log(`gsc: ${site} ${now.length} rows, ${sum(now, nonBrand).clicks} non-branded clicks`);
  }
  const out = { available: true, sites };
  writeOut("gsc.json", out);
  return out;
}

export const isBranded = (q: string) => BRAND.test(q);

if (import.meta.url === `file://${process.argv[1]}`) await gsc();
