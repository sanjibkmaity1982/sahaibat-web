// The shape of an SEO page in content/pages/*.json. Shared by the site (which
// renders the pages) and scripts/seo (which validates and drafts them), so a
// draft that passes `npm run seo:validate` is a page the site can render.

import { z } from "zod";

// Body text supports **bold** and [links](/path) — nothing else.
const text = z.string().min(1);

export const BlockSchema = z.union([
  z.object({ p: text }),
  z.object({ ul: z.array(text).min(1) }),
  z.object({ ol: z.array(text).min(1) }),
  z.object({ note: text }),
  z.object({ table: z.object({ head: z.array(text).min(2), rows: z.array(z.array(text)).min(1) }) }),
]);

export const PageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  // landing → /<slug>, panduan → /panduan/<slug>
  section: z.enum(["landing", "panduan"]),
  // draft pages are validated but never rendered or listed in the sitemap.
  status: z.enum(["published", "draft"]),
  cluster: z.enum(["rme", "klinik", "satusehat", "bpjs", "clinical-intelligence", "bidan", "posyandu", "farmasi", "brand"]),
  keywords: z.array(z.string()).min(1),
  title: z.string().min(20).max(65),
  description: z.string().min(70).max(165),
  kicker: z.string(),
  h1: z.string().min(10),
  intro: text,
  author: z.string().default("Tim SahAIbat"),
  // A named clinical or regulatory reviewer. Shown only when set.
  reviewedBy: z.string().optional(),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sections: z.array(z.object({ id: z.string().regex(/^[a-z0-9-]+$/), h: text, body: z.array(BlockSchema).min(1) })).min(2),
  faq: z.array(z.object({ q: text, a: text })).default([]),
  sources: z.array(z.object({ title: text, publisher: text, url: z.string().url() })).default([]),
  cta: z.object({ h: text, p: text, label: text, href: z.string() }),
  related: z.array(z.string()).default([]),
});

export type Page = z.infer<typeof PageSchema>;
export type Block = z.infer<typeof BlockSchema>;

export const pagePath = (p: Pick<Page, "section" | "slug">) => (p.section === "panduan" ? `/panduan/${p.slug}` : `/${p.slug}`);
