// app/sitemap.ts
// with alternate-language annotations Google reads directly from the sitemap.

import type { MetadataRoute } from "next";

const BASE = "https://www.sahaibat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE, // Bahasa Indonesia (default)
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          id: BASE,
          en: `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/en`, // English
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          id: BASE,
          en: `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/partner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
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
  ];
}
