// Automated fact check of every published page. Each week a web-searching
// model reads the page, checks each regulatory, clinical or numeric statement
// against its cited sources and the current official information, and checks
// every SahAIbat statement against the claims registry. Problems go into the
// weekly report; pages with problems are queued for a refresh draft.
//
// This replaces a named human reviewer for routine checks. It cannot replace
// professional judgement, so anything it flags still goes to a person.

import fs from "node:fs";
import path from "node:path";
import { PageSchema, pagePath } from "../../lib/seo/schema.ts";
import { ROOT, ask, claims, hasOpenAI, log, readJson, writeOut } from "./lib.mts";

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "problems"],
  properties: {
    verdict: { type: "string", enum: ["ok", "minor", "wrong"] },
    problems: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["statement", "issue", "severity", "source"],
        properties: { statement: { type: "string" }, issue: { type: "string" }, severity: { type: "string", enum: ["minor", "wrong"] }, source: { type: ["string", "null"] } },
      },
    },
  },
};

export async function factcheck() {
  if (!hasOpenAI) {
    const out = { available: false, pages: [] };
    writeOut("factcheck.json", out);
    return out;
  }
  const dir = path.join(ROOT, "content", "pages");
  const facts = claims().verified.map((c: any) => c.claim);
  const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => PageSchema.parse(readJson(path.join(dir, f)))).filter((p) => p.status === "published");
  const results = [];
  for (const p of pages) {
    try {
      const { data } = await ask<{ verdict: "ok" | "minor" | "wrong"; problems: any[] }>({
        name: "fact_check",
        web: true,
        effort: "medium",
        system: `You are a careful Indonesian health-regulation fact checker. Check the page below.
1. Every regulatory, clinical or numeric statement: is it correct and current according to official Indonesian sources (Kemenkes, SATUSEHAT, JDIH, BPJS Kesehatan, WHO and the page's own sources)? Search when unsure.
2. Every statement about SahAIbat: is it supported by the verified facts list? Anything not in the list is a problem.
Report only real problems, each with the exact statement, what is wrong, severity ("wrong" = incorrect or misleading, "minor" = imprecise or possibly outdated) and the official source that shows it. Verdict "ok" if there are none.`,
        user: JSON.stringify({ facts, page: p }),
        schema: SCHEMA,
      });
      results.push({ path: pagePath(p), slug: p.slug, ...data });
      log(`factcheck: ${data.verdict.padEnd(5)} ${pagePath(p)} (${data.problems.length})`);
    } catch (e) {
      results.push({ path: pagePath(p), slug: p.slug, verdict: "error", problems: [], error: (e as Error).message });
    }
  }
  const out = { available: true, at: new Date().toISOString(), pages: results };
  writeOut("factcheck.json", out);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) await factcheck();
