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
  alternateName: ["SahAIbat Health", "Orivera"],
  slogan: "Kesehatan, lebih dekat dari sebelumnya.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Boulevard Raya No. 1, Kelapa Gading Timur",
    addressLocality: "Jakarta",
    postalCode: "14240",
    addressCountry: "ID",
  },
  description:
    "Kecerdasan kesehatan terhubung untuk Indonesia — Kader, Bidan, DOK, DOK Companion, Kasih, Code dan Konsensus.id.",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  sameAs: [
    "https://www.sahaibatdok.com",
    "https://www.instagram.com/sahaibat.sehat/",
    "https://www.facebook.com/profile.php?id=61593890874615",
    "https://www.linkedin.com/company/sahaibat/",
    "https://www.tiktok.com/@sahaibat.health",
    "https://www.youtube.com/channel/UCZ3sOfvRJPSkozGwzBpqrIQ",
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
      email: "privacy@sahaibat.com",
      contactType: "privacy",
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

// DOK as a software product, matching the pricing shown on the page.
const dokJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SahAIbat DOK",
  applicationCategory: "MedicalApplication",
  operatingSystem: "Web, Android, iOS",
  url: "https://www.sahaibatdok.com",
  description:
    "RME Cerdas untuk dokter mandiri dan klinik: konsultasi dengan DOK Intelligence, resep, apotek, kasir, laporan, terintegrasi SATUSEHAT dan BPJS.",
  publisher: { "@type": "Organization", name: "SahAIbat", url: BASE },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: 0,
    highPrice: 60000,
    offerCount: 2,
    description: "Paket gratis selamanya, atau semua modul mulai Rp60 ribu per bulan.",
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dokJsonLd) }}
      />
      <RedesignPage lang="id" view="home" />
    </>
  );
}
