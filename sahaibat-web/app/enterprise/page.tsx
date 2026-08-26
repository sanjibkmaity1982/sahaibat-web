"use client";

// app/enterprise/page.tsx
//
// The page this replaces was entirely one product for one buyer: claim
// leakage at E-Klaim, headed "FOR HOSPITALS". That is a strong module and it
// is kept below as the worked example — but it was the whole page, so a clinic
// group or a health office arriving here saw nothing addressed to them.
//
// Restructured around WHO IS ASKING. Three institutional buyers, four
// capabilities each, then the claim-integrity deep dive as the detailed
// example, then how any of it actually deploys.
//
// Accent brought back to brand teal; the old page ran a purple that appears
// nowhere else on either property.

import React, { useState } from "react";
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

const TRACKS = (en: boolean) => en
  ? [
      {
        id: "hospital", label: "Hospitals",
        head: "Revenue you already earned, surfaced before the claim leaves.",
        caps: [
          { t: "Claim integrity", d: "Documented-but-uncoded conditions surfaced while the chart is still open — before E-Klaim, not after a denial." },
          { t: "Clinical documentation", d: "DOK at the point of care across departments: the note, the code and the checks produced in the consultation itself." },
          { t: "SATUSEHAT compliance", d: "Encounters submitted over HL7 FHIR R4 automatically, so the national obligation is met by working normally." },
          { t: "Casemix visibility", d: "Where severity is being lost, by department and by chart — so the pattern is fixable, not just the individual claim." },
        ],
      },
      {
        id: "network", label: "Clinic networks",
        head: "One standard of care across every site you run.",
        caps: [
          { t: "DOK at every site", d: "The same note, the same coding discipline and the same claim pre-check in all locations, however many doctors rotate through them." },
          { t: "Kapitasi protection", d: "Referral ratio and the 144-diagnosis FKTP scope watched per facility, so one site's referrals do not cost the group." },
          { t: "Per-facility isolation", d: "Each clinic connects with its own BPJS and SATUSEHAT credentials, encrypted separately. Nothing pooled, nothing cross-submitted." },
          { t: "Patient continuity", d: "Kasih keeps the care plan alive in the family's WhatsApp between visits — which is what brings the patient back to your clinic." },
        ],
      },
      {
        id: "gov", label: "Health offices",
        head: "The district sees what the village sees — the same day.",
        caps: [
          { t: "Community capture", d: "Posyandu growth tracking and Bidan ANC aligned to ILP and the ANC 10T protocol, recorded once at the point of contact." },
          { t: "District dashboards", d: "Nutrition status by WAZ band, immunisation coverage, ANC quality and Posyandu ranking — current, not a quarterly return." },
          { t: "Surveillance", d: "Communicable-disease counts as epidemic curves, with alert thresholds derived from the district's own baseline." },
          { t: "Community to clinic", d: "A danger sign raised at a health post reaches the Puskesmas that receives the patient, as the same record." },
        ],
      },
    ]
  : [
      {
        id: "hospital", label: "Rumah sakit",
        head: "Pendapatan yang sudah Anda hasilkan, ditemukan sebelum klaim dikirim.",
        caps: [
          { t: "Integritas klaim", d: "Kondisi yang terdokumentasi tapi belum dikode ditampilkan selagi rekam medis masih terbuka — sebelum E-Klaim, bukan setelah ditolak." },
          { t: "Dokumentasi klinis", d: "DOK di titik layanan lintas departemen: catatan, kode, dan pemeriksaannya lahir dari konsultasi itu sendiri." },
          { t: "Kepatuhan SATUSEHAT", d: "Kunjungan dikirim lewat HL7 FHIR R4 secara otomatis, sehingga kewajiban nasional terpenuhi dengan bekerja seperti biasa." },
          { t: "Visibilitas casemix", d: "Di mana tingkat keparahan hilang, per departemen dan per rekam — sehingga polanya bisa diperbaiki, bukan sekadar satu klaim." },
        ],
      },
      {
        id: "network", label: "Jaringan klinik",
        head: "Satu standar layanan di setiap lokasi yang Anda kelola.",
        caps: [
          { t: "DOK di setiap lokasi", d: "Catatan yang sama, disiplin coding yang sama, dan pra-periksa klaim yang sama di semua lokasi, berapa pun dokter yang bergantian." },
          { t: "Perlindungan kapitasi", d: "Rasio rujukan dan cakupan 144 diagnosa FKTP dipantau per fasilitas, agar rujukan satu lokasi tidak membebani grup." },
          { t: "Isolasi per fasilitas", d: "Tiap klinik terhubung dengan kredensial BPJS dan SATUSEHAT miliknya sendiri, terenkripsi terpisah. Tidak digabung, tidak saling kirim." },
          { t: "Kesinambungan pasien", d: "Kasih menjaga rencana perawatan tetap hidup di WhatsApp keluarga antar kunjungan — dan itulah yang membawa pasien kembali." },
        ],
      },
      {
        id: "gov", label: "Dinas kesehatan",
        head: "Kabupaten melihat apa yang desa lihat — di hari yang sama.",
        caps: [
          { t: "Pencatatan komunitas", d: "Pemantauan tumbuh kembang Posyandu dan ANC Bidan selaras ILP dan protokol ANC 10T, dicatat sekali di titik kontak." },
          { t: "Dasbor kabupaten", d: "Status gizi per pita WAZ, cakupan imunisasi, kualitas ANC, dan peringkat Posyandu — terkini, bukan laporan triwulanan." },
          { t: "Surveilans", d: "Hitungan penyakit menular sebagai kurva epidemi, dengan ambang peringatan dari baseline kabupaten itu sendiri." },
          { t: "Komunitas ke klinik", d: "Tanda bahaya yang muncul di poskesdes sampai ke Puskesmas yang menerima pasien, sebagai rekam yang sama." },
        ],
      },
    ];

const FIELDS = (en: boolean): Field[] => [
  { k: "org", label: en ? "Institution" : "Institusi", required: true, half: true },
  { k: "name", label: en ? "Your name" : "Nama Anda", required: true, half: true },
  { k: "email", label: "Email", type: "email", required: true, half: true },
  { k: "role", label: en ? "Your role" : "Jabatan Anda", half: true },
  { k: "type", label: en ? "You are" : "Anda adalah", type: "select", required: true, half: true,
    options: en
      ? ["Hospital", "Clinic network", "Health office / Dinas Kesehatan", "Other"]
      : ["Rumah sakit", "Jaringan klinik", "Dinas kesehatan", "Lainnya"] },
  { k: "sites", label: en ? "Sites or beds" : "Jumlah lokasi atau tempat tidur", half: true },
  { k: "message", label: en ? "What are you trying to fix?" : "Apa yang ingin Anda perbaiki?", type: "textarea", required: true,
    placeholder: en ? "Claim rejections, documentation load, reporting burden, coverage…"
                    : "Penolakan klaim, beban dokumentasi, beban pelaporan, cakupan…" },
];

export default function EnterprisePage() {
  const { lang } = useI18n();
  const en = lang === "en";
  const tracks = TRACKS(en);
  const [sel, setSel] = useState(0);
  const tr = tracks[sel];

  const steps = en
    ? [
        { n: "01", t: "Scans the chart", d: "Compares what's already documented against conditions that support a higher severity level." },
        { n: "02", t: "Flags the gap", d: "Surfaces documented-but-uncoded conditions while the chart is still open — not after a denial." },
        { n: "03", t: "Hands it to your coder", d: "One review screen, one decision. SahAIbat never submits or alters a claim." },
      ]
    : [
        { n: "01", t: "Memindai rekam medis", d: "Membandingkan apa yang sudah terdokumentasi dengan kondisi yang mendukung tingkat keparahan lebih tinggi." },
        { n: "02", t: "Menandai celah", d: "Menampilkan kondisi yang terdokumentasi namun belum dikode — selagi rekam medis masih terbuka, bukan setelah klaim ditolak." },
        { n: "03", t: "Diserahkan ke koder Anda", d: "Satu layar tinjauan, satu keputusan. SahAIbat tidak pernah mengirim atau mengubah klaim." },
      ];

  const deploy = en
    ? [
        { t: "Nothing is replaced", d: "SahAIbat runs alongside the systems you already own. No migration, no new hardware, no rip-and-replace." },
        { t: "Your credentials", d: "Every facility connects with its own BPJS and SATUSEHAT accounts, encrypted per site." },
        { t: "🇮🇩 Data stays in Indonesia", d: "AWS Jakarta, AES-256-GCM at rest, under UU PDP. Registered PSE with Kominfo." },
        { t: "Advisory, always", d: "Nothing is submitted or altered automatically. Your clinicians and coders make every final call." },
      ]
    : [
        { t: "Tidak ada yang diganti", d: "SahAIbat berjalan berdampingan dengan sistem yang sudah Anda miliki. Tanpa migrasi, tanpa perangkat baru." },
        { t: "Kredensial Anda", d: "Setiap fasilitas terhubung dengan akun BPJS dan SATUSEHAT miliknya sendiri, terenkripsi per lokasi." },
        { t: "🇮🇩 Data tetap di Indonesia", d: "AWS Jakarta, AES-256-GCM saat disimpan, sesuai UU PDP. Terdaftar sebagai PSE di Kominfo." },
        { t: "Selalu advisory", d: "Tidak ada yang dikirim atau diubah otomatis. Klinisi dan koder Anda yang memutuskan." },
      ];

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* hero */}
      <div style={{ background: `linear-gradient(135deg,${C.dark},${C.tealXdk})`, borderRadius: 24, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 440, height: 440, background: C.teal, top: -190, right: -130, borderRadius: "50%", filter: "blur(120px)", opacity: 0.14, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 790 }}>
          <Pill dark>{en ? "FOR INSTITUTIONS" : "UNTUK INSTITUSI"}</Pill>
          <h1 style={{ color: C.white, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.14, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
            {en
              ? <>One platform, <span style={{ color: C.teal }}>whichever layer you run.</span></>
              : <>Satu platform, <span style={{ color: C.teal }}>apa pun lapisan yang Anda kelola.</span></>}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 16.5, lineHeight: 1.8 }}>
            {en
              ? "A hospital wants the claim to leave clean. A clinic group wants one standard across every site. A health office wants the district to see what the village sees. It is the same connected record underneath — what changes is which part of it you are accountable for."
              : "Rumah sakit ingin klaimnya keluar bersih. Jaringan klinik ingin satu standar di semua lokasi. Dinas kesehatan ingin kabupaten melihat apa yang desa lihat. Rekam terhubung di bawahnya sama — yang berbeda hanyalah bagian mana yang menjadi tanggung jawab Anda."}
          </p>
        </div>
      </div>

      {/* who is asking */}
      <div style={{ background: C.white, border: `1px solid ${C.tealDk}20`, borderRadius: 24, padding: "34px 32px" }}>
        <div className="ent-tabs" role="tablist">
          {tracks.map((t, i) => (
            <button key={t.id} role="tab" aria-selected={i === sel}
              className={`ent-tab${i === sel ? " on" : ""}`} onClick={() => setSel(i)}>
              {t.label}
            </button>
          ))}
        </div>

        <div key={tr.id} className="ent-panel">
          <h2 style={{ color: C.dark, fontSize: "clamp(21px,2.5vw,30px)", fontWeight: 800, lineHeight: 1.22, margin: "26px 0 24px", maxWidth: 680, letterSpacing: "-0.01em" }}>
            {tr.head}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: 14 }}>
            {tr.caps.map((c) => (
              <div key={c.t} style={{ background: C.cream, border: `1px solid ${C.tealDk}18`, borderRadius: 16, padding: "20px 20px" }}>
                <div style={{ color: C.dark, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.t}</div>
                <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.72 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* the worked example */}
      <div style={{ background: C.white, border: `1px solid ${C.tealDk}20`, borderRadius: 24, padding: "38px 34px" }}>
        <Pill>{en ? "WORKED EXAMPLE · CLAIM INTEGRITY" : "CONTOH NYATA · INTEGRITAS KLAIM"}</Pill>
        <h2 style={{ color: C.dark, fontSize: "clamp(20px,2.3vw,27px)", fontWeight: 800, lineHeight: 1.25, marginBottom: 12, maxWidth: 700, letterSpacing: "-0.01em" }}>
          {en ? "Stop claim leakage before it reaches E-Klaim." : "Hentikan kebocoran klaim sebelum sampai ke E-Klaim."}
        </h2>
        <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 30, maxWidth: 760 }}>
          {en
            ? "Documented conditions that never make it onto a diagnosis list quietly drop a claim's severity level — and the revenue with it. SahAIbat surfaces the gap while the chart is still open, so your coders can act before submission."
            : "Kondisi yang terdokumentasi tapi tak masuk daftar diagnosis diam-diam menurunkan tingkat keparahan klaim — dan pendapatan bersamanya. SahAIbat menandai celah itu selagi rekam medis masih terbuka, sehingga tim koder Anda bisa bertindak sebelum pengajuan."}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 26 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ borderLeft: `3px solid ${C.tealDk}`, paddingLeft: 16 }}>
              <div style={{ color: C.tealDk, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{s.n}</div>
              <div style={{ color: C.dark, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.t}</div>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ background: `${C.tealDk}0A`, border: `1px solid ${C.tealDk}22`, borderRadius: 14, padding: "16px 18px" }}>
          <p style={{ color: C.text, fontSize: 13.5, lineHeight: 1.75 }}>
            {en
              ? "iDRG coding stays on ICD-10-IM. E-Klaim owns grouping. SahAIbat never submits or alters a claim — it surfaces documentation gaps for a human coder to review and act on."
              : "Pengkodean iDRG tetap mengacu pada ICD-10-IM. E-Klaim yang memiliki kewenangan grouping. SahAIbat tidak pernah mengirim atau mengubah klaim — hanya menampilkan celah dokumentasi untuk ditinjau dan ditindaklanjuti oleh koder manusia."}
          </p>
        </div>
      </div>

      {/* how it deploys */}
      <div style={{ background: C.cream, borderRadius: 24, padding: "36px 34px" }}>
        <Pill>{en ? "HOW IT DEPLOYS" : "CARA PENERAPANNYA"}</Pill>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {deploy.map((d) => (
            <div key={d.t} style={{ background: C.white, border: `1px solid ${C.tealDk}18`, borderRadius: 16, padding: "18px 18px" }}>
              <div style={{ color: C.dark, fontWeight: 700, fontSize: 14.5, marginBottom: 7 }}>{d.t}</div>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{d.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* one record tie-in */}
      <div style={{ background: `${C.tealDk}0A`, border: `1px solid ${C.tealDk}25`, borderRadius: 24, padding: "34px 34px" }}>
        <Pill>{en ? "PART OF ONE INDONESIAN RECORD" : "BAGIAN DARI SATU REKAM INDONESIA"}</Pill>
        <p style={{ color: C.text, fontSize: 14.5, lineHeight: 1.8, maxWidth: 860 }}>
          {en
            ? "Whichever layer you run, the consented record it produces joins the same closed loop that trains SahAIbat's own Indonesian clinical model — built on how Indonesian clinicians actually document, code and reason under BPJS and SATUSEHAT, not adapted from English medical literature."
            : "Apa pun lapisan yang Anda kelola, rekam berpersetujuan yang dihasilkannya bergabung ke closed loop yang sama yang melatih model klinis Indonesia milik SahAIbat — dibangun dari cara klinisi Indonesia benar-benar mendokumentasikan, mengode, dan bernalar dalam kerangka BPJS dan SATUSEHAT, bukan hasil adaptasi literatur medis bahasa Inggris."}
        </p>
      </div>

      {/* talk to us */}
      <div id="talk" style={{ background: C.dark, borderRadius: 24, padding: "40px 40px" }}>
        <Pill dark>{en ? "TALK TO THE ENTERPRISE TEAM" : "HUBUNGI TIM ENTERPRISE"}</Pill>
        <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>
          {en ? "Tell us which layer you run." : "Beri tahu kami lapisan mana yang Anda kelola."}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 26, maxWidth: 640 }}>
          {en
            ? "We will come back with what a deployment looks like at your size — scope, integration, timeline, and what we would need from your team."
            : "Kami akan kembali dengan gambaran penerapan sesuai skala Anda — ruang lingkup, integrasi, linimasa, dan apa yang kami butuhkan dari tim Anda."}
        </p>
        <RequestForm
          fields={FIELDS(en)}
          to="enterprise@sahaibat.com"
          subject={(v) => `Enterprise — ${v.org || "SahAIbat"}${v.type ? ` · ${v.type}` : ""}`}
          submitLabel={en ? "Send this" : "Kirim"}
          note={en ? "Usually answered within two working days." : "Biasanya dijawab dalam dua hari kerja."}
        />
      </div>

      <style>{`
        .ent-tabs { display:flex; gap:6px; flex-wrap:wrap; }
        .ent-tab { background:${C.cream}; border:1px solid ${C.tealDk}22; color:${C.muted};
          border-radius:11px; padding:10px 22px; font-size:14px; font-weight:700;
          cursor:pointer; font-family:inherit; transition:all .18s; }
        .ent-tab:hover { color:${C.dark}; border-color:${C.tealDk}45; }
        .ent-tab.on { background:${C.tealDk}; border-color:${C.tealDk}; color:#fff; }
        .ent-panel { animation:entIn .32s ease-out; }
        @keyframes entIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @media (prefers-reduced-motion: reduce) { .ent-panel { animation:none; } }
      `}</style>
    </div>
  );
}
