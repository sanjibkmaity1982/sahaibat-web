import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Partner with SahAIbat",
  description:
    "The platform is built; the reach is the work. We partner with health offices, programme funders, clinic networks and implementers who already hold the ground in Indonesian community and primary care.",
  keywords: ["health partnership Indonesia", "Dinas Kesehatan partnership", "CSR health programme Indonesia", "NGO health technology"],
  alternates: { canonical: `${BASE}/partner` },
  openGraph: {
    type: "website",
    url: `${BASE}/partner`,
    siteName: "SahAIbat",
    title: "Partner with SahAIbat",
    description:
      "The platform is built; the reach is the work. We partner with health offices, programme funders, clinic networks and implementers who already hold the ground in Indonesian community and primary care.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner with SahAIbat",
    description: "The platform is built; the reach is the work. We partner with health offices, programme funders, clinic networks and implementers who already hold the ground in Indonesian community and primary care.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
