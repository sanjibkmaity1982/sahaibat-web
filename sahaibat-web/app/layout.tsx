// app/layout.tsx
// SiteNav and SiteFooter render on every page — one shared design system,
// no more per-page chrome. MainWrapper decides per-route width (full-bleed
// for rich marketing pages vs. constrained for plain content pages).
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteNav } from "@/components/sahaibat/SiteNav";
import { PromoRibbon } from "@/components/sahaibat/PromoRibbon";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";
import { MainWrapper } from "@/components/sahaibat/MainWrapper";

// ── Viewport (themeColor must live here in Next.js 15+, not in metadata) ──────
export const viewport: Viewport = {
  themeColor: "#02C39A",
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "SahAIbat — Indonesia's Connected Clinical AI Platform",
  description:
    "SahAIbat connects Indonesia's 1.4M community health workers, 300K doctors and 280M patients in one clinical record — from the village Posyandu to the hospital claim — and trains the country's own sovereign clinical language model on the consented data it produces.",
  keywords: [
    "Indonesia health AI",
    "Kader app",
    "SahAIbat",
    "SATUSEHAT",
    "clinical AI Indonesia",
    "community health workers",
    "ILP Posyandu",
    "health tech Indonesia",
    "stunting Indonesia",
    "maternal health Indonesia",
  ],
  authors: [{ name: "Viantra · 11679210 Canada Inc" }],
  creator: "SahAIbat",
  metadataBase: new URL("https://www.sahaibat.com"),
  openGraph: {
    title: "SahAIbat — Indonesia's Connected Clinical AI Platform",
    description:
      "One connected patient record across community, clinic and hospital. Indonesia's sovereign clinical AI, built on it.",
    url: "https://www.sahaibat.com",
    siteName: "SahAIbat",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/brand/wordmark-horizontal-light.png",
        width: 1200,
        height: 630,
        alt: "SahAIbat — Indonesia Health AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — Indonesia's Connected Clinical AI Platform",
    description:
      "Connecting Indonesia's 1.4M Kaders, 300K doctors, and 280M patients in one sovereign clinical AI layer.",
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
    <html lang="en">
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
          <PromoRibbon />
          <SiteNav />
          <MainWrapper>{children}</MainWrapper>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
