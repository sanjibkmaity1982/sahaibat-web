"use client";

// TrustBand — the regulatory marks, as marks.
//
// WHY LOGOS AND NOT THE TEXT CHIPS WE ALREADY HAD
//
// The hero carries these as text, which is what a Western buyer reads. Field
// research in Indonesia says the opposite: the LOGO is the assurance. A clinic
// owner deciding whether a foreign-registered company may touch their BPJS
// claims is looking for the marks they already recognise, and a teal chip
// reading "SATUSEHAT" does not do that work. The chips stay — they name the
// STANDARD (HL7 FHIR R4, AES-256-GCM), which the logos cannot.
//
// TWO PLACEMENTS, ONE LIST
//
//   variant="hero"  — inside the dark hero, above the fold. For sahaibatdok.com,
//                     where the page has one job: convince a clinic owner who
//                     has never heard of us, before they read a word.
//   variant="band"  — a cream strip under the hero. For sahaibat.com, whose
//                     audience is partners and government and will scroll.
//
// Same marks either way. A second list would drift, and the day it drifts is
// the day one site claims something the other has stopped claiming.
//
// DEGRADES TO TEXT
//
// Every mark falls back to a labelled chip when its file is absent, so the band
// is correct before any asset lands and upgrades the moment one is dropped into
// /public/logos. Art and code do not have to ship together.

import { useState } from "react";
import { C } from "@/lib/sahaibat/theme";

type Mark = {
  /** File under /public/logos. Omit for marks we may not show a logo for. */
  src?: string;
  name: string;
  /** What the relationship IS — see the note below, it is a legal distinction. */
  qualifier: { id: string; en: string };
  detail?: string;
};

// THE WORDING IS A LEGAL DECISION, NOT A COPY ONE.
//
// "Terintegrasi" (integrated) is a claim about our software, and is true: the
// SATUSEHAT and BPJS P-Care integrations are live. "Terdaftar" (registered) is
// a filing. "Tersertifikasi" (certified) says an accreditation body audited us,
// and may only sit where one did. On a homepage the three look interchangeable.
// They are not, and a hospital compliance officer is the reader who checks.
const MARKS: Mark[] = [
  {
    src: "/logos/bpjs-kesehatan.png",
    name: "BPJS Kesehatan",
    qualifier: { id: "Terintegrasi", en: "Integrated" },
    detail: "P-Care",
  },
  {
    src: "/logos/satusehat.png",
    name: "SATUSEHAT",
    qualifier: { id: "Terintegrasi", en: "Integrated" },
    detail: "HL7 FHIR R4",
  },
  {
    src: "/logos/komdigi-pse.png",
    name: "PSE Komdigi",
    qualifier: { id: "Terdaftar", en: "Registered" },
    detail: "NIB 1202260248509",
  },
  {
    // TÜV SÜD issued it; KAN accredited TÜV SÜD. That pairing is why the KAN
    // mark belongs here and would have meant nothing on its own — KAN
    // accredits certification bodies, it does not certify software companies.
    src: "/logos/iso-9001-kan.png",
    name: "ISO 9001",
    qualifier: { id: "Tersertifikasi", en: "Certified" },
    detail: "TÜV SÜD · KAN LSSM-019-IDN",
  },
  {
    src: "/nvidia-inception.png",
    name: "NVIDIA Inception",
    qualifier: { id: "Anggota", en: "Member" },
  },
  {
    // No logo, deliberately. AWS trademark guidelines restrict the mark to AWS
    // Partner Network members. The region in text is permitted and tells a
    // procurement officer the thing they actually need — where the data sits.
    name: "AWS Jakarta",
    qualifier: { id: "Data di Indonesia", en: "Data in Indonesia" },
    detail: "ap-southeast-3",
  },
];

function MarkCard({ m, lang, dark }: { m: Mark; lang: "id" | "en"; dark: boolean }) {
  const [broken, setBroken] = useState(false);
  const showLogo = !!m.src && !broken;

  return (
    <div
      style={{
        // White in both variants. These are full-colour logos drawn for white
        // paper — dropping them straight onto the dark hero renders half of
        // them illegible and the other half wrong.
        background: C.white,
        border: dark ? "1px solid rgba(255,255,255,0.14)" : `1px solid ${C.warm}`,
        borderRadius: dark ? 10 : 14,
        padding: dark ? "10px 12px" : "18px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: dark ? 6 : 10,
        minHeight: dark ? 0 : 132,
        textAlign: "center",
      }}
    >
      <div style={{ height: dark ? 28 : 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {showLogo ? (
          <img
            src={m.src}
            alt={`${m.name} — ${m.qualifier[lang]}`}
            onError={() => setBroken(true)}
            style={{ maxHeight: dark ? 28 : 44, maxWidth: dark ? 92 : 132, width: "auto", objectFit: "contain" }}
          />
        ) : (
          // Not a placeholder box: the claim still reads, it just loses the
          // recognition shortcut the logo would have given.
          <span style={{ fontSize: dark ? 11.5 : 15, fontWeight: 800, color: C.tealDk, letterSpacing: "-0.01em" }}>
            {m.name}
          </span>
        )}
      </div>

      <div>
        {showLogo && !dark && (
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 2 }}>{m.name}</div>
        )}
        <div style={{ fontSize: dark ? 9 : 11.5, fontWeight: 700, color: C.tealDk }}>{m.qualifier[lang]}</div>
        {m.detail && !dark && (
          <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>{m.detail}</div>
        )}
      </div>
    </div>
  );
}

export default function TrustBand({
  lang = "id",
  variant = "band",
}: {
  lang?: "id" | "en";
  variant?: "band" | "hero";
}) {
  const dark = variant === "hero";

  const grid = (
    <div
      style={{
        display: "grid",
        gap: dark ? 8 : 12,
        gridTemplateColumns: dark
          ? "repeat(auto-fit, minmax(104px, 1fr))"
          : "repeat(auto-fit, minmax(150px, 1fr))",
      }}
    >
      {MARKS.map((m) => (
        <MarkCard key={m.name} m={m} lang={lang} dark={dark} />
      ))}
    </div>
  );

  // In the hero the marks are a row inside somebody else's section — no
  // background, no padding of its own, no heading competing with the H1.
  if (dark) return <div style={{ marginTop: 26 }}>{grid}</div>;

  return (
    <section style={{ background: C.cream, padding: "40px 0 44px", borderBottom: `1px solid ${C.warm}` }}>
      <div className="section-max">
        <div
          style={{
            fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            color: C.muted, textAlign: "center", marginBottom: 22,
          }}
        >
          {lang === "id"
            ? "Terhubung dan terdaftar di ekosistem kesehatan Indonesia"
            : "Connected to and registered within Indonesia's health ecosystem"}
        </div>

        {grid}

        {/* The line a hospital's procurement officer is looking for, under the
            marks rather than buried three clicks away in a privacy page. */}
        <p
          style={{
            fontSize: 11.5, color: C.muted, textAlign: "center", marginTop: 18,
            maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
          }}
        >
          {lang === "id"
            ? "Data pasien dienkripsi AES-256-GCM dan disimpan di wilayah Indonesia, sesuai UU PDP No. 27/2022."
            : "Patient data is AES-256-GCM encrypted and stored in Indonesian territory, in line with UU PDP No. 27/2022."}
        </p>
      </div>
    </section>
  );
}
