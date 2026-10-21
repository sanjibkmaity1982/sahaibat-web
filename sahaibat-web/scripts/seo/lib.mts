// Shared helpers for the SEO engine: OpenAI (server-side only), files,
// GitHub and HTTP. Everything here runs in GitHub Actions or locally, never in
// the browser, and never touches patient or clinical product data.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import OpenAI from "openai";

export const ROOT = path.join(import.meta.dirname, "..", "..");
export const SITE = (process.env.SEO_SITE_URL || "https://www.sahaibat.com").replace(/\/$/, "");
export const OUT = path.join(ROOT, ".seo");
export const MODEL = process.env.SEO_MODEL || "gpt-5";

fs.mkdirSync(OUT, { recursive: true });

export const log = (...a: unknown[]) => console.log(`[seo ${new Date().toISOString().slice(11, 19)}]`, ...a);

export function readJson<T = any>(file: string, fallback?: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}
export const writeOut = (name: string, data: unknown) =>
  fs.writeFileSync(path.join(OUT, name), typeof data === "string" ? data : JSON.stringify(data, null, 2));
export const readOut = <T = any,>(name: string, fallback?: T) => readJson<T>(path.join(OUT, name), fallback);

export const claims = () => readJson(path.join(ROOT, "content", "claims.json"));

// ── OpenAI ───────────────────────────────────────────────────────────────────

const KEY = process.env.SEO_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
export const hasOpenAI = !!KEY;
let client: OpenAI | null = null;
const ai = () => (client ??= new OpenAI({ apiKey: KEY, timeout: 240_000, maxRetries: 2 }));

/** One structured call. `web` lets the model search the web (Indonesia). */
export async function ask<T>(opts: {
  name: string;
  system: string;
  user: string;
  schema: Record<string, unknown>;
  web?: boolean;
  effort?: "minimal" | "low" | "medium" | "high";
}): Promise<{ data: T; citations: string[] }> {
  if (!hasOpenAI) throw new Error("SEO_OPENAI_API_KEY is not set");
  const res = await ai().responses.create({
    model: MODEL,
    instructions: opts.system,
    input: opts.user,
    reasoning: { effort: opts.web && opts.effort === "minimal" ? "low" : opts.effort || "low" },
    ...(opts.web ? { tools: [{ type: "web_search" as const, user_location: { type: "approximate" as const, country: "ID" } }] } : {}),
    text: { format: { type: "json_schema", name: opts.name, schema: opts.schema, strict: false } },
  });
  const citations: string[] = [];
  for (const item of res.output) {
    if (item.type !== "message") continue;
    for (const c of item.content) {
      if (c.type === "output_text") for (const a of c.annotations ?? []) if (a.type === "url_citation") citations.push(a.url);
    }
  }
  return { data: JSON.parse(res.output_text) as T, citations: [...new Set(citations)] };
}

// ── HTTP ─────────────────────────────────────────────────────────────────────

export async function fetchText(url: string, timeoutMs = 20_000) {
  const t0 = Date.now();
  try {
    const r = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(timeoutMs), headers: { "User-Agent": "SahAIbat-SEO-Audit/1.0 (+https://www.sahaibat.com)" } });
    return { status: r.status, location: r.headers.get("location"), body: r.status < 300 ? await r.text() : "", ms: Date.now() - t0, headers: r.headers };
  } catch (e) {
    return { status: 0, location: null, body: "", ms: Date.now() - t0, error: (e as Error).message, headers: new Headers() };
  }
}

/** Is an external link alive? Follows redirects; 401/403/429 count as alive (bot walls). */
export async function linkAlive(url: string) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const r = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(20_000), headers: { "User-Agent": "Mozilla/5.0 (compatible; SahAIbat-SEO/1.0)" } });
      if (r.status < 400 || [401, 403, 429].includes(r.status)) return { ok: true, status: r.status };
      if (method === "GET") return { ok: false, status: r.status };
    } catch (e) {
      if (method === "GET") return { ok: false, status: 0, error: (e as Error).message };
    }
  }
  return { ok: false, status: 0 };
}

export async function sitemapUrls(base = SITE): Promise<string[]> {
  const r = await fetchText(`${base}/sitemap.xml`);
  return [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://www.sahaibat.com", base));
}

// ── GitHub (Actions provides GITHUB_TOKEN and GITHUB_REPOSITORY) ─────────────

export const REPO = process.env.GITHUB_REPOSITORY || "sanjibkmaity1982/sahaibat-web";
export const hasGitHub = !!process.env.GITHUB_TOKEN;

export async function gh<T = any>(method: string, route: string, body?: unknown): Promise<T> {
  const r = await fetch(`https://api.github.com${route}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`GitHub ${method} ${route}: ${r.status} ${await r.text()}`);
  return (r.status === 204 ? null : await r.json()) as T;
}

export const git = (...args: string[]) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

export const today = () => new Date().toISOString().slice(0, 10);
