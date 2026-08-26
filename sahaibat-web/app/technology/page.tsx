"use client";

// app/technology/page.tsx
//
// The technical brief. "See the technical brief" was a live CTA pointing at
// /enterprise, which is a commercial page — so the strongest claim on the
// homepage led somewhere that could not support it.
//
// WHAT THIS PAGE IS ALLOWED TO SAY. Architecture, not implementation. Every
// claim here describes a property a reader could verify from the outside —
// that a code is chosen from a catalogue, that an eGFR is computed rather
// than predicted, that inference runs on hardware in Jakarta. None of it
// describes how any of that is built, and the closing section says so
// explicitly rather than leaving the omission to look accidental.

import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";
import { RequestForm, type Field } from "@/components/sahaibat/RequestForm";

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const col = dark ? C.teal : C.tealDk;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: `${col}14`, border: `1px solid ${col}38`,
      borderRadius: 20, padding: "6px 16px", marginBottom: 18,
    }}>
      <span style={{ color: col, fontSize: 11, fontWeight: 800, letterSpacing: 1.3 }}>{children}</span>
    </div>
  );
}

const PLANES = (en: boolean) => en
  ? [
      {
        tag: "PLANE 1 · GENERATIVE",
        t: "Sovereign inference",
        d: "Indonesia's own medical AI, running on hardware we operate in Jakarta. A medical-specialist base model is being fine-tuned on Indonesian clinical language — how a kader records a danger sign, how a midwife documents ANC 10T, how a doctor writes an assessment in Bahasa Indonesia. Speech, extraction and document reading all resolve on machines under our control, with a governed cloud tier behind them for load.",
        chips: ["MedGemma fine-tune", "Self-hosted GPU · Jakarta", "Negation-aware Bahasa", "Multimodal document reading"],
      },
      {
        tag: "PLANE 2 · DETERMINISTIC",
        t: "The verification layer",
        d: "No model runs here, and that is the point. Clinical arithmetic is computed, never predicted — CKD-EPI, FIB-4, eAG, WHO Z-scores return the same answer every time and can be audited line by line. Diagnosis codes are selected from the ICD-10 catalogue rather than composed, so an invented code is not an error the system is able to make. Evidence is graded strongest-first, and a measured result outranks a mentioned symptom.",
        chips: ["Deterministic clinical arithmetic", "Catalogue-bound coding", "Evidence-graded reasoning", "Fail-closed by design"],
      },
    ]
  : [
      {
        tag: "LAPIS 1 · GENERATIF",
        t: "Inferensi berdaulat",
        d: "AI medis milik Indonesia, berjalan di perangkat yang kami operasikan di Jakarta. Model dasar spesialis medis sedang kami latih ulang dengan bahasa klinis Indonesia — cara kader mencatat tanda bahaya, cara bidan mendokumentasikan ANC 10T, cara dokter menulis asesmen dalam Bahasa Indonesia. Suara, ekstraksi, dan pembacaan dokumen selesai di mesin yang kami kendalikan, dengan lapisan cloud terkelola di belakangnya untuk beban puncak.",
        chips: ["Fine-tune MedGemma", "GPU mandiri · Jakarta", "Paham negasi bahasa Indonesia", "Pembacaan dokumen multimodal"],
      },
      {
        tag: "LAPIS 2 · DETERMINISTIK",
        t: "Lapisan verifikasi",
        d: "Tidak ada model yang berjalan di sini, dan justru itu intinya. Aritmetika klinis dihitung, bukan ditebak — CKD-EPI, FIB-4, eAG, Z-score WHO memberi jawaban sama setiap kali dan bisa diaudit baris demi baris. Kode diagnosis dipilih dari katalog ICD-10, bukan dikarang, sehingga mengarang kode bukan kesalahan yang mampu dilakukan sistem ini. Bukti dijenjangkan dari yang terkuat, dan hasil terukur mengalahkan gejala yang sekadar disebut.",
        chips: ["Aritmetika klinis deterministik", "Coding terikat katalog", "Penalaran berjenjang bukti", "Gagal-aman sejak dirancang"],
      },
    ];

const LAYERS = (en: boolean) => en
  ? [
      { t: "Risk engine", d: "One field measurement climbs six levels of meaning — from a weight on a scale to a WHO Z-score, a malnutrition class, a referral trigger, a district indicator and a national return, with nobody re-entering it." },
      { t: "Surveillance", d: "Communicable-disease counts aggregate into epidemic curves with alert thresholds derived from the district's own baseline rather than a fixed national number." },
      { t: "Interoperability", d: "SATUSEHAT over HL7 FHIR R4. BPJS via PCare for primary care and E-Klaim for hospital claims, with per-facility credential isolation — nothing pooled, nothing submitted under another clinic's name." },
      { t: "🇮🇩 Data residency", d: "Records are stored in Indonesia on AWS Jakarta, encrypted AES-256-GCM at rest, under UU PDP. SahAIbat is a registered PSE with Kominfo." },
      { t: "Consent-scoped corpus", d: "Corrections become training data only where consent covers it. The corpus is the moat, and it is bounded by the same rules that make it lawful." },
      { t: "Human authority", d: "Every layer is advisory. The system never signs, never submits a claim on its own, and blocks its own output when it cannot justify it." },
    ]
  : [
      { t: "Mesin risiko", d: "Satu pengukuran di lapangan menaiki enam tingkat makna — dari angka timbangan menjadi Z-score WHO, klasifikasi gizi, pemicu rujukan, indikator kabupaten, dan umpan balik nasional, tanpa ada yang mengetik ulang." },
      { t: "Surveilans", d: "Hitungan penyakit menular teragregasi menjadi kurva epidemi dengan ambang peringatan yang diturunkan dari baseline kabupaten itu sendiri, bukan angka nasional yang tetap." },
      { t: "Interoperabilitas", d: "SATUSEHAT lewat HL7 FHIR R4. BPJS lewat PCare untuk layanan primer dan E-Klaim untuk klaim rumah sakit, dengan isolasi kredensial per fasilitas — tidak ada yang digabung, tidak ada yang dikirim atas nama klinik lain." },
      { t: "🇮🇩 Residensi data", d: "Rekam medis tersimpan di Indonesia pada AWS Jakarta, terenkripsi AES-256-GCM saat disimpan, sesuai UU PDP. SahAIbat terdaftar sebagai PSE di Kominfo." },
      { t: "Korpus terikat persetujuan", d: "Koreksi menjadi data latih hanya sejauh persetujuan mencakupnya. Korpus adalah benteng kami, dan ia dibatasi oleh aturan yang membuatnya sah." },
      { t: "Otoritas manusia", d: "Setiap lapisan bersifat advisory. Sistem tidak pernah menandatangani, tidak pernah mengirim klaim sendiri, dan menahan keluarannya sendiri bila tidak bisa dipertanggungjawabkan." },
    ];

const BRIEF_FIELDS = (en: boolean): Field[] => [
  { k: "name", label: en ? "Name" : "Nama", required: true, half: true },
  { k: "email", label: "Email", type: "email", required: true, half: true },
  { k: "org", label: en ? "Organisation" : "Organisasi", required: true, half: true },
  { k: "role", label: en ? "You are" : "Anda adalah", type: "select", required: true, half: true,
    options: en
      ? ["Investor / technical diligence", "Hospital or clinic IT", "Government / health office", "Research or academic", "Press", "Other"]
      : ["Investor / uji tuntas teknis", "TI rumah sakit atau klinik", "Pemerintah / dinas kesehatan", "Riset atau akademik", "Pers", "Lainnya"] },
  { k: "ask", label: en ? "What do you need to evaluate?" : "Apa yang perlu Anda evaluasi?", type: "textarea",
    placeholder: en
      ? "Security review, integration scope, model provenance, procurement…"
      : "Tinjauan keamanan, ruang lingkup integrasi, asal-usul model, pengadaan…" },
];

export default function TechnologyPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* hero */}
      <div style={{ background: `linear-gradient(135deg,${C.dark},${C.tealXdk})`, borderRadius: 24, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 460, height: 460, background: C.teal, top: -200, right: -140, borderRadius: "50%", filter: "blur(120px)", opacity: 0.14, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <Pill dark>{en ? "TECHNICAL BRIEF" : "RINGKASAN TEKNIS"}</Pill>
          <h1 style={{ color: C.white, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.14, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
            {en
              ? <>Indonesia&apos;s sovereign medical AI, <span style={{ color: C.teal }}>and the layer that checks it.</span></>
              : <>AI medis berdaulat Indonesia, <span style={{ color: C.teal }}>dan lapisan yang memeriksanya.</span></>}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 16.5, lineHeight: 1.8 }}>
            {en
              ? "Most clinical AI is one model behind an interface. SahAIbat is two planes: a sovereign generative plane that understands, and a deterministic plane that verifies what it produced. The second is why the first can be trusted in a regulated setting — and it is the part competitors would have to rebuild rather than copy."
              : "Kebanyakan AI klinis adalah satu model di balik antarmuka. SahAIbat terdiri dari dua lapis: lapis generatif berdaulat yang memahami, dan lapis deterministik yang memverifikasi hasilnya. Lapis kedua inilah yang membuat lapis pertama layak dipercaya dalam lingkungan teregulasi — dan bagian inilah yang harus dibangun ulang pesaing, bukan sekadar ditiru."}
          </p>
        </div>
      </div>

      {/* the two planes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        {PLANES(en).map((p, i) => (
          <div key={p.t} style={{
            background: i === 1 ? `linear-gradient(150deg,${C.dark},${C.tealXdk})` : C.white,
            border: i === 1 ? `1px solid ${C.teal}40` : `1px solid ${C.tealDk}20`,
            borderRadius: 22, padding: "30px 28px",
          }}>
            <div style={{ color: i === 1 ? C.teal : C.tealDk, fontSize: 9.5, fontWeight: 800, letterSpacing: 1.3, marginBottom: 12 }}>{p.tag}</div>
            <h2 style={{ color: i === 1 ? C.white : C.dark, fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.01em" }}>{p.t}</h2>
            <p style={{ color: i === 1 ? "rgba(255,255,255,0.68)" : C.muted, fontSize: 14.5, lineHeight: 1.8, marginBottom: 20 }}>{p.d}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {p.chips.map((c) => (
                <span key={c} style={{
                  fontSize: 11.5, fontWeight: 700, padding: "5px 11px", borderRadius: 8,
                  background: i === 1 ? "rgba(2,195,154,0.14)" : `${C.tealDk}0F`,
                  color: i === 1 ? C.teal : C.tealDk,
                  border: `1px solid ${i === 1 ? "rgba(2,195,154,0.3)" : `${C.tealDk}25`}`,
                }}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* everything the two planes sit inside */}
      <div style={{ background: C.cream, borderRadius: 24, padding: "40px 36px" }}>
        <Pill>{en ? "AROUND THE MODEL" : "DI SEKITAR MODEL"}</Pill>
        <h2 style={{ color: C.dark, fontSize: "clamp(22px,2.6vw,32px)", fontWeight: 800, lineHeight: 1.22, marginBottom: 30, maxWidth: 720, letterSpacing: "-0.01em" }}>
          {en ? "A model is the easy part. The rest is what a health ministry actually audits."
              : "Model itu bagian yang mudah. Sisanya yang benar-benar diaudit kementerian kesehatan."}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
          {LAYERS(en).map((l) => (
            <div key={l.t} style={{ background: C.white, border: `1px solid ${C.tealDk}1A`, borderRadius: 16, padding: "20px 20px" }}>
              <div style={{ color: C.dark, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{l.t}</div>
              <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.72 }}>{l.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* the honest boundary + request */}
      <div id="brief" style={{ background: C.dark, borderRadius: 24, padding: "40px 40px" }}>
        <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: 20, marginBottom: 34, maxWidth: 760 }}>
          <div style={{ color: C.teal, fontSize: 10, fontWeight: 800, letterSpacing: 1.3, marginBottom: 10 }}>
            {en ? "WHAT THIS PAGE DELIBERATELY DOES NOT SAY" : "YANG SENGAJA TIDAK DIJELASKAN DI HALAMAN INI"}
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15.5, lineHeight: 1.85 }}>
            {en
              ? "Model weights, training composition, prompt architecture, the verification rules themselves and our inference topology are not published. Everything above describes properties you could confirm from the outside; none of it describes how they are achieved. Under NDA we go considerably further, including a security review and an architecture walkthrough."
              : "Bobot model, komposisi pelatihan, arsitektur prompt, aturan verifikasi itu sendiri, dan topologi inferensi kami tidak dipublikasikan. Semua di atas menjelaskan sifat yang bisa Anda konfirmasi dari luar; tidak satu pun menjelaskan bagaimana hal itu dicapai. Dengan NDA kami membuka jauh lebih banyak, termasuk tinjauan keamanan dan penelusuran arsitektur."}
          </p>
        </div>

        <Pill dark>{en ? "REQUEST THE FULL BRIEF" : "MINTA RINGKASAN LENGKAP"}</Pill>
        <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>
          {en ? "Tell us what you need to evaluate." : "Beri tahu kami apa yang perlu Anda evaluasi."}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 26, maxWidth: 640 }}>
          {en
            ? "We will send the brief that matches the question — a security and residency pack for hospital IT, a model-provenance note for technical diligence, an integration scope for a health office."
            : "Kami akan mengirim ringkasan yang sesuai pertanyaannya — paket keamanan dan residensi untuk TI rumah sakit, catatan asal-usul model untuk uji tuntas teknis, atau ruang lingkup integrasi untuk dinas kesehatan."}
        </p>

        <RequestForm
          fields={BRIEF_FIELDS(en)}
          to="admin@sahaibat.com"
          subject={(v) => `Technical brief — ${v.org || v.name || "SahAIbat"}`}
          submitLabel={en ? "Request the brief" : "Minta ringkasan"}
          note={en ? "Usually answered within two working days." : "Biasanya dijawab dalam dua hari kerja."}
        />
      </div>
    </div>
  );
}
