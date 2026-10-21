// lib/experience/limits.ts
//
// Spend control for the Experience Zone. Three counters, all fixed-window:
//   - per visitor per minute   (burst)
//   - per visitor per day      (EXPERIENCE_IP_DAILY_LIMIT, default 15 = 3 runs x 5 demos)
//   - whole site per day       (EXPERIENCE_DAILY_CAP, default 300)
//
// Counters live in Upstash Redis / Vercel KV when its REST credentials are set.
// Without them they fall back to this server instance's memory, which is fine
// for local work but not a real cap on a serverless deployment.
//
// Visitors are counted by a salted hash of their IP; the IP itself is never stored.

import { createHash } from "crypto";

const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const memory = new Map<string, { n: number; exp: number }>();

async function incr(key: string, ttlSeconds: number): Promise<number> {
  if (REST_URL && REST_TOKEN) {
    const res = await fetch(`${REST_URL}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
      // Create the counter with its expiry only if it doesn't exist yet, then
      // count. INCR keeps the TTL, and this works on every Redis version.
      body: JSON.stringify([
        ["SET", key, "0", "EX", String(ttlSeconds), "NX"],
        ["INCR", key],
      ]),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`rate-limit store ${res.status}`);
    const out = (await res.json()) as Array<{ result?: number; error?: string }>;
    if (typeof out[1]?.result !== "number") throw new Error("rate-limit store reply");
    return out[1].result;
  }
  const now = Date.now();
  const cur = memory.get(key);
  if (!cur || cur.exp < now) {
    memory.set(key, { n: 1, exp: now + ttlSeconds * 1000 });
    return 1;
  }
  cur.n += 1;
  return cur.n;
}

const num = (v: string | undefined, d: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : d;
};

export function visitorId(ip: string): string {
  const salt = process.env.EXPERIENCE_HASH_SALT ?? "sahaibat-experience";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function takeRun(visitor: string): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const minute = Math.floor(Date.now() / 60000);
  const [burst, daily, site] = await Promise.all([
    incr(`xz:m:${visitor}:${minute}`, 60),
    incr(`xz:d:${visitor}:${day}`, 86400),
    incr(`xz:all:${day}`, 86400),
  ]);
  return (
    burst <= 3 &&
    daily <= num(process.env.EXPERIENCE_IP_DAILY_LIMIT, 15) &&
    site <= num(process.env.EXPERIENCE_DAILY_CAP, 300)
  );
}
