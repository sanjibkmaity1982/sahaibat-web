import "./globals.css";
import { LanguageProvider } from "@/components/sahaibat/LanguageProvider";
import { SiteHeader } from "@/components/sahaibat/SiteHeader";
import { SiteFooter } from "@/components/sahaibat/SiteFooter";

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
  authors: [{ name: "Viantra Health (1167910 Canada Inc.)" }],
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
          <main className="mx-auto w-full max-w-5xl px-4 py-10">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
