"use client";

import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";
import { RequestForm, type Field } from "@/components/sahaibat/RequestForm";

function Pill({ children, color = C.teal }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `${color}12`,
        border: `1px solid ${color}35`,
        borderRadius: 20,
        padding: "6px 16px",
        marginBottom: 20,
      }}
    >
      <span style={{ color, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{children}</span>
    </div>
  );
}

// The deck used to sit behind a public URL. A link you cannot attribute is a
// document you have no record of having sent — so it is now requested, and
// every copy that goes out is attached to a name and an organisation.
const DECK_FIELDS = (en: boolean): Field[] => [
  { k: "name", label: en ? "Name" : "Nama", required: true, half: true },
  { k: "email", label: "Email", type: "email", required: true, half: true },
  { k: "org", label: en ? "Firm or organisation" : "Perusahaan atau organisasi", required: true, half: true },
  { k: "role", label: en ? "You are" : "Anda adalah", type: "select", required: true, half: true,
    options: en
      ? ["Venture fund", "Angel investor", "Strategic / corporate", "Family office", "Development finance", "Other"]
      : ["Dana ventura", "Investor angel", "Strategis / korporasi", "Family office", "Lembaga pembiayaan pembangunan", "Lainnya"] },
  { k: "note", label: en ? "Anything you want us to know (optional)" : "Hal yang ingin Anda sampaikan (opsional)",
    type: "textarea",
    placeholder: en ? "Stage focus, cheque size, what prompted the look…" : "Fokus tahapan, ukuran investasi, apa yang membuat Anda tertarik…" },
];

export default function InvestorsPage() {
  const { lang } = useI18n();

  const reasons = lang === "en"
    ? [
        { icon: "🗺️", title: "A window that won't stay open", body: "Indonesia's health ministry has issued parallel digital mandates across community health, clinics, and hospitals — unfunded, and unserved by any connected platform today." },
        { icon: "🔗", title: "Built end-to-end, not one layer", body: "Most healthtech picks a single layer — a clinic EMR, or a patient app. SahAIbat already operates across community, family, clinic, and hospital as one connected record." },
        { icon: "🇮🇩", title: "A sovereign clinical AI, not a wrapper", body: "Every consented interaction feeds a training corpus no foreign model has: how Indonesian health workers actually screen, document, and decide, in Bahasa Indonesia, under Indonesian regulation." },
        { icon: "🌱", title: "Live, not projected", body: "This isn't a deck of mockups. It's running in the field today, with real partners, real clinicians, and a technical team that has already shipped the whole platform." },
      ]
    : [
        { icon: "🗺️", title: "Jendela yang tidak akan lama terbuka", body: "Kementerian Kesehatan Indonesia telah menerbitkan mandat digital paralel di tingkat komunitas, klinik, dan rumah sakit — tidak didanai, dan belum dilayani oleh platform terhubung mana pun saat ini." },
        { icon: "🔗", title: "Dibangun end-to-end, bukan satu lapisan", body: "Kebanyakan healthtech memilih satu lapisan — EMR klinik, atau aplikasi pasien. SahAIbat sudah beroperasi di komunitas, keluarga, klinik, dan rumah sakit sebagai satu rekam terhubung." },
        { icon: "🇮🇩", title: "AI klinis berdaulat, bukan pembungkus", body: "Setiap interaksi berpersetujuan mengisi corpus pelatihan yang tidak dimiliki model asing mana pun: bagaimana tenaga kesehatan Indonesia benar-benar melakukan skrining, dokumentasi, dan keputusan, dalam Bahasa Indonesia, di bawah regulasi Indonesia." },
        { icon: "🌱", title: "Aktif, bukan proyeksi", body: "Ini bukan deck berisi mockup. Ini berjalan di lapangan hari ini, dengan mitra nyata, klinisi nyata, dan tim teknis yang sudah merilis seluruh platform." },
      ];

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${C.dark},${C.charcoal})`, borderRadius: 24, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, background: C.teal, top: -180, right: -120, borderRadius: "50%", filter: "blur(110px)", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
          <Pill>{lang === "en" ? "FOR INVESTORS" : "UNTUK INVESTOR"}</Pill>
          <h1 style={{ color: C.white, fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.15, fontWeight: 800, marginBottom: 20 }}>
            {lang === "en"
              ? <>The infrastructure layer for Indonesian clinical AI <span style={{ color: C.teal }}>does not exist yet.</span></>
              : <>Lapisan infrastruktur AI klinis Indonesia <span style={{ color: C.teal }}>belum ada.</span></>}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8 }}>
            {lang === "en"
              ? "No connected platform today serves Indonesia's community health workers, doctors, and hospitals in the same record. No Indonesian clinical AI has been trained on Indonesian data. This page won't show you the numbers — those are in the deck. It's here to tell you why the thesis is worth ten minutes of your time."
              : "Belum ada platform terhubung yang melayani Kader, dokter, dan rumah sakit Indonesia dalam satu rekam yang sama. Belum ada AI klinis Indonesia yang dilatih dengan data Indonesia. Halaman ini tidak menampilkan angka — itu ada di deck. Halaman ini ada untuk menjelaskan mengapa tesis ini layak sepuluh menit waktu Anda."}
          </p>
        </div>
      </div>

      {/* Reasons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {reasons.map((r) => (
          <div key={r.title} style={{ background: C.white, border: `1px solid ${C.tealDk}20`, borderRadius: 20, padding: 26 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ color: C.dark, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{r.title}</div>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{r.body}</p>
          </div>
        ))}
      </div>

      {/* Closing line + gated deck request */}
      <div id="deck" style={{ background: C.dark, borderRadius: 24, padding: "40px 40px" }}>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.8, fontStyle: "italic", marginBottom: 30, maxWidth: 700 }}>
          {lang === "en"
            ? "\"If you see what we see, we'd like to talk. Structure, timeline, and terms stay in the conversation — not on this page.\""
            : "\"Jika Anda melihat apa yang kami lihat, kami ingin berbicara. Struktur, linimasa, dan persyaratan ada dalam percakapan — bukan di halaman ini.\""}
        </p>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 30 }}>
          <Pill>{lang === "en" ? "REQUEST THE DECK" : "MINTA DECK"}</Pill>
          <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>
            {lang === "en" ? "We will send it to you directly." : "Kami akan mengirimkannya langsung kepada Anda."}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 26, maxWidth: 620 }}>
            {lang === "en"
              ? "The deck carries live metrics, cohort data and commercial detail, so it is not published on the open web. Tell us who you are and we will send the current version, usually the same day."
              : "Deck ini memuat metrik terkini, data kohort, dan detail komersial, sehingga tidak dipublikasikan secara terbuka. Beri tahu kami siapa Anda dan kami kirimkan versi terkini, biasanya pada hari yang sama."}
          </p>

          <RequestForm
            fields={DECK_FIELDS(lang === "en")}
            to="investor@sahaibat.com"
            subject={(v) => `Deck request — ${v.org || v.name || "SahAIbat"}`}
            submitLabel={lang === "en" ? "Request the deck" : "Minta deck"}
            note={lang === "en" ? "Usually answered the same day." : "Biasanya dijawab pada hari yang sama."}
            done={lang === "en"
              ? "We treat every request as confidential and do not add anyone to a mailing list."
              : "Setiap permintaan kami perlakukan sebagai rahasia dan tidak ditambahkan ke milis mana pun."}
          />
        </div>
      </div>
    </div>
  );
}
