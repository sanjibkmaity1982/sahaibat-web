// app/en/page.tsx
// SERVER COMPONENT — English version of the homepage at /en.
// Renders the exact same HomePage component with initialLang="en".

import type { Metadata } from "next";
import HomePage from "../(home)/HomePage";

const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title:
    "SahAIbat — Indonesia's Connected Clinical AI Platform | Kader, Midwife & Clinic Tools",
  description:
    "Indonesia's connected clinical AI platform: free ILP-aligned Kader app for Posyandu, midwife ANC module, Kasih family health chat on WhatsApp, and SahAIbat DoK — an AI clinical scribe with SATUSEHAT integration. Live in NTT.",
  alternates: {
    canonical: `${BASE}/en`,
    languages: {
      "id-ID": BASE,
      en: `${BASE}/en`,
      "x-default": BASE,
    },
  },
  openGraph: {
    type: "website",
    url: `${BASE}/en`,
    siteName: "SahAIbat",
    locale: "en_US",
    alternateLocale: "id_ID",
    title: "SahAIbat — Indonesia's Connected Clinical AI Platform",
    description:
      "Free Kader app, midwife module, Kasih family chat, and the DoK AI scribe with SATUSEHAT integration. Live in NTT, Indonesia.",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "SahAIbat — Indonesia's Connected Clinical AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — Indonesia's Connected Clinical AI Platform",
    description:
      "Free Kader app, midwife module, Kasih family chat, and the DoK AI scribe with SATUSEHAT integration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <HomePage initialLang="en" />;
}
