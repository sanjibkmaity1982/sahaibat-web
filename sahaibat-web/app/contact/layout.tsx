import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Contact | SahAIbat",
  description:
    "Get in touch with the SahAIbat team.",
  keywords: ["contact SahAIbat"],
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    type: "website",
    url: `${BASE}/contact`,
    siteName: "SahAIbat",
    title: "Contact | SahAIbat",
    description:
      "Get in touch with the SahAIbat team.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | SahAIbat",
    description: "Get in touch with the SahAIbat team.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
