// AI discovery monitor. Asks a fixed set of Bahasa questions (content/
// keywords.json → visibilityQuestions) to a web-searching model, the way a
// doctor would ask an AI assistant, and records whether SahAIbat is mentioned
// and cited, and whether what is said matches the claims registry.
//
// This is a sample of one assistant on one day, not a measurement of all AI
// search; the report treats it as a trend signal only.

import path from "node:path";
import { ROOT, ask, claims, hasOpenAI, log, readJson, writeOut } from "./lib.mts";

const ANSWER = {
  type: "object",
  additionalProperties: false,
  required: ["answer", "products"],
  properties: {
    answer: { type: "string" },
    products: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "url"], properties: { name: { type: "string" }, url: { type: ["string", "null"] } } } },
  },
};

const GRADE = {
  type: "object",
  additionalProperties: false,
  required: ["accurate", "problems"],
  properties: { accurate: { type: "boolean" }, problems: { type: "array", items: { type: "string" } } },
};

const OURS = /sahaibat(dok)?\.com/i;

export async function visibility() {
  if (!hasOpenAI) {
    const r = { available: false, results: [] };
    writeOut("visibility.json", r);
    return r;
  }
  const questions: string[] = readJson(path.join(ROOT, "content", "keywords.json")).visibilityQuestions;
  const facts = claims().verified.map((c: any) => c.claim);
  const results = [];
  for (const q of questions) {
    try {
      const { data, citations } = await ask<{ answer: string; products: { name: string; url: string | null }[] }>({
        name: "search_answer",
        web: true,
        effort: "low",
        system: "Answer the user's question as a helpful assistant would for a user in Indonesia, using web search. Name the specific products or services you recommend, with their website. Answer in Bahasa Indonesia.",
        user: q,
        schema: ANSWER,
      });
      const mentioned = /sah\s?ai\s?bat/i.test(data.answer) || data.products.some((p) => /sah\s?ai\s?bat/i.test(p.name));
      const cited = citations.some((u) => OURS.test(u)) || data.products.some((p) => p.url && OURS.test(p.url));
      let grade: { accurate: boolean; problems: string[] } | null = null;
      if (mentioned) {
        grade = (await ask<{ accurate: boolean; problems: string[] }>({
          name: "brand_accuracy",
          effort: "low",
          system: "Compare what this answer says about SahAIbat with the verified facts. List each statement about SahAIbat that is wrong, outdated or unsupported by the facts. Ignore statements about other companies.",
          user: JSON.stringify({ facts, answer: data.answer }),
          schema: GRADE,
        })).data;
      }
      results.push({ question: q, mentioned, cited, accurate: grade?.accurate ?? null, problems: grade?.problems ?? [], competitors: data.products.map((p) => p.name).filter((n) => !/sah\s?ai\s?bat/i.test(n)).slice(0, 6), citations: citations.slice(0, 8) });
      log(`visibility: ${mentioned ? "✓" : "·"} ${cited ? "cited" : "      "} ${q}`);
    } catch (e) {
      results.push({ question: q, error: (e as Error).message });
    }
  }
  const out = { available: true, at: new Date().toISOString(), mentionRate: results.filter((r: any) => r.mentioned).length / results.length, citeRate: results.filter((r: any) => r.cited).length / results.length, results };
  writeOut("visibility.json", out);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) await visibility();
