// Validates every page in content/pages against the schema, the claims
// registry and the site's link graph. Runs on every PR (and before any draft
// PR is opened). Exit code 1 means the page must not be published.
//
//   node scripts/seo/validate.mts            all pages
//   node scripts/seo/validate.mts a.json     only these files

import fs from "node:fs";
import path from "node:path";
import { PageSchema, pagePath, type Page } from "../../lib/seo/schema.ts";

const ROOT = path.join(import.meta.dirname, "..", "..");
const DIR = path.join(ROOT, "content", "pages");
const claims = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "claims.json"), "utf8"));

// Routes that exist outside content/pages.
const STATIC_ROUTES = ["/", "/en", "/impact", "/en/impact", "/privacy", "/en/privacy", "/terms", "/en/terms", "/panduan"];
const OFFICIAL = /(^|\.)go\.id$|(^|\.)kemkes\.go\.id$|(^|\.)bpjs-kesehatan\.go\.id$|(^|\.)who\.int$/;
const REGULATORY = new Set(["rme", "satusehat", "bpjs", "bidan", "posyandu"]);

type Issue = { file: string; level: "error" | "warn"; msg: string };

export function validate(files?: string[]): Issue[] {
  const issues: Issue[] = [];
  const all = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  const pages: { file: string; page: Page }[] = [];

  for (const file of all) {
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
    } catch (e) {
      issues.push({ file, level: "error", msg: `invalid JSON: ${(e as Error).message}` });
      continue;
    }
    const r = PageSchema.safeParse(raw);
    if (!r.success) {
      for (const i of r.error.issues) issues.push({ file, level: "error", msg: `${i.path.join(".")}: ${i.message}` });
      continue;
    }
    if (r.data.slug + ".json" !== file) issues.push({ file, level: "error", msg: `file name must be ${r.data.slug}.json` });
    pages.push({ file, page: r.data });
  }

  const routes = new Set([...STATIC_ROUTES, ...pages.filter((p) => p.page.status === "published").map((p) => pagePath(p.page))]);
  const titles = new Map<string, string>();
  const today = new Date().toISOString().slice(0, 10);

  for (const { file, page } of pages) {
    if (files && !files.some((f) => path.basename(f) === file)) continue;
    const add = (level: Issue["level"], msg: string) => issues.push({ file, level, msg });

    // unique titles and paths across the site
    const prev = titles.get(page.title.toLowerCase());
    if (prev) add("error", `duplicate title with ${prev}`);
    titles.set(page.title.toLowerCase(), file);
    if (STATIC_ROUTES.includes(pagePath(page))) add("error", `${pagePath(page)} collides with an existing route`);

    // banned phrases anywhere in the page text
    const text = JSON.stringify(page);
    for (const b of claims.banned) {
      const re = new RegExp(b.pattern, `g${b.flags}`);
      for (const m of text.matchAll(re)) {
        const around = text.slice(Math.max(0, m.index! - 8), m.index! + m[0].length + 8);
        if (b.except?.some((e: string) => around.includes(e))) continue;
        if (b.allow?.some((a: string) => m[0].replace(/\s+/g, " ").toLowerCase().startsWith(a.toLowerCase()))) continue;
        add("error", `${b.reason} Found: "${text.slice(Math.max(0, m.index! - 30), m.index! + m[0].length + 30)}"`);
      }
    }

    // internal links must resolve; related pages must exist
    for (const m of text.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const href = m[1].split("#")[0] || "/";
      if (!routes.has(href)) add("error", `broken internal link ${m[1]}`);
    }
    for (const s of page.related) if (!pages.some((p) => p.page.slug === s)) add("error", `related page "${s}" does not exist`);
    if (!/^(\/|https:\/\/(www\.)?sahaibat(dok)?\.com)/.test(page.cta.href)) add("error", `CTA must point to sahaibat.com or sahaibatdok.com`);

    // regulatory and clinical pages need official sources
    if (REGULATORY.has(page.cluster) && page.section === "panduan") {
      const official = page.sources.filter((s) => OFFICIAL.test(new URL(s.url).hostname));
      if (page.sources.length < 2) add("error", "guides need at least 2 sources");
      if (!official.length) add("error", "regulatory guides need at least one official (.go.id or WHO) source");
      if (!page.reviewedBy) add("warn", "no named reviewer yet (reviewedBy)");
    }
    if (page.updated > today) add("error", `updated date ${page.updated} is in the future`);
    if (page.updated < page.published) add("error", "updated is before published");
    if (page.faq.length > 8) add("warn", "more than 8 FAQs; keep the ones people actually ask");
  }
  return issues;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const issues = validate(process.argv.slice(2).length ? process.argv.slice(2) : undefined);
  for (const i of issues) console.log(`${i.level === "error" ? "✖" : "⚠"} ${i.file}: ${i.msg}`);
  const errors = issues.filter((i) => i.level === "error").length;
  console.log(errors ? `\n${errors} error(s)` : `\n✓ content valid (${issues.length} warning(s))`);
  process.exit(errors ? 1 : 0);
}
