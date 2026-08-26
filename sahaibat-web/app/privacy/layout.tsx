import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Privacy | SahAIbat",
  description:
    "How SahAIbat handles personal and health data under Indonesia's UU PDP, with records stored in Indonesia.",
  keywords: ["UU PDP", "health data privacy Indonesia"],
  alternates: { canonical: `${BASE}/privacy` },
  openGraph: {
    type: "website",
    url: `${BASE}/privacy`,
    siteName: "SahAIbat",
    title: "Privacy | SahAIbat",
    description:
      "How SahAIbat handles personal and health data under Indonesia's UU PDP, with records stored in Indonesia.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy | SahAIbat",
    description: "How SahAIbat handles personal and health data under Indonesia's UU PDP, with records stored in Indonesia.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
