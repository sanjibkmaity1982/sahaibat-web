"use client";

import Link from "next/link";
import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";

const SOCIAL: Array<{ icon: string; label: string; href: string }> = [
  { icon: "📘", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593691100246" },
  { icon: "📷", label: "Instagram", href: "https://www.instagram.com/sahaibat.sehat/" },
  { icon: "🎵", label: "TikTok", href: "https://www.tiktok.com/@sahaibat.health" },
];

export function SiteFooter() {
  const { lang, t } = useI18n();

  return (
    <footer style={{ background: C.charcoal, borderTop: "1px solid rgba(2,195,154,0.1)", padding: "56px 0 32px" }}>
      <div className="section-max">
        {/* Compliance strip */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(2,195,154,0.12)",
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 40,
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img src="/nvidia-inception.png" alt="NVIDIA Inception Program Member" style={{ height: 48, width: "auto", objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600 }}>
            {lang === "en" ? "Proudly part of the NVIDIA Inception Program" : "Dengan bangga menjadi bagian dari NVIDIA Inception Program"}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { t: "PSE Kominfo", s: "NIB 1202260248509" },
              { t: "UU PDP", s: "AES-256-GCM" },
              { t: "SATUSEHAT", s: "HL7 FHIR R4" },
              { t: "🇮🇩 AWS Jakarta", s: "ap-southeast-3" },
            ].map(({ t: title, s }) => (
              <div key={title} style={{ background: "rgba(2,195,154,0.06)", border: "1px solid rgba(2,195,154,0.15)", borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 10 }}>{title}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-grid" style={{ marginBottom: 40 }}>
          <div>
            <img src="/images/brand/wordmark-horizontal-dark.png" alt="SahAIbat" style={{ height: 32, width: "auto", opacity: 0.85, marginBottom: 16 }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 12 }}>
              {lang === "en" ? "Healthcare closer than ever — one connected record, from Posyandu to hospital." : "Kesehatan, kini lebih dekat — satu rekam terhubung, dari Posyandu hingga rumah sakit."}
            </p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, lineHeight: 1.7 }}>
              {lang === "en" ? "All IP owned by" : "Seluruh IP dimiliki oleh"}<br />
              <strong style={{ color: "rgba(255,255,255,0.25)" }}>Viantra · 11679210 Canada Inc</strong><br />
              PSE Lingkup Privat Asing<br />NIB: 1202260248509
            </p>
          </div>

          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>
              {lang === "en" ? "COMPANY" : "PERUSAHAAN"}
            </div>
            {[
              ["/#network", lang === "en" ? "How it works" : "Cara kerja"],
              ["/enterprise", lang === "en" ? "Enterprise" : "Enterprise"],
              ["/partner", lang === "en" ? "Partner with us" : "Bermitra"],
              ["/contact", t("legal.contact")],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", marginBottom: 8 }}>
                {label}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>
              {lang === "en" ? "PRODUCTS" : "PRODUK"}
            </div>
            <a href="https://www.sahaibatdok.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "#A48BFF", fontWeight: 600, fontSize: 13, textDecoration: "none", marginBottom: 8 }}>
              SahAIbat DoK ↗
            </a>
            {["Kader", "SahAIbat Bidan", "Kasih", "Konsensus"].map((p) => (
              <Link key={p} href="/#network" style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", marginBottom: 8 }}>
                {p}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>
              {lang === "en" ? "CONNECT" : "TERHUBUNG"}
            </div>
            <a href="mailto:admin@sahaibat.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", marginBottom: 9 }}>
              <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>📧</span><span>admin@sahaibat.com</span>
            </a>
            <a href="https://wa.me/6281918669241" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", marginBottom: 9 }}>
              <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>💬</span><span>+62 819 1866 9241</span>
            </a>
            {SOCIAL.map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", marginBottom: 9 }}>
                <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{icon}</span><span>{label}</span>
              </a>
            ))}
            <Link href="/investors" style={{ display: "block", color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none", marginTop: 10 }}>
              {lang === "en" ? "Investors" : "Investor"}
            </Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 12 }}>
            © {new Date().getFullYear()} SahAIbat · {lang === "en" ? "IP owned by Viantra (11679210 Canada Inc) · All rights reserved" : "IP dimiliki oleh Viantra (11679210 Canada Inc) · Seluruh hak dilindungi"}
          </span>
          <span style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, textDecoration: "none" }}>{t("legal.privacy")}</Link>
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, textDecoration: "none" }}>{t("legal.terms")}</Link>
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 12 }}>
              {lang === "en" ? "Not a diagnostic tool" : "Bukan pengganti dokter"} · <a href="https://www.sahaibatdok.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(164,139,255,0.5)", textDecoration: "none" }}>sahaibatdok.com</a>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
