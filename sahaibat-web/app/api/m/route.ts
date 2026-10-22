// POST /api/m: privacy-friendly, aggregate measurement for the website.
//
// Counts page views and clicks through to DOK per day, page and traffic source
// (search engine, AI assistant, social, direct). No cookies, no IP address, no
// user identifier and no fingerprinting are stored: only counters in one hash
// per day, e.g.  m:2026-10-22 → "view|google|/rekam-medis-elektronik" = 14.
// Counters expire after ~25 months. Described in the privacy policy under
// "This website and the Experience Zone".

import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const TTL = 60 * 60 * 24 * 760;

// dok_* events come from www.sahaibatdok.com (paths under /dok).
const EVENTS = new Set(["view", "dok_click", "demo_start", "dok_view", "dok_persona", "dok_demo_start", "dok_demo_done", "dok_signup"]);
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor/i;

// Referrer host → a small fixed set of sources. The referrer itself is not
// kept. Order matters: AI assistants first (Gemini lives on google.com).
const SOURCES: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)(copilot\.microsoft\.com|gemini\.google\.com|claude\.ai|meta\.ai)$/, "ai_other"],
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)(duckduckgo\.com|search\.yahoo\.com|yandex\.|ecosia\.org|search\.brave\.com)/, "search_other"],
  [/(^|\.)(facebook\.com|instagram\.com|t\.co|x\.com|linkedin\.com|lnkd\.in|tiktok\.com|youtube\.com|whatsapp\.com|wa\.me)$/, "social"],
  [/(^|\.)sahaibat(dok)?\.com$/, "internal"],
];

function source(ref: string | undefined, utm: string | undefined): string {
  if (utm && /^[a-z0-9_.-]{2,30}$/i.test(utm)) return `utm_${utm.toLowerCase()}`;
  if (!ref) return "direct";
  let host = "";
  try {
    host = new URL(ref).hostname.toLowerCase();
  } catch {
    return "other";
  }
  if (host === "localhost") return "internal";
  return SOURCES.find(([re]) => re.test(host))?.[1] ?? "other";
}

export async function POST(req: NextRequest) {
  if (!REST_URL || !REST_TOKEN || BOT.test(req.headers.get("user-agent") ?? "") || req.headers.get("sec-gpc") === "1") {
    return new Response(null, { status: 204 });
  }
  let body: { e?: string; p?: string; r?: string; u?: string };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 204 });
  }
  const path = typeof body.p === "string" ? body.p.split(/[?#]/)[0].replace(/\/$/, "") || "/" : "";
  if (!EVENTS.has(String(body.e)) || !/^\/[a-z0-9/_-]{0,80}$/i.test(path)) return new Response(null, { status: 204 });

  const day = new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10); // WIB
  const field = `${body.e}|${source(body.r, body.u)}|${path.toLowerCase()}`;
  try {
    await fetch(`${REST_URL}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify([["HINCRBY", `m:${day}`, field, "1"], ["EXPIRE", `m:${day}`, String(TTL)]]),
      cache: "no-store",
    });
  } catch {}
  return new Response(null, { status: 204 });
}
