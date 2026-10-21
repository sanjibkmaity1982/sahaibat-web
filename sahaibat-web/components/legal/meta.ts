import type { Metadata } from "next";

const BASE = "https://www.sahaibat.com";

const COPY = {
  en: {
    title: "Privacy Policy | SahAIbat",
    description: "How SahAIbat protects personal and health data under Indonesia’s UU PDP: data stored in Indonesia, no identities used in model training, and your rights.",
  },
  id: {
    title: "Kebijakan Privasi | SahAIbat",
    description: "Cara SahAIbat melindungi data pribadi dan kesehatan sesuai UU PDP: data disimpan di Indonesia, tanpa identitas dalam pelatihan model, dan hak-hak Anda.",
  },
} as const;

export function privacyMetadata(lang: "en" | "id"): Metadata {
  const c = COPY[lang];
  const url = `${BASE}${lang === "en" ? "/en/privacy" : "/privacy"}`;
  return {
    metadataBase: new URL(BASE),
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: { en: `${BASE}/en/privacy`, "id-ID": `${BASE}/privacy`, "x-default": `${BASE}/privacy` },
    },
    openGraph: { type: "website", url, siteName: "SahAIbat", title: c.title, description: c.description, images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/images/og-cover.png"] },
  };
}
