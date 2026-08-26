import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Investors | SahAIbat",
  description:
    "Three Indonesian health mandates are running in parallel with no connected platform serving any of them. SahAIbat operates across community, primary care and hospital as one record, and trains Indonesia's own clinical model on the consented data it produces. Request the deck.",
  keywords: ["Indonesia healthtech investment", "clinical AI Indonesia", "BPJS digital health", "health infrastructure Indonesia"],
  alternates: { canonical: `${BASE}/investors` },
  openGraph: {
    type: "website",
    url: `${BASE}/investors`,
    siteName: "SahAIbat",
    title: "Investors | SahAIbat",
    description:
      "Three Indonesian health mandates are running in parallel with no connected platform serving any of them. SahAIbat operates across community, primary care and hospital as one record, and trains Indonesia's own clinical model on the consented data it produces. Request the deck.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors | SahAIbat",
    description: "Three Indonesian health mandates are running in parallel with no connected platform serving any of them. SahAIbat operates across community, primary care and hospital as one record, and trains Indonesia's own clinical model on the consented data it produces. Request the deck.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
