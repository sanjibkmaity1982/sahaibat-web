// Technical SEO auditor. Crawls every URL in the sitemap and checks what a
// search engine sees in the server-rendered HTML: status, title, description,
// one H1, canonical, structured data, indexability, speed and links.
//
//   node scripts/seo/audit.mts                      live site
//   SEO_SITE_URL=http://localhost:3000 node ...     local build (CI)
//   --strict                                        exit 1 on any error

import { SITE, fetchText, linkAlive, log, sitemapUrls, writeOut } from "./lib.mts";

type Issue = { url: string; level: "error" | "warn"; check: string; msg: string };

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
const metas = (html: string) => [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => m[0]);
const meta = (html: string, key: string) => {
  const t = metas(html).find((m) => attr(m, "name") === key || attr(m, "property") === key);
  return t ? attr(t, "content") : undefined;
};
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export async function audit(base = SITE) {
  const urls = await sitemapUrls(base);
  const issues: Issue[] = [];
  const pages: Record<string, unknown>[] = [];
  const internal = new Set<string>();
  const external = new Map<string, string>();
  const titles = new Map<string, string>();
  const add = (url: string, level: Issue["level"], check: string, msg: string) => issues.push({ url, level, check, msg });

  if (!urls.length) add(base, "error", "sitemap", "sitemap.xml is empty or unreachable");
  const robots = await fetchText(`${base}/robots.txt`);
  if (robots.status !== 200) add(`${base}/robots.txt`, "error", "robots", `robots.txt returned ${robots.status}`);
  else if (/Disallow:\s*\/\s*$/m.test(robots.body)) add(`${base}/robots.txt`, "error", "robots", "robots.txt disallows the whole site");
  const llms = await fetchText(`${base}/llms.txt`);
  if (llms.status !== 200) add(`${base}/llms.txt`, "warn", "llms", `llms.txt returned ${llms.status}`);

  for (const url of urls) {
    const r = await fetchText(url);
    const path = new URL(url).pathname;
    if (r.status !== 200) {
      add(url, "error", "status", `returned ${r.status}${r.location ? ` → ${r.location}` : ""}${(r as any).error ? ` (${(r as any).error})` : ""}`);
      continue;
    }
    const html = r.body;
    const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
    const desc = decode(meta(html, "description") ?? "");
    const canonical = [...html.matchAll(/<link\s[^>]*rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], "href"))[0];
    const robotsMeta = meta(html, "robots") ?? "";
    const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
    const lang = html.match(/<html[^>]*\slang="([^"]+)"/i)?.[1];
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
    const bytes = Buffer.byteLength(html);

    if (!title) add(url, "error", "title", "missing <title>");
    else if (title.length > 70) add(url, "warn", "title", `title is ${title.length} chars (keep under 65): "${title}"`);
    if (title) {
      if (titles.has(title)) add(url, "error", "title", `duplicate title with ${titles.get(title)}`);
      titles.set(title, path);
    }
    if (!desc) add(url, "error", "description", "missing meta description");
    else if (desc.length < 70 || desc.length > 170) add(url, "warn", "description", `description is ${desc.length} chars (aim for 70–160)`);
    if (h1s !== 1 && !path.startsWith("/en") && path !== "/" && path !== "/impact") add(url, h1s === 0 ? "error" : "warn", "h1", `${h1s} <h1> elements`);
    if (!canonical) add(url, "error", "canonical", "missing canonical");
    else if (new URL(canonical, url).pathname.replace(/\/$/, "") !== path.replace(/\/$/, "")) add(url, "error", "canonical", `canonical points elsewhere: ${canonical}`);
    if (/noindex/i.test(robotsMeta)) add(url, "error", "indexing", `robots meta "${robotsMeta}" on a sitemap URL`);
    if (!lang) add(url, "warn", "lang", "missing <html lang>");
    for (const block of ld) {
      try {
        JSON.parse(block);
      } catch {
        add(url, "error", "schema", "invalid JSON-LD block");
      }
    }
    if (!ld.length && path !== "/en" && !path.startsWith("/en/")) add(url, "warn", "schema", "no structured data");
    if (words < 250 && !["/privacy", "/terms"].some((p) => path.endsWith(p))) add(url, "warn", "content", `only ${words} words of server-rendered text`);
    if (r.ms > 2500) add(url, "warn", "speed", `server response took ${r.ms} ms`);
    if (bytes > 900_000) add(url, "warn", "weight", `HTML is ${(bytes / 1024).toFixed(0)} KB`);
    // Tags are removed without a space here so the logo's Sah<em>AI</em>bat reads as one word.
    const joined = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, "");
    if (/\bAI\b/.test(joined.replace(/SahAIbat/g, "").replace(/Klinikita AI|AI Scribe/g, ""))) add(url, "warn", "wording", 'visible text contains "AI"');

    for (const m of html.matchAll(/<a\s[^>]*href="([^"#][^"]*)"/gi)) {
      const href = decode(m[1]);
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const abs = new URL(href, url);
      if (abs.origin === new URL(base).origin) internal.add(abs.pathname);
      else if (/^https?:$/.test(abs.protocol) && !external.has(abs.href)) external.set(abs.href, path);
    }
    pages.push({ url, path, status: r.status, ms: r.ms, title, desc, canonical, h1s, words, schema: ld.length, kb: Math.round(bytes / 1024) });
  }

  // Internal links must work (redirects allowed); external sources must be alive.
  for (const p of internal) {
    const r = await fetchText(`${base}${p}`);
    if (r.status >= 400 || r.status === 0) add(`${base}${p}`, "error", "links", `internal link returns ${r.status}`);
  }
  for (const [href, from] of external) {
    if (/sahaibat(dok)?\.com|instagram|facebook|linkedin|tiktok|youtube|chromewebstore|nvidia/.test(href)) continue;
    const a = await linkAlive(href);
    if (!a.ok) add(href, "warn", "links", `external link on ${from} returns ${a.status}`);
  }

  const errors = issues.filter((i) => i.level === "error").length;
  log(`audit: ${pages.length} pages, ${errors} errors, ${issues.length - errors} warnings`);
  const result = { at: new Date().toISOString(), base, pages, issues };
  writeOut("audit.json", result);
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await audit();
  for (const i of r.issues) console.log(`${i.level === "error" ? "✖" : "⚠"} [${i.check}] ${i.url}: ${i.msg}`);
  if (process.argv.includes("--strict") && r.issues.some((i) => i.level === "error")) process.exit(1);
}
