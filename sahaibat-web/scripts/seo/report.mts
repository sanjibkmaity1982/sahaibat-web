// Weekly report: one GitHub issue (label "seo-report") with the numbers that
// matter — non-branded clicks, opportunities, drafts waiting for review, AI
// search visibility and technical issues. Previous reports are closed so only
// the latest stays open. History (.seo/history.json) is carried between runs by
// the Actions cache, for week-over-week trends.

import fs from "node:fs";
import path from "node:path";
import { OUT, REPO, gh, hasGitHub, log, readOut, today, writeOut } from "./lib.mts";

const pct = (n: number | null | undefined) => (n == null ? "—" : `${Math.round(n * 100)}%`);
const delta = (a: number, b: number | null | undefined) => (b == null || b === 0 ? "" : ` (${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%)`);
const num = (n: number) => n.toLocaleString("id-ID");

export async function report() {
  const audit = readOut("audit.json", { pages: [], issues: [] } as any);
  const g = readOut("gsc.json", { available: false, sites: {} } as any);
  const opp = readOut("opportunities.json", { opportunities: [], quickWins: [], ctrGaps: [], dokDomain: [] } as any);
  const drafts = readOut("drafts.json", { opened: [], skipped: [] } as any);
  const vis = readOut("visibility.json", { available: false, results: [] } as any);
  const fun = readOut("funnel.json", { available: false } as any);
  const fc = readOut("factcheck.json", { available: false, pages: [] } as any);
  const historyFile = path.join(OUT, "history.json");
  const history: any[] = fs.existsSync(historyFile) ? JSON.parse(fs.readFileSync(historyFile, "utf8")) : [];
  const last = history.at(-1);

  const site = Object.values<any>(g.sites ?? {})[0];
  const t = site?.totals;
  const errors = audit.issues.filter((i: any) => i.level === "error");
  const warns = audit.issues.filter((i: any) => i.level === "warn");

  const md: string[] = [];
  md.push(`# SEO weekly report · ${today()}`, "");
  md.push("| Metric | This period | Note |", "|---|---|---|");
  md.push(t ? `| Non-branded clicks (28 days) | **${num(t.nonBranded.clicks)}**${delta(t.nonBranded.clicks, t.nonBrandedPrev.clicks)} | Discovery from searches without "SahAIbat" |` : "| Non-branded clicks | — | Search Console not connected yet |");
  if (t) md.push(`| Non-branded impressions | ${num(t.nonBranded.impressions)}${delta(t.nonBranded.impressions, t.nonBrandedPrev.impressions)} | |`, `| All clicks | ${num(t.all.clicks)}${delta(t.all.clicks, t.allPrev.clicks)} | |`);
  md.push(vis.available ? `| AI search: mentioned / cited | **${pct(vis.mentionRate)}** / ${pct(vis.citeRate)}${last?.mentionRate != null ? ` (last week ${pct(last.mentionRate)})` : ""} | ${vis.results.length} fixed questions, one assistant, a trend signal only |` : "| AI search visibility | — | OpenAI key not set |");
  if (fun.available) {
    const c = fun.cur, p = fun.prev;
    md.push(`| Landings from search engines | **${num(c.organic)}**${delta(c.organic, p.organic)} | Google, Bing and others, counted on the site |`);
    md.push(`| Landings from AI assistants | **${num(c.ai)}**${delta(c.ai, p.ai)} | ChatGPT, Perplexity, Gemini, Copilot |`);
    md.push(`| Clicks through to DOK | **${num(c.dokClicks)}**${delta(c.dokClicks, p.dokClicks)} | ${c.views ? pct(c.dokClicks / c.views) + " of landings" : ""}; sign-ups happen in the DOK app (utm_source=sahaibat.com) |`);
    md.push(`| Experience Zone demos | ${num(c.demos)}${delta(c.demos, p.demos)} | |`);
    const d = c.dok, dp = p.dok ?? { views: 0, demoStarts: 0, signupClicks: 0 };
    if (d) {
      md.push(`| sahaibatdok.com landings | **${num(d.views)}**${delta(d.views, dp.views)} | ${num((d.bySource.google ?? 0) + (d.bySource.bing ?? 0) + (d.bySource.search_other ?? 0))} from search, ${num((d.bySource.chatgpt ?? 0) + (d.bySource.perplexity ?? 0) + (d.bySource.ai_other ?? 0))} from AI assistants |`);
      md.push(`| DOK demo started → finished | ${num(d.demoStarts)} → ${num(d.demoDone)}${delta(d.demoStarts, dp.demoStarts)} | ${d.demoStarts ? pct(d.demoDone / d.demoStarts) + " finish" : ""} |`);
      md.push(`| DOK sign-up clicks | **${num(d.signupClicks)}**${delta(d.signupClicks, dp.signupClicks)} | ${d.views ? pct(d.signupClicks / d.views) + " of landings" : ""}; completed sign-ups are in the DOK app (utm_source=sahaibatdok.com) |`);
    }
  } else md.push("| On-site funnel | — | Upstash credentials not set for the weekly run |");
  if (fc.available) md.push(`| Fact check | ${fc.pages.filter((x: any) => x.verdict === "ok").length}/${fc.pages.length} pages clean | ${fc.pages.filter((x: any) => x.verdict === "wrong").length} with errors |`);
  md.push(`| Pages audited | ${audit.pages.length} | ${errors.length} errors, ${warns.length} warnings |`);
  md.push(`| Drafts opened for review | ${drafts.opened.length} | Merge a draft PR to publish it |`, "");

  if (drafts.opened.length) {
    md.push("## Waiting for your review", ...drafts.opened.map((d: any) => `- ${d.url ? `[#${d.number}](${d.url})` : d.slug} ${d.title ?? d.slug} (${d.kind})`), "");
  }

  const flagged = (fc.pages ?? []).filter((x: any) => x.problems?.length || x.verdict === "error");
  if (flagged.length) {
    md.push("## Fact check: needs attention", "");
    for (const x of flagged) {
      md.push(`**${x.path}** (${x.verdict})`, ...(x.error ? [`- check failed: ${x.error}`] : x.problems.map((pr: any) => `- ${pr.severity === "wrong" ? "✖" : "⚠"} "${pr.statement}": ${pr.issue}${pr.source ? ` ([source](${pr.source}))` : ""}`)), "");
    }
  }
  if (fun.available && (fun.cur.organic || fun.cur.ai)) {
    const top = (o: Record<string, number>) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 8);
    md.push("## Where visitors land", "", "| Page | From search | From AI assistants | DOK clicks |", "|---|---|---|---|");
    const pagesSet = new Set([...top(fun.cur.organicByPage), ...top(fun.cur.aiByPage)].map(([k]) => k));
    for (const p of pagesSet) md.push(`| ${p} | ${num(fun.cur.organicByPage[p] ?? 0)} | ${num(fun.cur.aiByPage[p] ?? 0)} | ${num(fun.cur.dokClicksByPage[p] ?? 0)} |`);
    md.push("");
  }
  if (fun.available && fun.cur.dok?.views) {
    const d = fun.cur.dok;
    const top = (o: Record<string, number>, n = 8) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
    md.push("## sahaibatdok.com funnel", "", "| Page | Landings |", "|---|---|", ...top(d.byPage).map(([k, v]) => `| ${k} | ${num(v)} |`), "");
    if (Object.keys(d.personas).length) md.push(`Personas chosen: ${top(d.personas).map(([k, v]) => `${k} ${num(v)}`).join(" · ")}`, "");
    if (Object.keys(d.signupByPlacement).length) md.push(`Sign-up clicks by button: ${top(d.signupByPlacement).map(([k, v]) => `${k} ${num(v)}`).join(" · ")}`, "");
  }
  if (opp.opportunities?.length) {
    md.push("## Top opportunities", "", "| Score | Cluster | Intent | Page | Demand |", "|---|---|---|---|---|");
    for (const o of opp.opportunities.slice(0, 12)) {
      md.push(`| ${o.score} | ${o.name} | ${o.intent} | ${o.existingPage ?? (o.proposedSlug ? `new: /${o.proposedSection === "panduan" ? "panduan/" : ""}${o.proposedSlug}` : "—")}${o.domain === "sahaibatdok.com" ? " (sahaibatdok.com)" : ""} | ${o.demandVerified ? `${num(o.impressions)} impressions` : "unverified"} |`);
    }
    md.push("");
  }
  if (opp.quickWins?.length) {
    md.push("## Quick wins (ranking 4–20)", "", "| Query | Position | Impressions | Page |", "|---|---|---|---|");
    for (const q of opp.quickWins.slice(0, 10)) md.push(`| ${q.query} | ${q.position} | ${num(q.impressions)} | ${q.topPage ? new URL(q.topPage).pathname : "—"} |`);
    md.push("");
  }
  if (opp.ctrGaps?.length) {
    md.push("## Ranking well, rarely clicked", ...opp.ctrGaps.map((q: any) => `- **${q.query}**: position ${q.position}, ${num(q.impressions)} impressions, ${q.clicks} clicks → rewrite the title and description of ${q.topPage ? new URL(q.topPage).pathname : "the page"}`), "");
  }
  if (opp.dokDomain?.length) {
    md.push("## For sahaibatdok.com", "These clusters belong to the DOK product site, not sahaibat.com:", ...opp.dokDomain.slice(0, 6).map((o: any) => `- ${o.name} (score ${o.score}): ${o.queries.slice(0, 5).join(", ")}`), "");
  }
  if (vis.available) {
    md.push("## AI search visibility", "", "| Question | Mentioned | Cited | Accurate | Recommended instead |", "|---|---|---|---|---|");
    for (const r of vis.results) md.push(r.error ? `| ${r.question} | error | | | ${r.error.slice(0, 60)} |` : `| ${r.question} | ${r.mentioned ? "✓" : "·"} | ${r.cited ? "✓" : "·"} | ${r.accurate == null ? "" : r.accurate ? "✓" : `✖ ${r.problems.length} wrong`} | ${r.competitors.join(", ")} |`);
    md.push("");
    const wrong = [...new Set(vis.results.flatMap((r: any) => r.problems ?? []))] as string[];
    if (wrong.length) {
      md.push("### What assistants get wrong about SahAIbat", "They learn this from pages on the web, often old ones. Fix the source page (or publish a clear, correct one) and it fades over the following weeks.", "", ...wrong.slice(0, 15).map((w) => `- ${w}`), "");
    }
  }
  md.push("## Technical issues", errors.length ? "" : "No errors.", ...errors.slice(0, 30).map((i: any) => `- ✖ **${i.check}** ${new URL(i.url).pathname}: ${i.msg}`));
  if (warns.length) md.push("", `<details><summary>${warns.length} warnings</summary>`, "", ...warns.slice(0, 60).map((i: any) => `- ${i.check} ${i.url}: ${i.msg}`), "", "</details>");
  if (drafts.skipped.length) md.push("", "<details><summary>Skipped drafts</summary>", "", ...drafts.skipped.map((s: string) => `- ${s}`), "", "</details>");
  md.push("", "---", "_Generated by the weekly SEO run (`.github/workflows/seo-weekly.yml`). Drafts are never published without review._");

  const body = md.join("\n");
  writeOut("report.md", body);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, body);

  history.push({ date: today(), organicLandings: fun.available ? fun.cur.organic : null, aiLandings: fun.available ? fun.cur.ai : null, dokClicks: fun.available ? fun.cur.dokClicks : null, nonBrandedClicks: t?.nonBranded.clicks ?? null, nonBrandedImpressions: t?.nonBranded.impressions ?? null, mentionRate: vis.available ? vis.mentionRate : null, citeRate: vis.available ? vis.citeRate : null, auditErrors: errors.length, drafts: drafts.opened.length });
  fs.writeFileSync(historyFile, JSON.stringify(history.slice(-104), null, 2));

  if (hasGitHub) {
    try {
      const open = await gh<any[]>("GET", `/repos/${REPO}/issues?labels=seo-report&state=open&per_page=20`);
      const issue = await gh<any>("POST", `/repos/${REPO}/issues`, { title: `SEO weekly report · ${today()}`, body, labels: ["seo-report"] });
      for (const o of open) await gh("PATCH", `/repos/${REPO}/issues/${o.number}`, { state: "closed", state_reason: "completed" });
      log(`report: issue #${issue.number}`);
    } catch (e) {
      log(`report: could not post the issue (${(e as Error).message}); the report is in the run summary`);
    }
  }
  return body;
}

if (import.meta.url === `file://${process.argv[1]}`) console.log(await report());
