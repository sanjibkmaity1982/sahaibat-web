// app/layout.tsx
// SiteNav and SiteFooter render on every page except the redesigned ones
// (see LegacyChrome), which carry their own nav and footer. MainWrapper decides per-route width (full-bleed
// for rich marketing pages vs. constrained for plain content pages).
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteNav } from "@/components/sahaibat/SiteNav";
import { PromoRibbon } from "@/components/sahaibat/PromoRibbon";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";
import { MainWrapper } from "@/components/sahaibat/MainWrapper";
import { LegacyChrome } from "@/components/sahaibat/LegacyChrome";
import { Measure } from "@/components/Measure";

// ── Fonts (self-hosted at build time; no request to Google from the visitor) ──
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-sans", display: "swap" });
const plexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-plex-serif", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

// ── Viewport (themeColor must live here in Next.js 15+, not in metadata) ──────
export const viewport: Viewport = {
  themeColor: "#0F3D3E",
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "SahAIbat — Connected Healthcare Intelligence for Indonesia",
  description:
    "Teknologi kesehatan terhubung untuk Indonesia: Kader untuk Posyandu, Bidan untuk layanan ibu, DOK RME Cerdas untuk dokter dan klinik, Kasih untuk keluarga, dan Code untuk rumah sakit.",
  keywords: [
    "healthcare intelligence Indonesia",
    "Kader app",
    "SahAIbat",
    "SATUSEHAT",
    "clinical intelligence Indonesia",
    "community health workers",
    "ILP Posyandu",
    "health tech Indonesia",
    "stunting Indonesia",
    "maternal health Indonesia",
  ],
  authors: [{ name: "SahAIbat" }],
  creator: "SahAIbat",
  metadataBase: new URL("https://www.sahaibat.com"),
  // Search Console / Bing Webmaster verification, set in Vercel env vars.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
  openGraph: {
    title: "SahAIbat — Connected Healthcare Intelligence for Indonesia",
    description:
      "One connected patient record across community, clinic and hospital, with SahAIbat Intelligence built in.",
    url: "https://www.sahaibat.com",
    siteName: "SahAIbat",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/brand/wordmark-horizontal-light.png",
        width: 1200,
        height: 630,
        alt: "SahAIbat — Healthcare Intelligence for Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — Connected Healthcare Intelligence for Indonesia",
    description:
      "Connecting Indonesia's kaders, midwives, doctors and hospitals with SahAIbat Intelligence.",
    images: ["/images/brand/wordmark-horizontal-light.png"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

// ── Root Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SahAIbat" />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        <LanguageProvider>
          <LegacyChrome>
            <PromoRibbon />
            <SiteNav />
          </LegacyChrome>
          <MainWrapper>{children}</MainWrapper>
          <Measure />
          <LegacyChrome>
            <SiteFooter />
          </LegacyChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
