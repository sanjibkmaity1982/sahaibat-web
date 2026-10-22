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
  md.push(`| Pages audited | ${audit.pages.length} | ${errors.length} errors, ${warns.length} warnings |`);
  md.push(`| Drafts opened for review | ${drafts.opened.length} | Merge a draft PR to publish it |`, "");

  if (drafts.opened.length) {
    md.push("## Waiting for your review", ...drafts.opened.map((d: any) => `- ${d.url ? `[#${d.number}](${d.url})` : d.slug} ${d.title ?? d.slug} (${d.kind})`), "");
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
    for (const r of vis.results) md.push(r.error ? `| ${r.question} | error | | | ${r.error.slice(0, 60)} |` : `| ${r.question} | ${r.mentioned ? "✓" : "·"} | ${r.cited ? "✓" : "·"} | ${r.accurate == null ? "" : r.accurate ? "✓" : "✖ " + r.problems.join("; ")} | ${r.competitors.join(", ")} |`);
    md.push("");
  }
  md.push("## Technical issues", errors.length ? "" : "No errors.", ...errors.slice(0, 30).map((i: any) => `- ✖ **${i.check}** ${new URL(i.url).pathname}: ${i.msg}`));
  if (warns.length) md.push("", `<details><summary>${warns.length} warnings</summary>`, "", ...warns.slice(0, 60).map((i: any) => `- ${i.check} ${i.url}: ${i.msg}`), "", "</details>");
  if (drafts.skipped.length) md.push("", "<details><summary>Skipped drafts</summary>", "", ...drafts.skipped.map((s: string) => `- ${s}`), "", "</details>");
  md.push("", "---", "_Generated by the weekly SEO run (`.github/workflows/seo-weekly.yml`). Drafts are never published without review._");

  const body = md.join("\n");
  writeOut("report.md", body);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, body);

  history.push({ date: today(), nonBrandedClicks: t?.nonBranded.clicks ?? null, nonBrandedImpressions: t?.nonBranded.impressions ?? null, mentionRate: vis.available ? vis.mentionRate : null, citeRate: vis.available ? vis.citeRate : null, auditErrors: errors.length, drafts: drafts.opened.length });
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
