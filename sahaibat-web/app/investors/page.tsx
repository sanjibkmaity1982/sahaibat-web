"use client";

import { useState } from "react";
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

const DECK_URL = "https://investor.sahaibat.com";

export default function InvestorsPage() {
  const { lang } = useI18n();
  const [passcode, setPasscode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "granted" | "denied">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("checking");
    try {
      const res = await fetch("/api/investor-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (res.ok) {
        setState("granted");
        window.location.href = DECK_URL;
      } else {
        setState("denied");
      }
    } catch {
      setState("denied");
    }
  }

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
        { icon: "🌱", title: "Aktif, bukan proyeksi", body: "ini bukan deck berisi mockup. Ini berjalan di lapangan hari ini, dengan mitra nyata, klinisi nyata, dan tim teknis yang sudah merilis seluruh platform." },
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

      {/* Closing line + gate */}
      <div style={{ background: C.dark, borderRadius: 24, padding: "40px 40px" }}>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.8, fontFamily: "'Playfair Display',serif", fontStyle: "italic", marginBottom: 28, maxWidth: 700 }}>
          {lang === "en"
            ? "\"If you see what we see, we'd like to talk. Structure, timeline, and terms stay in the conversation — not on this page.\""
            : "\"Jika Anda melihat apa yang kami lihat, kami ingin berbicara. Struktur, linimasa, dan persyaratan ada dalam percakapan — bukan di halaman ini.\""}
        </p>

        <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="password"
            value={passcode}
            onChange={(e) => { setPasscode(e.target.value); setState("idle"); }}
            placeholder={lang === "en" ? "Enter your access code" : "Masukkan kode akses Anda"}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 16px", color: C.white, fontSize: 14, minWidth: 220 }}
          />
          <button
            type="submit"
            disabled={state === "checking" || !passcode}
            style={{ background: C.teal, color: C.dark, padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", opacity: state === "checking" ? 0.6 : 1 }}
          >
            {state === "checking" ? (lang === "en" ? "Checking…" : "Memeriksa…") : (lang === "en" ? "Enter the deck →" : "Masuk ke deck →")}
          </button>
        </form>
        {state === "denied" && (
          <p style={{ color: "#FF8A8A", fontSize: 13, marginTop: 12 }}>
            {lang === "en" ? "That code didn't work. If you're an approved investor, check your email for the code or request one below." : "Kode tidak cocok. Jika Anda investor yang disetujui, periksa email Anda untuk kode tersebut atau minta di bawah ini."}
          </p>
        )}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 16 }}>
          {lang === "en" ? "Don't have a code? " : "Belum punya kode? "}
          <a href="mailto:investor@sahaibat.com?subject=Investor%20deck%20access" style={{ color: C.teal, textDecoration: "none" }}>
            {lang === "en" ? "Request access →" : "Minta akses →"}
          </a>
        </p>
      </div>
    </div>
  );
}
