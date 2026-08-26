"use client";

// app/partner/page.tsx
//
// Rebuilt from an NGO-only enquiry form. The old page asked "tell us about
// your NGO" and nothing else, which matched the charity framing the rest of
// the site has now moved off. Partnership at this stage means four different
// conversations — government, programme funders, clinic networks and
// distribution — so the form asks which one first.

import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";
import { RequestForm, type Field } from "@/components/sahaibat/RequestForm";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: `${C.teal}12`, border: `1px solid ${C.teal}35`,
      borderRadius: 20, padding: "6px 16px", marginBottom: 20,
    }}>
      <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{children}</span>
    </div>
  );
}

const TRACKS = (en: boolean) => en
  ? [
      { i: "🏛️", t: "Government & Dinas Kesehatan", d: "District or provincial deployment across Posyandu, Puskesmas and referral networks, reporting into ILP and SATUSEHAT." },
      { i: "🌱", t: "Programme funders", d: "Foundations, CSR programmes and development finance funding a defined health outcome in a defined geography." },
      { i: "🏥", t: "Clinic & hospital networks", d: "Multi-site groups adopting DOK across primary care, or claim integrity across casemix teams." },
      { i: "🤝", t: "Distribution & implementation", d: "Organisations who already have the trust and the field presence, and want a platform behind it." },
    ]
  : [
      { i: "🏛️", t: "Pemerintah & Dinas Kesehatan", d: "Penerapan tingkat kabupaten atau provinsi di Posyandu, Puskesmas dan jaringan rujukan, terhubung ke ILP dan SATUSEHAT." },
      { i: "🌱", t: "Pendana program", d: "Yayasan, program CSR dan lembaga pembiayaan pembangunan yang mendanai capaian kesehatan tertentu di wilayah tertentu." },
      { i: "🏥", t: "Jaringan klinik & rumah sakit", d: "Grup multi-lokasi yang mengadopsi DOK di layanan primer, atau integritas klaim untuk tim casemix." },
      { i: "🤝", t: "Distribusi & implementasi", d: "Organisasi yang sudah punya kepercayaan dan kehadiran di lapangan, dan ingin platform di belakangnya." },
    ];

const FIELDS = (en: boolean): Field[] => [
  { k: "org", label: en ? "Organisation" : "Organisasi", required: true, half: true },
  { k: "name", label: en ? "Your name" : "Nama Anda", required: true, half: true },
  { k: "email", label: "Email", type: "email", required: true, half: true },
  { k: "role", label: en ? "Your role" : "Jabatan Anda", half: true },
  { k: "track", label: en ? "Which conversation is this?" : "Percakapan yang mana ini?", type: "select", required: true,
    options: TRACKS(en).map((x) => x.t) },
  { k: "where", label: en ? "Province or district" : "Provinsi atau kabupaten", required: true, half: true },
  { k: "scale", label: en ? "Approximate scale" : "Perkiraan skala", type: "select", half: true,
    options: en
      ? ["A single site", "2–10 sites", "A district", "A province", "National"]
      : ["Satu lokasi", "2–10 lokasi", "Satu kabupaten", "Satu provinsi", "Nasional"] },
  { k: "message", label: en ? "What are you trying to solve?" : "Apa yang ingin Anda selesaikan?", type: "textarea", required: true,
    placeholder: en
      ? "The outcome you are accountable for, and what is in the way of it today."
      : "Capaian yang menjadi tanggung jawab Anda, dan apa yang menghambatnya saat ini." },
];

export default function PartnerPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ background: `linear-gradient(135deg,${C.dark},${C.charcoal})`, borderRadius: 24, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, background: C.teal, top: -180, right: -120, borderRadius: "50%", filter: "blur(110px)", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
          <Pill>{en ? "PARTNER WITH SAHAIBAT" : "BERMITRA DENGAN SAHAIBAT"}</Pill>
          <h1 style={{ color: C.white, fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.15, fontWeight: 800, marginBottom: 20 }}>
            {en
              ? <>The platform is built. <span style={{ color: C.teal }}>The reach is the work.</span></>
              : <>Platformnya sudah ada. <span style={{ color: C.teal }}>Jangkauannya yang jadi pekerjaan.</span></>}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8 }}>
            {en
              ? "SahAIbat runs across community, primary care and hospital as one connected record. Getting it into the hands of the people who need it takes partners who already hold the ground — a health office, a funder, a clinic network, an implementer. Tell us which you are."
              : "SahAIbat berjalan di layanan komunitas, primer, dan rumah sakit sebagai satu rekam terhubung. Membawanya ke tangan mereka yang membutuhkannya memerlukan mitra yang sudah memegang lapangan — dinas kesehatan, pendana, jaringan klinik, atau pelaksana. Beri tahu kami Anda yang mana."}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
        {TRACKS(en).map((x) => (
          <div key={x.t} style={{ background: C.white, border: `1px solid ${C.tealDk}20`, borderRadius: 20, padding: 26 }}>
            <div style={{ fontSize: 26, marginBottom: 12 }}>{x.i}</div>
            <div style={{ color: C.dark, fontWeight: 700, fontSize: 15.5, marginBottom: 9, lineHeight: 1.3 }}>{x.t}</div>
            <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.7 }}>{x.d}</p>
          </div>
        ))}
      </div>

      <div id="form" style={{ background: C.dark, borderRadius: 24, padding: "40px 40px" }}>
        <Pill>{en ? "START THE CONVERSATION" : "MULAI PERCAKAPAN"}</Pill>
        <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>
          {en ? "A real person reads every one of these." : "Setiap pesan ini dibaca oleh orang sungguhan."}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 26, maxWidth: 640 }}>
          {en
            ? "No sales sequence and no automated follow-up. We will reply with what a pilot would actually involve in your setting — including where we think we are the wrong fit."
            : "Tanpa rangkaian penjualan dan tanpa tindak lanjut otomatis. Kami akan menjawab dengan gambaran nyata sebuah pilot di lingkungan Anda — termasuk bila menurut kami kami bukan pilihan yang tepat."}
        </p>

        <RequestForm
          fields={FIELDS(en)}
          to="admin@sahaibat.com"
          subject={(v) => `Partnership — ${v.org || "SahAIbat"}${v.where ? ` · ${v.where}` : ""}`}
          submitLabel={en ? "Send this" : "Kirim"}
          note={en ? "Usually answered within two working days." : "Biasanya dijawab dalam dua hari kerja."}
          done={en
            ? "Prefer email? Write to admin@sahaibat.com directly."
            : "Lebih suka email? Kirim langsung ke admin@sahaibat.com."}
        />
      </div>
    </div>
  );
}
