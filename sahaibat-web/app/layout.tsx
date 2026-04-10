// app/layout.tsx
// NOTE: This file cannot use usePathname directly (it's a Server Component).
// The SiteHeader and SiteFooter handle their own pathname checks client-side.
// The <main> wrapper uses a client wrapper component to conditionally apply
// the max-width constraint only on non-home pages.

import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteHeader } from "@/components/sahaibat/SiteHeader";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";
import { MainWrapper } from "@/components/sahaibat/MainWrapper";

export const metadata = {
  title: "SahAIbat — healthcare closer than ever",
  description:
    "SahAIbat is a community-first digital triage and care guidance platform built with local communities and guided by global clinical safety principles.",
  keywords: [
    "community health",
    "digital triage",
    "primary care support",
    "maternal and child health",
    "community health workers",
    "NGO health programs",
    "WhatsApp health triage",
  ],
  authors: [{ name: "Vinatra (11679210 Canada Inc.)" }],
  openGraph: {
    title: "SahAIbat — healthcare closer than ever",
    description:
      "A community-first digital triage and care guidance platform built for real-world health programs.",
    url: "https://www.sahaibat.com",
    siteName: "SahAIbat",
    images: [
      {
        url: "/images/hero-kader-family.png",
        width: 1200,
        height: 630,
        alt: "Community health worker supporting a family",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SahAIbat — healthcare closer than ever",
    description:
      "Community-first digital triage and care guidance for NGOs and community health workers.",
    images: ["/images/hero-kader-family.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
