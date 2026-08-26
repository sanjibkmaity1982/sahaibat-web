import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Enterprise — hospitals, clinic networks and health offices | SahAIbat",
  description:
    "One platform whichever layer you run: claim integrity before E-Klaim for hospitals, one standard of care across every site for clinic networks, and district-level dashboards and surveillance for health offices. Nothing replaced, your own BPJS and SATUSEHAT credentials, data resident in Indonesia.",
  keywords: ["BPJS claim integrity", "INA-CBG severity coding", "E-Klaim", "klinik pratama EMR", "Dinas Kesehatan dashboard", "SATUSEHAT hospital integration"],
  alternates: { canonical: `${BASE}/enterprise` },
  openGraph: {
    type: "website",
    url: `${BASE}/enterprise`,
    siteName: "SahAIbat",
    title: "Enterprise — hospitals, clinic networks and health offices | SahAIbat",
    description:
      "One platform whichever layer you run: claim integrity before E-Klaim for hospitals, one standard of care across every site for clinic networks, and district-level dashboards and surveillance for health offices. Nothing replaced, your own BPJS and SATUSEHAT credentials, data resident in Indonesia.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise — hospitals, clinic networks and health offices | SahAIbat",
    description: "One platform whichever layer you run: claim integrity before E-Klaim for hospitals, one standard of care across every site for clinic networks, and district-level dashboards and surveillance for health offices. Nothing replaced, your own BPJS and SATUSEHAT credentials, data resident in Indonesia.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
