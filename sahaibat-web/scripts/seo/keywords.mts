// Keyword analyst. Merges the seed matrix (content/keywords.json) with real
// Search Console queries, asks OpenAI to cluster them by search intent and map
// each cluster to an existing page or a proposed new one, then scores them in
// code with the strategy's formula:
//
//   priority = 0.30 commercial intent + 0.25 product fit
//            + 0.20 verified search opportunity + 0.15 attainability
//            + 0.10 proprietary evidence
//
// Search opportunity counts only Search Console impressions; without data it
// stays low and is marked unverified, so nothing is ranked on invented volume.

import fs from "node:fs";
import path from "node:path";
import { ROOT, ask, hasOpenAI, log, readJson, readOut, writeOut } from "./lib.mts";
import { isBranded, type Row } from "./gsc.mts";

const SCORE_W = { commercialIntent: 0.3, productFit: 0.25, searchOpportunity: 0.2, attainability: 0.15, proprietaryEvidence: 0.1 };

type Cluster = {
  name: string;
  cluster: string;
  intent: "transactional" | "informational" | "navigational" | "implementation";
  queries: string[];
  existingPage: string | null;
  proposedSlug: string | null;
  proposedSection: "landing" | "panduan" | null;
  domain: "sahaibat.com" | "sahaibatdok.com";
  commercialIntent: number;
  productFit: number;
  attainability: number;
  proprietaryEvidence: number;
  rationale: string;
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["clusters"],
  properties: {
    clusters: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "cluster", "intent", "queries", "existingPage", "proposedSlug", "proposedSection", "domain", "commercialIntent", "productFit", "attainability", "proprietaryEvidence", "rationale"],
        properties: {
          name: { type: "string" },
          cluster: { type: "string", enum: ["rme", "klinik", "satusehat", "bpjs", "clinical-intelligence", "bidan", "posyandu", "farmasi", "brand"] },
          intent: { type: "string", enum: ["transactional", "informational", "navigational", "implementation"] },
          queries: { type: "array", items: { type: "string" } },
          existingPage: { type: ["string", "null"] },
          proposedSlug: { type: ["string", "null"] },
          proposedSection: { type: ["string", "null"], enum: ["landing", "panduan", null] },
          domain: { type: "string", enum: ["sahaibat.com", "sahaibatdok.com"] },
          commercialIntent: { type: "number" },
          productFit: { type: "number" },
          attainability: { type: "number" },
          proprietaryEvidence: { type: "number" },
          rationale: { type: "string" },
        },
      },
    },
  },
};

function pagesIndex() {
  const dir = path.join(ROOT, "content", "pages");
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => {
    const p = readJson(path.join(dir, f));
    return { path: p.section === "panduan" ? `/panduan/${p.slug}` : `/${p.slug}`, slug: p.slug, h1: p.h1, cluster: p.cluster, keywords: p.keywords, status: p.status };
  });
}

/** Aggregate Search Console rows by query for the sahaibat.com property. */
function queryStats() {
  const g = readOut("gsc.json", { available: false, sites: {} as Record<string, any> });
  const by = new Map<string, { query: string; clicks: number; impressions: number; posSum: number; pages: Map<string, number> }>();
  for (const site of Object.values<any>(g.sites ?? {})) {
    for (const r of (site.rows ?? []) as Row[]) {
      const q = r.query.toLowerCase().trim();
      const s = by.get(q) ?? { query: q, clicks: 0, impressions: 0, posSum: 0, pages: new Map() };
      s.clicks += r.clicks;
      s.impressions += r.impressions;
      s.posSum += r.position * r.impressions;
      s.pages.set(r.page, (s.pages.get(r.page) ?? 0) + r.impressions);
      by.set(q, s);
    }
  }
  return {
    available: !!g.available,
    queries: [...by.values()].map((s) => ({
      query: s.query,
      clicks: s.clicks,
      impressions: s.impressions,
      position: s.impressions ? +(s.posSum / s.impressions).toFixed(1) : null,
      topPage: [...s.pages.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
      branded: isBranded(s.query),
    })),
  };
}

/** Pages already ranking 4–20 for a query with real impressions: refresh first. */
function quickWins(qs: ReturnType<typeof queryStats>["queries"]) {
  return qs
    .filter((q) => !q.branded && q.position && q.position >= 4 && q.position <= 20 && q.impressions >= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map((q) => ({ ...q, action: "Improve the ranking page for this query: answer it directly near the top, add it to the H2/FAQ, and link to it from related pages." }));
}

/** Ranking well but rarely clicked: the title/description needs work. */
function ctrGaps(qs: ReturnType<typeof queryStats>["queries"]) {
  return qs
    .filter((q) => !q.branded && q.position && q.position <= 5 && q.impressions >= 50 && q.clicks / q.impressions < 0.02)
    .slice(0, 10)
    .map((q) => ({ ...q, action: "Rewrite the title and meta description to match this query's intent." }));
}

export async function keywords() {
  const seeds = readJson(path.join(ROOT, "content", "keywords.json"));
  const stats = queryStats();
  const pages = pagesIndex();
  const nonBranded = stats.queries.filter((q) => !q.branded).sort((a, b) => b.impressions - a.impressions).slice(0, 300);
  const maxImp = Math.max(1, ...nonBranded.map((q) => q.impressions));

  let clusters: Cluster[] = [];
  if (hasOpenAI) {
    const { data } = await ask<{ clusters: Cluster[] }>({
      name: "keyword_clusters",
      effort: "medium",
      system: `You are a senior SEO strategist for Indonesian healthcare software. Cluster search queries by search intent (synonyms and typos of the same need go together; do not create near-duplicate clusters). Map each cluster to an existing page when one already serves the intent; otherwise propose ONE new page (slug in Bahasa, lowercase-hyphenated; section "landing" for commercial pages, "panduan" for how-to and regulatory guides). Respect domain ownership: detailed DOK product, pricing and scribe-feature pages belong to sahaibatdok.com; broad RME, clinic software, Kemenkes/SATUSEHAT/BPJS guidance, Bidan and Posyandu belong to sahaibat.com. Score 0–1: commercialIntent (likelihood the searcher becomes a doctor, clinic or institutional lead), productFit (SahAIbat genuinely serves it, per the facts), attainability (a new, honest, expert page could realistically rank against government and competitor pages), proprietaryEvidence (SahAIbat has original knowledge, demos or data to add). Never invent search volume. Do not propose pages that would need claims outside the facts.`,
      user: JSON.stringify({
        facts: readJson(path.join(ROOT, "content", "claims.json")).verified.map((c: any) => c.claim),
        seedClusters: seeds.clusters,
        searchConsole: stats.available ? nonBranded.map((q) => ({ q: q.query, impressions: q.impressions, clicks: q.clicks, position: q.position, page: q.topPage })) : "not connected yet",
        existingPages: pages,
      }),
      schema: SCHEMA,
    });
    clusters = data.clusters;
  } else {
    log("keywords: no OpenAI key, using the seed matrix only");
    clusters = seeds.clusters.map((c: any) => {
      const page = pages.find((p) => p.cluster === c.id);
      return { name: c.id, cluster: c.id, intent: "transactional", queries: c.seeds, existingPage: page?.path ?? null, proposedSlug: null, proposedSection: null, domain: c.domain, commercialIntent: c.priority === "P1" ? 0.8 : 0.5, productFit: 0.8, attainability: 0.5, proprietaryEvidence: 0.5, rationale: "seed matrix" };
    });
  }

  const statOf = new Map(stats.queries.map((q) => [q.query, q]));
  const scored = clusters.map((c) => {
    const imp = c.queries.reduce((a, q) => a + (statOf.get(q.toLowerCase())?.impressions ?? 0), 0);
    const verified = imp > 0;
    const searchOpportunity = verified ? Math.min(1, Math.log10(1 + imp) / Math.log10(1 + maxImp)) : 0.1;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const parts = { commercialIntent: clamp(c.commercialIntent), productFit: clamp(c.productFit), searchOpportunity, attainability: clamp(c.attainability), proprietaryEvidence: clamp(c.proprietaryEvidence) };
    const score = Math.round(100 * Object.entries(SCORE_W).reduce((a, [k, w]) => a + w * parts[k as keyof typeof parts], 0));
    return { ...c, impressions: imp, demandVerified: verified, parts, score };
  }).sort((a, b) => b.score - a.score);

  const out = {
    at: new Date().toISOString(),
    gscConnected: stats.available,
    opportunities: scored,
    newPages: scored.filter((c) => !c.existingPage && c.proposedSlug && c.domain === "sahaibat.com"),
    dokDomain: scored.filter((c) => c.domain === "sahaibatdok.com"),
    quickWins: quickWins(stats.queries),
    ctrGaps: ctrGaps(stats.queries),
  };
  writeOut("opportunities.json", out);
  log(`keywords: ${scored.length} clusters, ${out.newPages.length} new-page opportunities, ${out.quickWins.length} quick wins`);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) await keywords();
