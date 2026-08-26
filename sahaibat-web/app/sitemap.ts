// app/sitemap.ts
// with alternate-language annotations Google reads directly from the sitemap.

import type { MetadataRoute } from "next";

const BASE = "https://www.sahaibat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // "/" is English, "/id" is Bahasa, "/en" is a legacy alias for "/".
    // The previous version labelled BASE as the Bahasa default and mapped
    // id → BASE, which pointed Google's Indonesian alternate at English copy.
    {
      url: BASE, // English (default)
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: BASE,
          id: `${BASE}/id`,
          "x-default": BASE,
        },
      },
    },
    {
      url: `${BASE}/id`, // Bahasa Indonesia
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: BASE,
          id: `${BASE}/id`,
          "x-default": BASE,
        },
      },
    },
    {
      url: `${BASE}/en`, // alias of "/", kept so indexed links do not break
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          en: BASE,
          id: `${BASE}/id`,
          "x-default": BASE,
        },
      },
    },
    {
      url: `${BASE}/technology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/enterprise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/investors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
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
