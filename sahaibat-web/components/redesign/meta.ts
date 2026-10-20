// Shared metadata for the redesigned pages: one place for titles, hreflang
// pairs and social cards so EN and ID never drift apart.
import type { Metadata } from "next";

const BASE = "https://www.sahaibat.com";

const COPY = {
  home: {
    en: {
      title: "SahAIbat — At Every Stage of Life, SahAIbat Is There",
      description:
        "Connected healthcare intelligence for Indonesia: Kader for Posyandu, Bidan for maternal care, DOK the Intelligent RME for doctors and clinics, Kasih for families, Code for hospitals, and Konsensus.id for clinical evidence. Start DOK free.",
    },
    id: {
      title: "SahAIbat — Di Setiap Tahap Kehidupan, SahAIbat Hadir",
      description:
        "Kecerdasan kesehatan terhubung untuk Indonesia: Kader untuk Posyandu, Bidan untuk kesehatan ibu, DOK RME Cerdas untuk dokter dan klinik, Kasih untuk keluarga, Code untuk rumah sakit, dan Konsensus.id untuk bukti klinis. Mulai DOK gratis.",
    },
  },
  impact: {
    en: {
      title: "Impact — SahAIbat",
      description:
        "Pijar Timur × SahAIbat: child stunting prevention in NTT. Kaders complete the monthly Posyandu check in under 30 seconds, with the right follow-up planned and referred.",
    },
    id: {
      title: "Dampak — SahAIbat",
      description:
        "Pijar Timur × SahAIbat: pencegahan stunting anak di NTT. Kader menyelesaikan pemeriksaan Posyandu bulanan dalam kurang dari 30 detik, dengan tindak lanjut dan rujukan yang tepat.",
    },
  },
} as const;

const PATH = {
  home: { en: "/", id: "/id" },
  impact: { en: "/impact", id: "/id/impact" },
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
        en: `${BASE}${PATH[view].en === "/" ? "" : PATH[view].en}`,
        "id-ID": `${BASE}${PATH[view].id}`,
        "x-default": `${BASE}${PATH[view].en === "/" ? "" : PATH[view].en}`,
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
