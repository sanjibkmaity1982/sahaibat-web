// app/(home)/page.tsx
// SERVER COMPONENT — no "use client" here.
// Root URL (www.sahaibat.com) now serves Bahasa Indonesia by default,
// with full metadata, hreflang alternates, and Organization JSON-LD.

import type { Metadata } from "next";
import HomePage from "./HomePage";

const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title:
    "SahAIbat — Indonesia's Connected Clinical AI Infrastructure",
  description:
    "SahAIbat operates across community health, midwifery, primary care and hospitals as one connected patient record — and trains Indonesia's own clinical language model on the consented data it produces. SATUSEHAT and BPJS connected, PSE registered, live in NTT.",
  keywords: [
    "Indonesia clinical AI",
    "healthtech Indonesia",
    "SATUSEHAT integration",
    "BPJS claim integrity",
    "sovereign medical LLM",
    "Indonesian EMR platform",
    "SahAIbat",
  ],
  alternates: {
    canonical: BASE,
    languages: {
      "id-ID": `${BASE}/id`,
      en: `${BASE}/en`,
      "x-default": BASE,
    },
  },
  openGraph: {
    type: "website",
    url: BASE,
    siteName: "SahAIbat",
    locale: "id_ID",
    alternateLocale: "en_US",
    title: "SahAIbat — Indonesia's Connected Clinical AI Infrastructure",
    description:
      "One connected patient record from Posyandu to hospital claim, and the sovereign Indonesian clinical model trained on it. Live in NTT.",
    images: [
      {
        url: "/images/og-cover.png", // pastikan file ini ada di /public/images
        width: 1200,
        height: 630,
        alt: "SahAIbat — Platform AI Kesehatan Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — Indonesia's Connected Clinical AI Infrastructure",
    description:
      "One connected patient record from Posyandu to hospital claim, and the sovereign Indonesian clinical model trained on it. Live in NTT.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Structured data (JSON-LD) ────────────────────────────────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SahAIbat",
  url: BASE,
  logo: `${BASE}/images/brand/wordmark-horizontal-dark.png`,
  legalName: "11679210 Canada Inc (Viantra)",
  description:
    "Platform AI klinis terhubung Indonesia — dari Posyandu hingga klinik. Aplikasi Kader, modul Bidan, Kasih, dan SahAIbat DoK.",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  sameAs: [
    "https://www.sahaibatdok.com",
    "https://instagram.com/sahaibat_health",
    "https://youtube.com/@SahaibatHealth",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "admin@sahaibat.com",
      contactType: "customer support",
      availableLanguage: ["Indonesian", "English"],
    },
    {
      "@type": "ContactPoint",
      email: "investor@sahaibat.com",
      contactType: "investor relations",
      availableLanguage: ["English"],
    },
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SahAIbat",
  url: BASE,
  inLanguage: ["id", "en"],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <HomePage initialLang="en" />
    </>
  );
}
