import type { Metadata } from "next";

const BASE = "https://www.sahaibat.com";

const COPY = {
  privacy: {
    en: {
      title: "Privacy Policy | SahAIbat",
      description: "How SahAIbat protects personal and health data under UU PDP: data stored in Indonesia, safe use of Intelligence, and your rights.",
    },
    id: {
      title: "Kebijakan Privasi | SahAIbat",
      description: "Cara SahAIbat melindungi data pribadi dan kesehatan sesuai UU PDP: data disimpan di Indonesia, Intelligence yang aman, dan hak Anda.",
    },
  },
  terms: {
    en: {
      title: "Terms of Use | SahAIbat",
      description: "The terms for using SahAIbat: clinical responsibility, SahAIbat Intelligence, your data, plans and fees, and Indonesian law.",
    },
    id: {
      title: "Ketentuan Penggunaan | SahAIbat",
      description: "Ketentuan penggunaan SahAIbat: tanggung jawab klinis, SahAIbat Intelligence, data Anda, paket dan biaya, serta hukum Indonesia.",
    },
  },
} as const;

export function legalMetadata(doc: "privacy" | "terms", lang: "en" | "id"): Metadata {
  const c = COPY[doc][lang];
  const url = `${BASE}${lang === "en" ? "/en" : ""}/${doc}`;
  return {
    metadataBase: new URL(BASE),
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: { en: `${BASE}/en/${doc}`, "id-ID": `${BASE}/${doc}`, "x-default": `${BASE}/${doc}` },
    },
    openGraph: { type: "website", url, siteName: "SahAIbat", title: c.title, description: c.description, images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/images/og-cover.png"] },
  };
}
