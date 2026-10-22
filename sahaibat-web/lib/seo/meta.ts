import type { Metadata } from "next";
import { pagePath, type Page } from "./schema";

const BASE = "https://www.sahaibat.com";

export function seoMetadata(p: Page): Metadata {
  const url = `${BASE}${pagePath(p)}`;
  return {
    metadataBase: new URL(BASE),
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "SahAIbat",
      locale: "id_ID",
      title: p.title,
      description: p.description,
      publishedTime: p.published,
      modifiedTime: p.updated,
      images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: ["/images/og-cover.png"] },
  };
}
