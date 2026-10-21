// Shared metadata for the redesigned pages: one place for titles, hreflang
// pairs and social cards so EN and ID never drift apart.
import type { Metadata } from "next";

const BASE = "https://www.sahaibat.com";

const COPY = {
  home: {
    en: {
      title: "SahAIbat — At Every Stage of Life, SahAIbat Is There",
      description:
        "Healthcare technology for Indonesia: Kader for Posyandu, Bidan for midwives, DOK the Intelligent RME for clinics, Kasih for families. Start DOK free.",
    },
    id: {
      title: "SahAIbat — Di Setiap Tahap Kehidupan, SahAIbat Hadir",
      description:
        "Teknologi kesehatan untuk Indonesia: Kader untuk Posyandu, Bidan untuk bidan, DOK RME Cerdas untuk dokter dan klinik, Kasih untuk keluarga. Mulai DOK gratis.",
    },
  },
  impact: {
    en: {
      title: "Impact — SahAIbat",
      description:
        "Pijar Timur × SahAIbat: stunting prevention in NTT. Kaders finish the monthly Posyandu check in under 30 seconds, with follow-up and referral planned.",
    },
    id: {
      title: "Dampak — SahAIbat",
      description:
        "Pijar Timur × SahAIbat: pencegahan stunting di NTT. Kader menyelesaikan pemeriksaan Posyandu bulanan di bawah 30 detik, lengkap dengan tindak lanjut.",
    },
  },
} as const;

// Bahasa Indonesia is the default language and owns the bare paths.
const PATH = {
  home: { en: "/en", id: "/" },
  impact: { en: "/en/impact", id: "/impact" },
} as const;

export function redesignMetadata(view: "home" | "impact", lang: "en" | "id"): Metadata {
  const c = COPY[view][lang];
  const url = `${BASE}${PATH[view][lang] === "/" ? "" : PATH[view][lang]}`;
  return {
    metadataBase: new URL(BASE),
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}${PATH[view].en}`,
        "id-ID": `${BASE}${PATH[view].id === "/" ? "" : PATH[view].id}`,
        "x-default": `${BASE}${PATH[view].id === "/" ? "" : PATH[view].id}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "SahAIbat",
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
      title: c.title,
      description: c.description,
      images: [{ url: "/redesign/img/clinic_u.jpg", width: 1400, height: 933, alt: c.title }],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.description },
    robots: { index: true, follow: true },
  };
}
