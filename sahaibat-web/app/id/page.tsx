// app/id/page.tsx
// SERVER COMPONENT — no "use client" here.
//
// Bahasa Indonesia homepage. English now owns the root ("/") because the
// primary reader of sahaibat.com is an investor or an enterprise buyer;
// this route is the full peer site for domestic partners, Dinas Kesehatan
// and clinic groups.
//
// NOTE: the Bahasa copy itself is still pending — app/(home)/copy.ts currently
// falls ID back to EN so this route renders rather than 404s while the English
// positioning is being reviewed. Translating before the argument is approved
// would mean translating it twice.

import type { Metadata } from "next";
import HomePage from "../(home)/HomePage";

const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "SahAIbat — Infrastruktur AI Klinis Terhubung Indonesia",
  description:
    "SahAIbat bekerja di seluruh lapisan kesehatan Indonesia — komunitas, kebidanan, layanan primer, dan rumah sakit — sebagai satu rekam pasien terhubung, dan melatih model bahasa klinis Indonesia dari data berpersetujuan yang dihasilkannya. Terhubung SATUSEHAT dan BPJS, terdaftar PSE, aktif di NTT.",
  keywords: [
    "AI klinis Indonesia",
    "platform kesehatan digital",
    "integrasi SATUSEHAT",
    "klaim BPJS",
    "rekam medis elektronik Indonesia",
    "SahAIbat",
  ],
  alternates: {
    canonical: `${BASE}/id`,
    languages: {
      en: BASE,
      "id-ID": `${BASE}/id`,
      "x-default": BASE,
    },
  },
  openGraph: {
    type: "website",
    url: `${BASE}/id`,
    siteName: "SahAIbat",
    title: "SahAIbat — Infrastruktur AI Klinis Terhubung Indonesia",
    description:
      "Satu rekam pasien terhubung dari Posyandu hingga klaim rumah sakit, dan model klinis berdaulat Indonesia yang dilatih di atasnya. Aktif di NTT.",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — Infrastruktur AI Klinis Terhubung Indonesia",
    description:
      "Satu rekam pasien terhubung dari Posyandu hingga klaim rumah sakit. Terhubung SATUSEHAT, aktif di NTT.",
  },
};

export default function IdHomePage() {
  return <HomePage initialLang="id" />;
}
