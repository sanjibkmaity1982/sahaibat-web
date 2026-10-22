// SERVER COMPONENT. The guides hub: every published guide, grouped by topic.
import type { Metadata } from "next";
import Link from "next/link";
import "@/components/redesign/redesign.css";
import "@/components/legal/legal.css";
import "@/components/seo/seo.css";
import { SiteHeader, footer } from "@/components/legal/LegalPage";
import { publishedPages, pagePath } from "@/lib/seo/content";

const BASE = "https://www.sahaibat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Panduan RME, SATUSEHAT dan BPJS untuk Faskes | SahAIbat",
  description: "Panduan praktis untuk dokter, klinik dan bidan: rekam medis elektronik, integrasi SATUSEHAT, BPJS P-Care dan alur kerja klinik, dengan sumber resmi.",
  alternates: { canonical: `${BASE}/panduan` },
  openGraph: { type: "website", url: `${BASE}/panduan`, siteName: "SahAIbat", locale: "id_ID", images: [{ url: "/images/og-cover.png", width: 1200, height: 630, alt: "SahAIbat" }] },
};

export default function Page() {
  const pages = publishedPages().filter((p) => p.cluster !== "brand").sort((a, b) => (a.section === b.section ? a.h1.localeCompare(b.h1) : a.section === "panduan" ? -1 : 1));
  return (
    <div className="sb" data-l="id" lang="id">
      <SiteHeader lang="id" />
      <main className="pp seo">
        <div className="wrap pp-head">
          <nav className="seo-crumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Beranda</Link></li><li><span aria-current="page">Panduan</span></li></ol></nav>
          <span className="k">Panduan</span>
          <h1>Panduan praktis untuk fasilitas kesehatan</h1>
          <p className="lead">Rekam medis elektronik, SATUSEHAT, BPJS dan alur kerja klinik, dijelaskan dengan bahasa yang jelas dan sumber resmi. Disusun untuk dokter, pengelola klinik dan bidan.</p>
        </div>
        <div className="wrap" style={{ marginTop: 36 }}>
          <ul className="seo-related seo-hub">
            {pages.map((r) => (
              <li key={pagePath(r)}><a href={pagePath(r)}><span className="k">{r.kicker}</span><b>{r.h1}</b><span>{r.description}</span></a></li>
            ))}
          </ul>
        </div>
      </main>
      <div dangerouslySetInnerHTML={{ __html: footer("id") }} />
    </div>
  );
}
