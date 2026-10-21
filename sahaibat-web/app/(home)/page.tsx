// app/(home)/page.tsx
// SERVER COMPONENT. Bahasa Indonesia homepage at "/" (the default language) — Concept A redesign.

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

const BASE = "https://www.sahaibat.com";

export const metadata = redesignMetadata("home", "id");

// ── Structured data (JSON-LD) ────────────────────────────────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SahAIbat",
  url: BASE,
  logo: `${BASE}/images/brand/wordmark-horizontal-dark.png`,
  legalName: "11679210 Canada Inc (Viantra)",
  description:
    "Kecerdasan kesehatan terhubung untuk Indonesia — Kader, Bidan, DOK, DOK Companion, Kasih, Code dan Konsensus.id.",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  sameAs: [
    "https://www.sahaibatdok.com",
    "https://instagram.com/sahaibat_health",
    "https://youtube.com/@SahaibatHealth",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "admin@sahaibat.com",
      contactType: "customer support",
      availableLanguage: ["Indonesian", "English"],
    },
    {
      "@type": "ContactPoint",
      email: "investor@sahaibat.com",
      contactType: "investor relations",
      availableLanguage: ["English"],
    },
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SahAIbat",
  url: BASE,
  inLanguage: ["id", "en"],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <RedesignPage lang="id" view="home" />
    </>
  );
}
