// app/sitemap.ts
// with alternate-language annotations Google reads directly from the sitemap.

import type { MetadataRoute } from "next";
import { publishedPages, pagePath } from "@/lib/seo/content";

const BASE = "https://www.sahaibat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Bahasa Indonesia is the default language ("/", "/impact"); English
    // lives under /en. The old /id URLs redirect to the bare paths.
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { id: BASE, en: `${BASE}/en`, "x-default": BASE } },
    },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { id: BASE, en: `${BASE}/en`, "x-default": BASE } },
    },
    {
      url: `${BASE}/impact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { id: `${BASE}/impact`, en: `${BASE}/en/impact`, "x-default": `${BASE}/impact` } },
    },
    {
      url: `${BASE}/en/impact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { id: `${BASE}/impact`, en: `${BASE}/en/impact`, "x-default": `${BASE}/impact` } },
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/en/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/panduan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // SEO pages from content/pages, dated by their own "updated" field.
    ...publishedPages().map((p) => ({
      url: `${BASE}${pagePath(p)}`,
      lastModified: new Date(p.updated),
      changeFrequency: "monthly" as const,
      priority: p.section === "landing" ? 0.8 : 0.7,
    })),
  ];
}
