import type { Metadata } from "next";

// Metadata lives in a layout because the page itself is a client component and
// client components cannot export it. Without this the route inherited only
// the root title, so every sub-page shared one snippet in search results.
const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Technology — Indonesia's sovereign medical AI | SahAIbat",
  description:
    "The technical brief: a sovereign generative plane fine-tuning MedGemma on Indonesian clinical language, and a deterministic verification layer that computes clinical arithmetic, binds ICD-10 coding to the catalogue and fails closed. SATUSEHAT FHIR R4, BPJS, UU PDP, data resident in Jakarta.",
  keywords: ["sovereign medical AI Indonesia", "MedGemma fine-tune", "clinical AI architecture", "SATUSEHAT FHIR R4", "deterministic clinical arithmetic", "Indonesian clinical LLM"],
  alternates: { canonical: `${BASE}/technology` },
  openGraph: {
    type: "website",
    url: `${BASE}/technology`,
    siteName: "SahAIbat",
    title: "Technology — Indonesia's sovereign medical AI | SahAIbat",
    description:
      "The technical brief: a sovereign generative plane fine-tuning MedGemma on Indonesian clinical language, and a deterministic verification layer that computes clinical arithmetic, binds ICD-10 coding to the catalogue and fails closed. SATUSEHAT FHIR R4, BPJS, UU PDP, data resident in Jakarta.",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology — Indonesia's sovereign medical AI | SahAIbat",
    description: "The technical brief: a sovereign generative plane fine-tuning MedGemma on Indonesian clinical language, and a deterministic verification layer that computes clinical arithmetic, binds ICD-10 coding to the catalogue and fails closed. SATUSEHAT FHIR R4, BPJS, UU PDP, data resident in Jakarta.",
    images: ["/images/og-cover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
