// app/layout.tsx
// NOTE: This file cannot use usePathname directly (it's a Server Component).
// The SiteHeader and SiteFooter handle their own pathname checks client-side.
// The <main> wrapper uses a client wrapper component to conditionally apply
// the max-width constraint only on non-home pages.
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteHeader } from "@/components/sahaibat/SiteHeader";
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
    "SahAIbat connects Indonesia's 1.4M community health workers, 300K doctors, and 280M patients in one sovereign clinical AI layer — from Posyandu to clinic, free to commercial, mission to LLM.",
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
      "From Kader to clinic. Free community tools powered by a commercial AI engine. Building Indonesia's first clinical LLM.",
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
          <SiteHeader />
          <MainWrapper>{children}</MainWrapper>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
