// Loads the SEO pages from content/pages at build time.
import fs from "node:fs";
import path from "node:path";
import { PageSchema, pagePath, type Page } from "./schema";

const DIR = path.join(process.cwd(), "content", "pages");

let cache: Page[] | null = null;

export function allPages(): Page[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      const r = PageSchema.safeParse(raw);
      if (!r.success) throw new Error(`content/pages/${f}: ${r.error.message}`);
      return r.data;
    });
  return cache;
}

export const publishedPages = () => allPages().filter((p) => p.status === "published");

export const findPage = (section: Page["section"], slug: string) =>
  publishedPages().find((p) => p.section === section && p.slug === slug);

export { pagePath };
