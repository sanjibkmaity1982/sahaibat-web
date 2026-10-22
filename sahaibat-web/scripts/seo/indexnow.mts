// IndexNow: tells Bing, Yandex, Seznam and Naver (and the AI assistants that
// search with Bing) that pages changed, so they are recrawled within hours.
// Google does not use IndexNow; it reads the sitemap.
//
//   node scripts/seo/indexnow.mts            every URL in the live sitemap
//   node scripts/seo/indexnow.mts /a /b      only these paths

import { SITE, log, sitemapUrls } from "./lib.mts";
import { INDEXNOW_KEY } from "../../lib/seo/indexnow-key.ts";

export async function indexnow(paths?: string[], base = SITE) {
  const host = new URL(base).host;
  // Only the production sites (sahaibat.com, sahaibatdok.com); never preview or local URLs.
  if (!/(^|\.)sahaibat(dok)?\.com$/.test(host)) return log(`indexnow: ${host} is not production, skipping`);
  const urlList = paths?.length ? paths.map((p) => new URL(p, base).href) : await sitemapUrls(base);
  if (!urlList.length) return log("indexnow: no URLs");
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${base}/${INDEXNOW_KEY}.txt`, urlList }),
  });
  log(`indexnow: ${host} submitted ${urlList.length} URLs → ${r.status}`);
  if (r.status >= 400) throw new Error(`IndexNow ${r.status}: ${await r.text()}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await indexnow(process.argv.slice(2));
