// Acquisition funnel from the site's own aggregate counters (app/api/m):
// landing views by source and page → demo runs → clicks through to DOK, for
// the last 28 days and the 28 before. Sign-ups and activation happen on
// sahaibatdok.com; links carry utm_source=sahaibat.com so DOK can attribute
// them on its side.
//
//   UPSTASH_REDIS_REST_URL / KV_REST_API_URL
//   UPSTASH_REDIS_REST_TOKEN / KV_REST_API_READ_ONLY_TOKEN (read-only is enough)

import { log, writeOut } from "./lib.mts";

const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_READ_ONLY_TOKEN ?? process.env.UPSTASH_REDIS_REST_READ_ONLY_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const ORGANIC = new Set(["google", "bing", "search_other"]);
const AI = new Set(["chatgpt", "perplexity", "ai_other"]);

type Dok = { views: number; bySource: Record<string, number>; byPage: Record<string, number>; personas: Record<string, number>; demoStarts: number; demoDone: number; signupClicks: number; signupByPlacement: Record<string, number> };
const emptyDok = (): Dok => ({ views: 0, bySource: {}, byPage: {}, personas: {}, demoStarts: 0, demoDone: 0, signupClicks: 0, signupByPlacement: {} });

type Counts = { views: number; organic: number; ai: number; dokClicks: number; demos: number; bySource: Record<string, number>; organicByPage: Record<string, number>; aiByPage: Record<string, number>; dokClicksByPage: Record<string, number>; dok: Dok };

const empty = (): Counts => ({ views: 0, organic: 0, ai: 0, dokClicks: 0, demos: 0, bySource: {}, organicByPage: {}, aiByPage: {}, dokClicksByPage: {}, dok: emptyDok() });
const bump = (o: Record<string, number>, k: string, n: number) => (o[k] = (o[k] ?? 0) + n);

async function days(from: number, to: number): Promise<Counts> {
  const keys: string[] = [];
  for (let d = from; d < to; d++) keys.push(`m:${new Date(Date.now() + 7 * 3600_000 - d * 86400000).toISOString().slice(0, 10)}`);
  const r = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(keys.map((k) => ["HGETALL", k])),
  });
  if (!r.ok) throw new Error(`Upstash ${r.status}`);
  const c = empty();
  for (const { result } of (await r.json()) as { result: string[] | null }[]) {
    for (let i = 0; i < (result?.length ?? 0); i += 2) {
      const [event, src, path] = result![i].split("|");
      const n = Number(result![i + 1]);
      // www.sahaibatdok.com: its own funnel, kept apart from sahaibat.com.
      if (event.startsWith("dok_") && event !== "dok_click") {
        const d = c.dok;
        const rest = path.replace(/^\/dok/, "") || "/";
        if (event === "dok_view") {
          if (src === "internal") continue;
          d.views += n;
          bump(d.bySource, src, n);
          bump(d.byPage, rest, n);
        } else if (event === "dok_persona") bump(d.personas, rest.split("/").pop() || "?", n);
        else if (event === "dok_demo_start") d.demoStarts += n;
        else if (event === "dok_demo_done") d.demoDone += n;
        else if (event === "dok_signup") {
          d.signupClicks += n;
          bump(d.signupByPlacement, rest.split("/").pop() || "?", n);
        }
        continue;
      }
      if (event === "view") {
        if (src === "internal") continue; // a page within a visit, not a landing
        c.views += n;
        bump(c.bySource, src, n);
        if (ORGANIC.has(src)) {
          c.organic += n;
          bump(c.organicByPage, path, n);
        }
        if (AI.has(src)) {
          c.ai += n;
          bump(c.aiByPage, path, n);
        }
      } else if (event === "dok_click") {
        c.dokClicks += n;
        bump(c.dokClicksByPage, path, n);
      } else if (event === "demo_start") c.demos += n;
    }
  }
  return c;
}

export async function funnel() {
  if (!URL_ || !TOKEN) {
    log("funnel: Upstash credentials not set, skipping");
    const out = { available: false };
    writeOut("funnel.json", out);
    return out;
  }
  const cur = await days(1, 29);
  const prev = await days(29, 57);
  const out = { available: true, cur, prev };
  writeOut("funnel.json", out);
  log(`funnel: ${cur.views} landings (${cur.organic} organic, ${cur.ai} from AI assistants), ${cur.dokClicks} DOK clicks`);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) await funnel();
