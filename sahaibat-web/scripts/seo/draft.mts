// Editorial assistant. Turns the top opportunities into reviewable pages:
//
//   new     a new page for an unserved, high-scoring cluster
//   refresh an existing page improved for queries it already ranks 4–20 for
//
// Each draft is written by OpenAI (with web search, so sources are real and
// current), checked by validate.mts and the claims registry, repaired up to
// twice, stripped of dead source links, then opened as a DRAFT pull request.
// Nothing is ever merged or published by this script: a person reviews the
// PR (and its Vercel preview) and merges it.

import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { PageSchema, pagePath, type Page } from "../../lib/seo/schema.ts";
import { validate } from "./validate.mts";
import { ROOT, REPO, ask, claims, gh, git, hasGitHub, hasOpenAI, linkAlive, log, readJson, readOut, today, writeOut } from "./lib.mts";

const DIR = path.join(ROOT, "content", "pages");
const MAX_NEW = Number(process.env.SEO_DRAFTS_PER_RUN ?? 2);
const MAX_REFRESH = Number(process.env.SEO_REFRESHES_PER_RUN ?? 1);
const PAGE_JSON_SCHEMA = z.toJSONSchema(PageSchema, { io: "input" }) as Record<string, unknown>;

const STYLE = `Write in natural, professional Bahasa Indonesia for doctors, clinic managers and midwives in Indonesia.
Rules (all mandatory):
- Never write "AI", "kecerdasan buatan" or "artificial intelligence". Say "Intelligence", "SahAIbat Intelligence" or "DOK Intelligence".
- State facts about SahAIbat ONLY from the facts list. Never invent features, prices, customers, numbers, awards or partnerships. The only DOK price is "Rp60 ribu per bulan" (and the free plan).
- Integrations are "terintegrasi", never "bersertifikat". Never imply Kemenkes or BPJS endorsement. No superlatives (terbaik, nomor 1, paling ...).
- Regulatory and clinical statements must come from official sources you actually found with web search (kemkes.go.id, satusehat.kemkes.go.id, jdih.kemkes.go.id, bpjs-kesehatan.go.id, who.int, peraturan.bpk.go.id, idai.or.id and similar). Put them in "sources" with the exact URL you visited. If you are not sure a rule is current, say so and point to the official source.
- Distinguish legal obligations from good practice and from SahAIbat features.
- Be genuinely useful first: answer the searcher's question in the intro and first section, with concrete steps, tables or checklists. Mention SahAIbat where it truly helps, not in every paragraph.
- Body text supports only **bold** and [links](/path). Link internally only to the paths listed under existingPages (plus "/", "/panduan", "/privacy").
- title ≤ 60 characters, description 120–160 characters, 3–6 sections, 3–6 FAQs people actually ask, "related" = 2–3 existing slugs.
- author "Tim SahAIbat". Do not set reviewedBy. published/updated = ${today()}. status "published" (publishing happens only when a person merges the pull request).
- CTA href "https://www.sahaibatdok.com" for doctor/clinic topics, "/#bidan" for midwife topics, "/#solutions" for Posyandu topics.`;

function existingPages(): Page[] {
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => PageSchema.parse(readJson(path.join(DIR, f))));
}

// Branches of every SEO PR, open or closed: a topic is drafted only once, so
// closing a draft PR rejects that topic. To try it again, write the page by
// hand or reopen the closed PR.
async function draftedBranches(): Promise<Set<string>> {
  if (!hasGitHub) return new Set();
  const refs = new Set<string>();
  for (let page = 1; page <= 5; page++) {
    const prs = await gh<any[]>("GET", `/repos/${REPO}/pulls?state=all&per_page=100&page=${page}`);
    for (const p of prs) if (String(p.head.ref).startsWith("seo/")) refs.add(p.head.ref);
    if (prs.length < 100) break;
  }
  return refs;
}

async function writePage(brief: Record<string, unknown>, file: string): Promise<{ page: Page; citations: string[] } | null> {
  const pages = existingPages();
  const context = {
    facts: claims().verified.map((c: any) => c.claim + (c.rule ? ` (rule: ${c.rule})` : "")),
    existingPages: pages.filter((p) => p.status === "published").map((p) => ({ path: pagePath(p), slug: p.slug, h1: p.h1 })),
    brief,
  };
  let feedback = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { data, citations } = await ask<Page>({
      name: "seo_page",
      effort: "medium",
      web: true,
      system: `You are the senior editor of SahAIbat's Indonesian healthcare guides. Produce one page as JSON matching the schema exactly.\n${STYLE}`,
      user: JSON.stringify(context) + (feedback ? `\n\nYour previous draft failed validation. Fix every issue and return the full page again:\n${feedback}` : ""),
      schema: PAGE_JSON_SCHEMA,
    });
    // Keep only sources that load.
    const alive = [];
    for (const s of data.sources ?? []) if ((await linkAlive(s.url)).ok) alive.push(s);
    data.sources = alive;
    fs.writeFileSync(path.join(DIR, file), JSON.stringify(data, null, 2) + "\n");
    const issues = validate([file]).filter((i) => i.file === file && i.level === "error");
    if (!issues.length) return { page: PageSchema.parse(data), citations };
    feedback = issues.map((i) => `- ${i.msg}`).join("\n");
    log(`draft: ${file} attempt ${attempt} failed:\n${feedback}`);
  }
  return null;
}

async function openPr(kind: "new" | "refresh", page: Page, file: string, why: string, citations: string[]) {
  const branch = `seo/${kind}-${page.slug}`;
  const title = kind === "new" ? `SEO draft: ${page.h1}` : `SEO refresh: ${page.h1}`;
  if (!hasGitHub) {
    log(`draft: (no GITHUB_TOKEN) ${title} written to content/pages/${file}; not opening a PR`);
    return null;
  }
  git("checkout", "-B", branch, "origin/main");
  git("add", `content/pages/${file}`);
  git("-c", "user.name=SahAIbat SEO", "-c", "user.email=seo-bot@sahaibat.com", "commit", "-m", `${title}\n\nDrafted by the weekly SEO run. Needs human review before merge.`);
  git("push", "-f", "origin", branch);
  git("checkout", "-");
  const body = [
    `**${kind === "new" ? "New page" : "Refresh of an existing page"}** at \`${pagePath(page)}\`, drafted by the weekly SEO run.`,
    "",
    "### Why",
    why,
    "",
    "### Before merging (required)",
    "- [ ] Every SahAIbat claim matches `content/claims.json`",
    "- [ ] Regulatory or clinical statements match the cited official sources",
    "- [ ] A named clinical/regulatory reviewer is added as `reviewedBy` (guides)",
    "- [ ] Read the page on the Vercel preview for this PR",
    "",
    "### Sources found during drafting",
    ...(citations.length ? citations.slice(0, 15).map((u) => `- ${u}`) : ["- (none reported)"]),
    "",
    "Validation (`npm run seo:validate`) passed before this PR was opened. Merging publishes the page; it is then submitted to IndexNow automatically.",
  ].join("\n");
  const pr = await gh<any>("POST", `/repos/${REPO}/pulls`, { title, head: branch, base: "main", body, draft: true });
  try {
    await gh("POST", `/repos/${REPO}/issues/${pr.number}/labels`, { labels: ["seo-draft"] });
  } catch {}
  log(`draft: opened PR #${pr.number} ${title}`);
  return { number: pr.number as number, url: pr.html_url as string, title };
}

export async function draft() {
  const result = { at: new Date().toISOString(), opened: [] as any[], skipped: [] as string[] };
  if (!hasOpenAI) {
    result.skipped.push("SEO_OPENAI_API_KEY not set");
    writeOut("drafts.json", result);
    return result;
  }
  const opp = readOut("opportunities.json", { newPages: [], quickWins: [] } as any);
  const open = await draftedBranches();
  const pages = existingPages();

  // New pages.
  for (const c of opp.newPages ?? []) {
    if (result.opened.filter((o) => o.kind === "new").length >= MAX_NEW) break;
    const slug = String(c.proposedSlug);
    if (pages.some((p) => p.slug === slug) || open.has(`seo/new-${slug}`)) {
      result.skipped.push(`${slug}: already exists or was drafted before`);
      continue;
    }
    const file = `${slug}.json`;
    const brief = { task: "new page", slug, section: c.proposedSection ?? "panduan", cluster: c.cluster, intent: c.intent, targetQueries: c.queries, rationale: c.rationale };
    const done = await writePage(brief, file);
    if (!done) {
      fs.rmSync(path.join(DIR, file), { force: true });
      result.skipped.push(`${slug}: failed validation after 3 attempts`);
      continue;
    }
    const why = `Cluster **${c.name}** (${c.intent}), score **${c.score}/100**${c.demandVerified ? `, ${c.impressions} Search Console impressions` : " (demand not yet verified in Search Console)"}.\n\nTarget queries: ${c.queries.slice(0, 12).join(", ")}\n\n${c.rationale}`;
    const pr = await openPr("new", done.page, file, why, done.citations);
    if (hasGitHub) fs.rmSync(path.join(DIR, file), { force: true });
    result.opened.push({ kind: "new", slug, ...(pr ?? {}) });
  }

  // Refreshes of pages that already rank 4–20.
  const byPath = new Map(pages.map((p) => [pagePath(p), p]));
  const refreshed = new Set<string>();
  for (const q of opp.quickWins ?? []) {
    if (result.opened.filter((o) => o.kind === "refresh").length >= MAX_REFRESH) break;
    const p = q.topPage ? byPath.get(new URL(q.topPage).pathname) : undefined;
    if (!p || refreshed.has(p.slug) || open.has(`seo/refresh-${p.slug}`)) continue;
    refreshed.add(p.slug);
    const queries = (opp.quickWins as any[]).filter((x) => x.topPage === q.topPage).map((x) => x.query);
    const file = `${p.slug}.json`;
    const original = fs.readFileSync(path.join(DIR, file), "utf8");
    const brief = { task: "improve this existing page so it fully answers these queries; keep slug, section, cluster and published date; set updated to today; keep every correct existing fact", page: p, queries, currentPosition: q.position };
    const done = await writePage(brief, file);
    if (!done) {
      fs.writeFileSync(path.join(DIR, file), original);
      result.skipped.push(`${p.slug}: refresh failed validation`);
      continue;
    }
    const pr = await openPr("refresh", done.page, file, `Ranks around position ${q.position} for: ${queries.join(", ")}.`, done.citations);
    if (hasGitHub) fs.writeFileSync(path.join(DIR, file), original);
    result.opened.push({ kind: "refresh", slug: p.slug, ...(pr ?? {}) });
  }

  writeOut("drafts.json", result);
  log(`draft: ${result.opened.length} opened, ${result.skipped.length} skipped`);
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) await draft();
