"use client";

import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";

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

export default function EnterprisePage() {
  const { lang } = useI18n();

  const steps =
    lang === "en"
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

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.dark},${C.charcoal})`,
          borderRadius: 24,
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "#A48BFF",
            top: -180,
            right: -120,
            borderRadius: "50%",
            filter: "blur(110px)",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <Pill color="#A48BFF">
            {lang === "en" ? "FOR HOSPITALS" : "UNTUK RUMAH SAKIT"}
          </Pill>
          <h1
            style={{
              color: C.white,
              fontSize: "clamp(30px,4vw,48px)",
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            {lang === "en"
              ? "Stop claim leakage before it reaches E-Klaim."
              : "Hentikan kebocoran klaim sebelum sampai ke E-Klaim."}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            {lang === "en"
              ? "Documented conditions that never make it onto a diagnosis list quietly drop a claim's severity level — and the revenue with it. SahAIbat surfaces the gap while the chart is still open, so your coders can act before submission."
              : "Kondisi yang terdokumentasi tapi tak masuk daftar diagnosis diam-diam menurunkan tingkat keparahan klaim — dan pendapatan bersamanya. SahAIbat menandai celah itu selagi rekam medis masih terbuka, sehingga tim koder Anda bisa bertindak sebelum pengajuan."}
          </p>
          <p style={{ color: "#A48BFF", fontSize: 13, fontWeight: 600 }}>
            {lang === "en"
              ? "Advisory only — your coding team and E-Klaim's grouper always make the final call."
              : "Bersifat advisory — keputusan akhir tetap di tangan tim koder dan grouper E-Klaim."}
          </p>
          <div style={{ marginTop: 28 }}>
            <a
              href="mailto:enterprise@sahaibat.com?subject=Enterprise%20inquiry"
              style={{
                display: "inline-block",
                background: "#A48BFF",
                color: C.dark,
                padding: "13px 26px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {lang === "en" ? "Talk to our enterprise team →" : "Hubungi tim enterprise kami →"}
            </a>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: C.white, border: `1px solid ${C.tealDk}20`, borderRadius: 24, padding: "40px 36px" }}>
        <Pill>{lang === "en" ? "HOW IT WORKS" : "CARA KERJANYA"}</Pill>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ borderLeft: `3px solid ${C.tealDk}`, paddingLeft: 16 }}>
              <div style={{ color: C.tealDk, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{s.n}</div>
              <div style={{ color: C.dark, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.t}</div>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div style={{ background: C.dark, borderRadius: 24, padding: "36px 36px" }}>
        <Pill>{lang === "en" ? "REGULATORY POSITION" : "POSISI REGULASI"}</Pill>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8 }}>
          {lang === "en"
            ? "iDRG coding stays on ICD-10-IM. E-Klaim owns grouping. SahAIbat never submits or alters a claim — it surfaces documentation gaps for a human coder to review and act on."
            : "Pengkodean iDRG tetap mengacu pada ICD-10-IM. E-Klaim yang memiliki kewenangan grouping. SahAIbat tidak pernah mengirim atau mengubah klaim — hanya menampilkan celah dokumentasi untuk ditinjau dan ditindaklanjuti oleh koder manusia."}
        </p>
      </div>

      {/* North star tie-in */}
      <div style={{ background: `${C.tealDk}0A`, border: `1px solid ${C.tealDk}25`, borderRadius: 24, padding: "36px 36px" }}>
        <Pill>{lang === "en" ? "PART OF ONE INDONESIAN RECORD" : "BAGIAN DARI SATU REKAM INDONESIA"}</Pill>
        <p style={{ color: C.text, fontSize: 14, lineHeight: 1.8 }}>
          {lang === "en"
            ? "Every documentation gap this node catches — with consent — becomes part of the same closed-loop record that trains SahAIbat's own Indonesian clinical language model. Not a model adapted from English medical literature: one built on how Indonesian doctors actually document, code, and reason under BPJS and SATUSEHAT."
            : "Setiap celah dokumentasi yang ditangkap titik ini — dengan persetujuan — menjadi bagian dari rekam closed-loop yang sama yang melatih model bahasa klinis Indonesia milik SahAIbat sendiri. Bukan model yang diadaptasi dari literatur medis bahasa Inggris — dibangun dari cara dokter Indonesia benar-benar mendokumentasikan, mengode, dan bernalar dalam kerangka BPJS dan SATUSEHAT."}
        </p>
      </div>
    </div>
  );
}
