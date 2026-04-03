"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  teal:    "#02C39A",
  tealDk:  "#017367",
  tealXdk: "#024D42",
  cream:   "#F9F5EE",
  warm:    "#EDE8DF",
  dark:    "#0F1F1C",
  charcoal:"#1E2D2A",
  text:    "#2D3B38",
  muted:   "#6B8078",
  white:   "#FFFFFF",
  red:     "#E84855",
  gold:    "#D4A843",
};

// ── Animated counter ───────────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Fade-in on scroll ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,31,28,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(2,195,154,0.15)" : "none",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #02C39A, #017367)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
          <span style={{ color: C.white, fontWeight: 800, fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SahAIbat</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {[["#story", "Our Story"], ["#impact", "Impact"], ["#platform", "Platform"], ["#team", "Team"], ["#support", "Support Us"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
            >{label}</a>
          ))}
          <a href="#support" style={{ background: C.teal, color: C.dark, padding: "8px 20px", borderRadius: 20, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Fuel the Mission
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: C.white, fontSize: 24, cursor: "pointer", display: "none" }} className="mobile-menu-btn">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: C.dark, padding: "20px 24px", borderTop: "1px solid rgba(2,195,154,0.15)" }}>
          {[["#story", "Our Story"], ["#impact", "Impact"], ["#platform", "Platform"], ["#team", "Team"], ["#support", "Support Us"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.dark}; font-family: 'Plus Jakarta Sans', sans-serif; color: ${C.text}; overflow-x: hidden; }
        ::selection { background: ${C.teal}; color: ${C.dark}; }

        .section-max { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .display-font { font-family: 'Playfair Display', serif; }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .teal-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.12;
        }
      `}</style>

      <div className="grain-overlay" />
      <Nav />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: `linear-gradient(160deg, ${C.dark} 0%, ${C.charcoal} 100%)` }}>
        <div className="teal-glow" style={{ width: 600, height: 600, background: C.teal, top: -200, right: -100 }} />
        <div className="teal-glow" style={{ width: 400, height: 400, background: "#017367", bottom: -100, left: -100 }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(2,195,154,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(2,195,154,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="section-max" style={{ position: "relative", zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">

            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "inline-block" }} />
                <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>BUILT IN INDONESIA. FOR INDONESIA.</span>
              </div>

              <h1 className="display-font" style={{ fontSize: "clamp(40px, 5vw, 68px)", color: C.white, lineHeight: 1.1, marginBottom: 24 }}>
                When a mother's<br />
                life depends on<br />
                <span style={{ color: C.teal }}>one message.</span>
              </h1>

              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
                SahAIbat gives Indonesia's 1.4 million community health workers the tool they need — a WhatsApp-first AI triage system that works without internet, without training, and without cost to the communities they serve.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#story" style={{ background: C.teal, color: C.dark, padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Read Our Story <span>↓</span>
                </a>
                <a href="#support" style={{ border: "1.5px solid rgba(2,195,154,0.4)", color: C.white, padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                  Fuel the Mission
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div style={{ position: "relative" }}>
              <div style={{ background: "rgba(2,195,154,0.06)", border: "1px solid rgba(2,195,154,0.2)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #02C39A, transparent)" }} />

                {/* WhatsApp chat simulation */}
                <div style={{ fontFamily: "monospace", fontSize: 13 }}>
                  <div style={{ color: C.muted, fontSize: 11, textAlign: "center", marginBottom: 16 }}>💬 SahAIbat WhatsApp Triage</div>

                  {[
                    { msg: "Sari, 28, P, hamil", kader: true, delay: 0 },
                    { msg: "🤰 Modul Ibu Hamil\n\nUsia kehamilan berapa minggu?", kader: false, delay: 200 },
                    { msg: "32", kader: true, delay: 400 },
                    { msg: "Apakah ada sakit kepala berat?\n1=Ya  2=Tidak", kader: false, delay: 600 },
                    { msg: "1", kader: true, delay: 800 },
                    { msg: "🔴 DARURAT — Rujuk ke Puskesmas SEGERA\n\nTanda preeklampsia terdeteksi.\nDampingi ibu sekarang.", kader: false, delay: 1000, urgent: true },
                  ].map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.kader ? "flex-end" : "flex-start", marginBottom: 10, animationDelay: `${m.delay}ms` }}>
                      <div style={{
                        background: m.urgent ? "rgba(232,72,85,0.15)" : m.kader ? "rgba(2,195,154,0.15)" : "rgba(255,255,255,0.06)",
                        border: m.urgent ? "1px solid rgba(232,72,85,0.3)" : m.kader ? "1px solid rgba(2,195,154,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12, padding: "8px 12px", maxWidth: "80%",
                        color: m.urgent ? "#FF6B6B" : m.kader ? C.teal : "rgba(255,255,255,0.8)",
                        fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-line",
                      }}>
                        {m.msg}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: C.muted, fontSize: 11 }}>✓ Data saved locally · Syncs when signal returns</span>
                  <span style={{ color: C.teal, fontSize: 11 }}>📵 Works offline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { n: 61000, s: "+", label: "Community Health Workers", sub: "in our target network" },
              { n: 4, s: " modules", label: "Clinical Modules", sub: "maternal · child · neonatal · posyandu" },
              { n: 0, s: "", label: "Cost to Communities", sub: "always free for underserved areas" },
              { n: 100, s: "%", label: "Data Stays in Indonesia", sub: "AWS Jakarta · AES-256 encrypted" },
            ].map(({ n, s, label, sub }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="display-font" style={{ fontSize: 36, color: C.teal, fontWeight: 900, lineHeight: 1 }}>
                  {n === 0 ? "Rp 0" : <Counter end={n} suffix={s} />}
                </div>
                <div style={{ color: C.white, fontSize: 13, fontWeight: 600, marginTop: 8 }}>{label}</div>
                <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`.hero-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ══ STORY ═════════════════════════════════════════════════════════════ */}
      <section id="story" style={{ background: C.cream, padding: "100px 0" }}>
        <div className="section-max">

          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.tealDk}20`, border: `1px solid ${C.tealDk}40`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.tealDk, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>OUR STORY</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: C.dark, lineHeight: 1.2, marginBottom: 24, maxWidth: 700 }}>
              A Kader. A phone. A life that shouldn't have been lost.
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 48 }} className="two-col">
            <FadeIn delay={100}>
              <div style={{ fontSize: 16, color: C.text, lineHeight: 1.9 }}>
                <p style={{ marginBottom: 20 }}>
                  In the villages of East Nusa Tenggara — one of Indonesia's most remote provinces — a community health worker called a <strong>Kader</strong> visits families on foot. She carries a KMS book, a pen, and a weighing scale. She knows the families. She knows the children. But when a pregnant mother shows signs of preeclampsia, she has no way to know what to do — and no doctor within hours.
                </p>
                <p style={{ marginBottom: 20 }}>
                  Indonesia has <strong>1.4 million Kaders</strong>. They are the backbone of community healthcare. But they've been working with 1970s tools in a 2024 world.
                </p>
                <p>
                  <strong>SahAIbat was built for her.</strong>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div style={{ background: C.dark, borderRadius: 20, padding: 32, color: C.white }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, lineHeight: 1.4, marginBottom: 16, color: C.white }}>
                  "SahAIbat" means <em style={{ color: C.teal }}>companion</em> in Bahasa Indonesia.
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7 }}>
                  We chose this name intentionally. Not a diagnostic engine. Not a replacement for doctors. A companion — something that walks alongside the Kader, giving her confidence when she needs it most.
                </p>
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 24 }}>
                  <div>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 20 }}>WhatsApp-first</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>no app download needed</div>
                  </div>
                  <div>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 20 }}>Offline-capable</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>works without signal</div>
                  </div>
                  <div>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 20 }}>Free forever</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>for communities</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Why free */}
          <FadeIn delay={200}>
            <div style={{ marginTop: 64, background: `linear-gradient(135deg, ${C.tealXdk}, ${C.tealDk})`, borderRadius: 24, padding: 48, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="two-col">
                <div>
                  <h3 className="display-font" style={{ fontSize: 32, color: C.white, marginBottom: 16 }}>Why is SahAIbat free?</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 15 }}>
                    Because the communities who need it most are the ones who can least afford to pay. SahAIbat is free to every Kader, every NGO, every rural health program. Our mission is impact — not revenue. The platform is sustained through partnerships, grants, and the generosity of people who believe healthcare equity is not optional.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { icon: "🏥", title: "Puskesmas-aligned", desc: "Follows Indonesian MoH clinical standards" },
                    { icon: "📱", title: "No smartphone needed", desc: "Works on any WhatsApp-capable phone" },
                    { icon: "🔒", title: "Data stays in Indonesia", desc: "Hosted in Jakarta, not offshore" },
                    { icon: "🤝", title: "NGO-owned data", desc: "Your data, your community, your control" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                      <div style={{ color: C.white, fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{title}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ IMPACT ════════════════════════════════════════════════════════════ */}
      <section id="impact" style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="teal-glow" style={{ width: 500, height: 500, background: C.teal, top: "20%", left: "-10%" }} />

        <div className="section-max" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>IMPACT ON THE GROUND</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: C.white, lineHeight: 1.2, marginBottom: 16, maxWidth: 600 }}>
              The numbers tell part of the story.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 500, lineHeight: 1.7, marginBottom: 64 }}>
              The rest is told by the Kaders, the mothers, and the children in villages across East Nusa Tenggara and Bali.
            </p>
          </FadeIn>

          {/* Focus areas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }} className="three-col">
            {[
              {
                icon: "🤱",
                color: "#E91E8C",
                title: "Maternal Health",
                stat: "4 danger signs",
                desc: "preeclampsia, hemorrhage, fetal distress, infection — detected in under 3 minutes",
                detail: "Maternal mortality in NTT is 3x the national average. SahAIbat gives every Kader the ability to detect the top 4 killers of pregnant women before it's too late.",
              },
              {
                icon: "👶",
                color: C.teal,
                title: "Child Stunting",
                stat: "WHO 2006 standard",
                desc: "WAZ · LAZ · WFH classification — all 4 indicators in every Posyandu visit",
                detail: "1 in 5 Indonesian children is stunted. SahAIbat calculates all WHO growth indicators automatically — no chart-reading, no calculation errors, no missed cases.",
              },
              {
                icon: "🍼",
                color: C.gold,
                title: "Neonatal Care",
                stat: "0–28 days",
                desc: "danger sign detection for newborns — the most critical window of life",
                detail: "Most neonatal deaths happen in the first 7 days. SahAIbat screens every newborn for the 9 KMS danger signs — seizure, hypothermia, not feeding, and more.",
              },
            ].map(({ icon, color, title, stat, desc, detail }) => (
              <FadeIn key={title} delay={100}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, height: "100%", transition: "border-color 0.2s", cursor: "default" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${color}60`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <div style={{ color, fontWeight: 700, fontSize: 13, letterSpacing: 0.5, marginBottom: 8 }}>{title}</div>
                  <div className="display-font" style={{ color: C.white, fontSize: 22, marginBottom: 8 }}>{stat}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{desc}</div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>{detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* NTT pilot callout */}
          <FadeIn>
            <div style={{ background: "rgba(2,195,154,0.06)", border: "1px solid rgba(2,195,154,0.2)", borderRadius: 20, padding: 40, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "center" }} className="two-col">
              <div>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>FIELD PARTNER · NTT PROVINCE</div>
                <h3 className="display-font" style={{ color: C.white, fontSize: 28, marginBottom: 16 }}>Yayasan Pijar Timur, Kefamenanu</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 15 }}>
                  Our ground partner in East Nusa Tenggara — one of Indonesia's highest-burden provinces for stunting, maternal mortality, and neonatal deaths. Through Yayasan Pijar Timur, SahAIbat reaches the communities where the need is greatest and the tools are fewest.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 24 }}>
                  <div><div style={{ color: C.teal, fontWeight: 700, fontSize: 18 }}>NTT</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>East Nusa Tenggara</div></div>
                  <div><div style={{ color: C.teal, fontWeight: 700, fontSize: 18 }}>22</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>target districts</div></div>
                  <div><div style={{ color: C.teal, fontWeight: 700, fontSize: 18 }}>Rural</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>no internet zones</div></div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 80 }}>🗺️</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 8 }}>Field visit planned · April 2026</div>
              </div>
            </div>
          </FadeIn>

          {/* 1000 Days Fund */}
          <FadeIn delay={100}>
            <div style={{ marginTop: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ fontSize: 48 }}>🤝</div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 8 }}>PILOT PARTNER · BALI</div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>1000 Days Fund</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>
                  Partnering with 1000 Days Fund — Indonesia's leading 1000 Hari Pertama Kehidupan programme with 61,000+ CHWs and 1M+ children screened. SahAIbat complements their Smart Chart and Kader Academy programmes across 22 NTT districts.
                </p>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ background: "rgba(2,195,154,0.1)", borderRadius: 8, padding: "8px 16px", color: C.teal, fontSize: 13, fontWeight: 600 }}>61K+ CHWs in network</div>
                <div style={{ background: "rgba(2,195,154,0.1)", borderRadius: 8, padding: "8px 16px", color: C.teal, fontSize: 13, fontWeight: 600 }}>19% stunting reduction in NTT</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ BUKU KIA / KMS ════════════════════════════════════════════════════ */}
      <section style={{ background: C.white, padding: "80px 0", borderTop: `3px solid ${C.teal}` }}>
        <div className="section-max">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col">

            {/* Pink book visual */}
            <FadeIn>
              <div style={{ background: `linear-gradient(135deg, #E91E8C, #C2185B)`, borderRadius: 24, padding: 48, textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 80, marginBottom: 16 }}>📗</div>
                  <div style={{ color: C.white, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Buku KIA</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 16 }}>Kesehatan Ibu dan Anak</div>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: 16 }}>
                    <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.7 }}>
                      Permenkes No. 2/2020<br />
                      KMS (Kartu Menuju Sehat)<br />
                      WHO Child Growth Standards 2006<br />
                      Standar tumbuh kembang nasional
                    </div>
                  </div>
                  <div style={{ marginTop: 16, display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px", color: C.white, fontSize: 12, fontWeight: 600 }}>
                    ✓ Every SahAIbat module validated against this
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(233,30,140,0.08)", border: "1px solid rgba(233,30,140,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
                  <span style={{ color: "#E91E8C", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>BUILT ON THE PINK BOOK</span>
                </div>
                <h2 className="display-font" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: C.dark, lineHeight: 1.2, marginBottom: 20 }}>
                  Every question SahAIbat asks comes from <em style={{ color: "#E91E8C" }}>Buku KIA</em>.
                </h2>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                  The <strong style={{ color: C.dark }}>Buku Kesehatan Ibu dan Anak (Buku KIA)</strong> — Indonesia's pink maternal and child health handbook — is the clinical bible for every Posyandu in the country. Every Kader knows it. Every Puskesmas uses it. Every mother carries it.
                </p>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                  SahAIbat does not invent new clinical standards. Every danger sign question, every risk threshold, every referral recommendation in SahAIbat maps directly to <strong style={{ color: C.dark }}>Permenkes No. 2/2020</strong> and <strong style={{ color: C.dark }}>WHO Child Growth Standards 2006</strong> — the same standards in the pink book the Kader already holds.
                </p>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.9 }}>
                  We digitise the knowledge that already exists. We don't replace the book — we help the Kader use it faster, more consistently, and without missing a single danger sign.
                </p>
                <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["KMS Permenkes 2/2020", "WHO 2006 Growth Standards", "SDIDTK milestones", "Standar Nasional"].map(tag => (
                    <span key={tag} style={{ background: "rgba(233,30,140,0.06)", border: "1px solid rgba(233,30,140,0.15)", color: "#C2185B", fontSize: 12, padding: "5px 12px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ NOT A REPLACEMENT ═════════════════════════════════════════════════ */}
      <section style={{ background: C.cream, padding: "80px 0" }}>
        <div className="section-max">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.tealDk}15`, border: `1px solid ${C.tealDk}30`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
                <span style={{ color: C.tealDk, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>OUR PHILOSOPHY</span>
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: C.dark, lineHeight: 1.2, marginBottom: 16, maxWidth: 700, margin: "0 auto 16px" }}>
                We are not here to replace anything.<br />We are here to <em style={{ color: C.teal }}>strengthen everything</em>.
              </h2>
              <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
                Indonesia's community health system — Posyandu, Puskesmas, Kader, Buku KIA — is not broken. It is underpowered. SahAIbat is a turbocharger, not a replacement engine.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">

            <FadeIn delay={100}>
              <div style={{ background: C.white, borderRadius: 20, padding: 32, border: "1px solid rgba(2,195,154,0.15)" }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 20 }}>✅ WHAT SAHAIBAT WORKS WITH</div>
                {[
                  ["📗 Buku KIA", "SahAIbat uses the same danger signs, same thresholds, same referral logic as the pink book. Kaders don't learn something new — they do what they already know, faster."],
                  ["🏥 Puskesmas system", "Every RUJUK recommendation in SahAIbat points to the same Puskesmas the Kader already refers to. We support the referral chain, not bypass it."],
                  ["📱 WhatsApp", "Kaders already use WhatsApp every day. SahAIbat lives inside the app they already have — no new app, no new login, no training on a new tool."],
                  ["👩‍⚕️ Kader judgment", "SahAIbat provides structured guidance. The Kader still makes the call. Her relationship with the family, her eyes on the patient — irreplaceable."],
                ].map(([title, desc]) => (
                  <div key={String(title)} style={{ display: "flex", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{String(title).split(" ")[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 6 }}>{String(title).slice(3)}</div>
                      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Not a new app */}
                <div style={{ background: C.dark, borderRadius: 20, padding: 28, flex: 1 }}>
                  <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>NOT ANOTHER APP</div>
                  <h3 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Kaders don't need to learn something new.</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8 }}>
                    We've seen too many well-intentioned digital health tools fail because they required Kaders to download an app, attend a training, and abandon their existing workflow. SahAIbat works inside WhatsApp — the app already on every Kader's phone. First use to first triage: under 5 minutes.
                  </p>
                </div>

                {/* Government alignment */}
                <div style={{ background: `linear-gradient(135deg, ${C.tealXdk}, ${C.tealDk})`, borderRadius: 20, padding: 28 }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>GOVERNMENT-ALIGNED BY DESIGN</div>
                  <h3 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Built to earn trust, not bypass it.</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>
                    SahAIbat is designed to be the kind of tool the Ministry of Health could endorse — because it follows their standards, respects their systems, and strengthens their Kaders. Our path to scale runs through government trust, not around it.
                  </p>
                  <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Kemenkes-aligned", "UU PDP compliant", "Permenkes 2/2020", "Data in Indonesia"].map(tag => (
                      <span key={tag} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ LEAN ARCHITECTURE ═════════════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: "80px 0", borderBottom: `1px solid rgba(2,195,154,0.1)` }}>
        <div className="section-max">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col">

            <FadeIn>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
                  <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>WHY WE'RE DIFFERENT FROM STARTUPS</span>
                </div>
                <h2 className="display-font" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: C.white, lineHeight: 1.2, marginBottom: 20 }}>
                  Built lean.<br />Built to <span style={{ color: C.teal }}>last without a VC cheque</span>.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                  Most digital health startups are built to raise the next funding round. That means expensive cloud bills, large engineering teams, and a product that stops working the moment the runway ends.
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                  <strong style={{ color: C.white }}>SahAIbat is built differently.</strong> Our architecture is deliberately lean — modern infrastructure running at a fraction of the cost of a typical health-tech platform. At 10,000 Kaders, our total monthly infrastructure bill is under <strong style={{ color: C.teal }}>$260</strong>. Not because we cut corners on safety. Because we cut corners on everything else.
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.9 }}>
                  Posyandu growth triage runs entirely on deterministic WHO math — <strong style={{ color: C.white }}>zero AI API calls, zero per-query cost</strong>. AI is used only where it adds genuine value. Everything else is hardcoded clinical logic. The result: a system that can serve millions of Kaders sustainably, on a nonprofit budget.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div style={{ display: "grid", gap: 16 }}>
                {[
                  { icon: "⚡", title: "Zero-cost triage core", desc: "WHO growth calculations are pure math — no API, no cost per query, no latency. Runs offline on the Kader's phone.", color: C.teal },
                  { icon: "🗄️", title: "Jakarta-hosted, GDPR-grade", desc: "AWS ap-southeast-3 Jakarta. AES-256 at rest. TLS in transit. Row-level security. Production-grade without enterprise pricing.", color: C.teal },
                  { icon: "📱", title: "WhatsApp = zero distribution cost", desc: "We don't pay for app store fees, download campaigns, or device requirements. The Kader's WhatsApp is our distribution channel.", color: C.gold },
                  { icon: "🔋", title: "Sustainable without a funder", desc: "Vinatra's consulting revenues cover SahAIbat infrastructure independently. No grant cycle dependency. No shutdown risk.", color: C.gold },
                  { icon: "🌐", title: "Open architecture, closed data", desc: "Built on Next.js, Supabase, Twilio — open standards. Data is closed, sovereign, and owned by the NGO.", color: "#E91E8C" },
                ].map(({ icon, title, desc, color }) => (
                  <div key={title} style={{ display: "flex", gap: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ color, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}

                {/* Cost callout */}
                <div style={{ background: "rgba(2,195,154,0.08)", border: "1px solid rgba(2,195,154,0.2)", borderRadius: 14, padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                  <div className="display-font" style={{ fontSize: 36, color: C.teal, fontWeight: 900, flexShrink: 0 }}>$260</div>
                  <div>
                    <div style={{ color: C.teal, fontWeight: 700, fontSize: 13 }}>Total monthly cost at 10,000 Kaders</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>Server + WhatsApp API + reminders. That's $0.026 per Kader per month.</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ AI WITH GUARDRAILS ════════════════════════════════════════════════ */}
      <section id="platform" style={{ background: C.warm, padding: "100px 0" }}>
        <div className="section-max">
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.tealDk}15`, border: `1px solid ${C.tealDk}30`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.tealDk, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>OUR APPROACH TO AI</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: C.dark, lineHeight: 1.2, marginBottom: 16, maxWidth: 700 }}>
              AI with guardrails.<br />Not AI instead of humans.
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 560, lineHeight: 1.8, marginBottom: 64 }}>
              We are an AI-powered company. But we don't let AI make clinical decisions. Here's what we actually do — and why it matters.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }} className="two-col">
            {/* What AI does */}
            <FadeIn delay={100}>
              <div style={{ background: C.white, borderRadius: 20, padding: 32, border: `1px solid rgba(2,195,154,0.15)` }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>✅ WHAT AI DOES IN SAHAIBAT</div>
                {[
                  ["Natural language understanding", "Kader types freely — AI understands messy, informal Bahasa Indonesia"],
                  ["Smart routing", "Complaint text is analysed to route to the right clinical module"],
                  ["Contextual guidance", "After human rules run, AI adds warm, practical guidance for the Kader"],
                  ["Report generation", "Structured clinical summaries for nurse/doctor review"],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.dark, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* What AI doesn't do */}
            <FadeIn delay={200}>
              <div style={{ background: C.dark, borderRadius: 20, padding: 32 }}>
                <div style={{ color: "#FF6B6B", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>🚫 WHAT AI NEVER DOES IN SAHAIBAT</div>
                {[
                  ["Diagnose", "AI never outputs a diagnosis — ever. The rules engine classifies risk."],
                  ["Prescribe", "No drug names, no dosages, no treatment plans — only triage guidance"],
                  ["Override WHO/KMS standards", "Clinical thresholds come from WHO 2006 and KMS Permenkes 2/2020 — not from model weights"],
                  ["Make final decisions", "Every output is framed as guidance — the Kader, nurse, or doctor decides"],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B6B", marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.white, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Rules engine callout */}
          <FadeIn>
            <div style={{ background: C.dark, borderRadius: 20, padding: 40, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ fontSize: 56 }}>⚖️</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 8 }}>THE RULES ENGINE IS THE SOURCE OF TRUTH</div>
                <h3 style={{ color: C.white, fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Deterministic logic. Not probabilistic guessing.</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: 14, maxWidth: 600 }}>
                  SahAIbat's triage outcomes are calculated by a deterministic rules engine — not by a language model. The WHO growth standards, KMS danger sign thresholds, and clinical referral rules are hardcoded. AI only adds context after the rules run. This is how we ensure safety at scale.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════════════════════ */}
      <section id="team" style={{ background: C.cream, padding: "100px 0" }}>
        <div className="section-max">
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.tealDk}15`, border: `1px solid ${C.tealDk}30`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.tealDk, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>THE TEAM</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: C.dark, lineHeight: 1.2, marginBottom: 16 }}>
              People who refused to accept the status quo.
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, lineHeight: 1.8, marginBottom: 64 }}>
              A small team with a clear mission — build the tool that Kaders deserve, and do it right.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 24 }} className="two-col">

            {/* Sanjib */}
            <FadeIn delay={0}>
              <div style={{ background: C.dark, borderRadius: 24, padding: 36, color: C.white, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.teal}, transparent)` }} />
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 16, background: "linear-gradient(135deg, #02C39A22, #02C39A44)", border: "1px solid rgba(2,195,154,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    👨‍💻
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Sanjib Maity</div>
                    <div style={{ color: C.teal, fontWeight: 600, fontSize: 13 }}>Founder · SahAIbat / Vinatra</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>Canada 🇨🇦 · Building from wherever the mission needs</div>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>
                  Graduate of Manipal Institute of Technology with over a decade of experience in enterprise automation and AI systems. Sanjib left a comfortable tech career to solve a problem that kept him awake — why do the communities with the highest disease burden have the least digital support? SahAIbat is his answer.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["AI Systems", "10+ years automation", "Healthcare equity", "Founder"].map(tag => (
                    <span key={tag} style={{ background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.2)", color: C.teal, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Dr. Ratih */}
            <FadeIn delay={100}>
              <div style={{ background: C.white, borderRadius: 24, padding: 36, border: "1px solid rgba(2,195,154,0.15)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, #E91E8C, transparent)` }} />
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 16, background: "rgba(233,30,140,0.08)", border: "1px solid rgba(233,30,140,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    👩‍⚕️
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: C.dark, marginBottom: 4 }}>Dr. Ratih Rakhmawati</div>
                    <div style={{ color: "#E91E8C", fontWeight: 600, fontSize: 13 }}>Clinical Validator · SpA (Pediatric Specialist)</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Indonesia 🇮🇩 · Clinical Guardian of SahAIbat</div>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8 }}>
                  Pediatric specialist and SahAIbat's clinical guardian. Dr. Ratih validates every clinical module against WHO 2006 standards and KMS Permenkes 2/2020 before it reaches a single Kader. She is the reason SahAIbat can be trusted with the health of mothers and children.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Pediatrics", "WHO Standards", "KMS Validation", "Clinical Safety"].map(tag => (
                    <span key={tag} style={{ background: "rgba(233,30,140,0.06)", border: "1px solid rgba(233,30,140,0.15)", color: "#E91E8C", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="two-col">

            {/* Stefanus Bere */}
            <FadeIn delay={200}>
              <div style={{ background: C.white, borderRadius: 24, padding: 36, border: "1px solid rgba(212,168,67,0.2)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 16, background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    🏥
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: C.dark, marginBottom: 4 }}>Stefanus Bere</div>
                    <div style={{ color: C.gold, fontWeight: 600, fontSize: 13 }}>Programme Director · Rural Health Systems</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>East Nusa Tenggara 🇮🇩 · NTT & Jakarta</div>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8 }}>
                  Over two decades leading health system strengthening programs across NTT, Papua, and Jakarta. Former USAID MOMENTUM Senior Program Manager, UNODC National Program Officer, and ADB M&E Consultant. Stefanus brings the ground truth that no dataset can replace — he has sat with Kaders, district health offices, and village mothers alike.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["USAID", "ADB", "NTT Expert", "Maternal & Child Health"].map(tag => (
                    <span key={tag} style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.2)", color: C.gold, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Risti Riana */}
            <FadeIn delay={300}>
              <div style={{ background: C.white, borderRadius: 24, padding: 36, border: "1px solid rgba(2,195,154,0.15)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.teal}, transparent)` }} />
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 16, background: "rgba(2,195,154,0.08)", border: "1px solid rgba(2,195,154,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    🌺
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: C.dark, marginBottom: 4 }}>Risti Riana</div>
                    <div style={{ color: C.teal, fontWeight: 600, fontSize: 13 }}>Community Support & Kader Liaison</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Indonesia 🇮🇩 · Voice of the Kader community</div>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8 }}>
                  Risti is SahAIbat's connection to the Kader community. As a Kader herself, she tests every feature from the perspective of the people who matter most — the frontline health workers in rural Posyandu sessions. Her feedback has shaped how SahAIbat speaks, asks questions, and responds.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Kader Community", "Field Testing", "User Research", "Posyandu"].map(tag => (
                    <span key={tag} style={{ background: "rgba(2,195,154,0.06)", border: "1px solid rgba(2,195,154,0.15)", color: C.teal, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ SUPPORT ═══════════════════════════════════════════════════════════ */}
      <section id="support" style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div className="teal-glow" style={{ width: 600, height: 600, background: C.teal, bottom: "-20%", right: "-10%" }} />

        <div className="section-max" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
                <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>FUEL THE MISSION</span>
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: C.white, lineHeight: 1.2, marginBottom: 16 }}>
                We don't ask for donations.<br />
                <span style={{ color: C.teal }}>We ask for belief.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 560, lineHeight: 1.8, margin: "0 auto" }}>
                SahAIbat is free for every community it serves. The only way to keep it that way is through people who believe that healthcare equity is worth fighting for. If you're one of them — here's how you can help.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }} className="three-col">
            {[
              {
                icon: "☕",
                title: "Buy the team a coffee",
                amount: "$5",
                desc: "Keeps the server running for a day. Covers one Kader's WhatsApp session costs for a week.",
                cta: "Support on Ko-fi",
                href: "https://ko-fi.com/sahaibat",
                color: C.teal,
              },
              {
                icon: "🌱",
                title: "Sponsor a Posyandu session",
                amount: "$25",
                desc: "Funds AI triage support for an entire Posyandu session — 20+ children, mothers, and newborns screened.",
                cta: "Sponsor a Session",
                href: "mailto:privacy@sahaibat.com?subject=Sponsor a Posyandu Session",
                color: C.gold,
                featured: true,
              },
              {
                icon: "🤝",
                title: "Partner with us",
                amount: "Let's talk",
                desc: "NGO, researcher, funder, or government partner — we want to hear from you. Every partnership expands our reach.",
                cta: "Get in Touch",
                href: "mailto:privacy@sahaibat.com?subject=Partnership Inquiry",
                color: "#E91E8C",
              },
            ].map(({ icon, title, amount, desc, cta, href, color, featured }) => (
              <FadeIn key={title} delay={100}>
                <div style={{
                  background: featured ? `linear-gradient(135deg, ${C.tealXdk}, ${C.tealDk})` : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${featured ? C.teal : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", height: "100%",
                  transform: featured ? "scale(1.03)" : "scale(1)",
                }}>
                  {featured && <div style={{ color: C.teal, fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>⭐ MOST IMPACTFUL</div>}
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                  <div className="display-font" style={{ color, fontSize: 28, fontWeight: 900, marginBottom: 8 }}>{amount}</div>
                  <div style={{ color: C.white, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{title}</div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, flex: 1 }}>{desc}</p>
                  <a href={href} style={{
                    display: "block", marginTop: 24, textAlign: "center", padding: "12px 24px", borderRadius: 12,
                    background: featured ? C.teal : "transparent",
                    border: `1.5px solid ${featured ? C.teal : "rgba(255,255,255,0.2)"}`,
                    color: featured ? C.dark : C.white, fontWeight: 700, fontSize: 14, textDecoration: "none",
                    transition: "all 0.2s",
                  }}>{cta} →</a>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Transparency pledge */}
          <FadeIn>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ fontSize: 40 }}>🔍</div>
              <div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Full transparency. Always.</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, maxWidth: 600 }}>
                  We are not an NGO, so we don't have a legal donation mandate. But we believe radical transparency is the foundation of trust. Every dollar of support received will be publicly recorded and attributed — server costs, team stipends, field visits, clinical validation. We'll publish it here on this website. You'll always know where your support goes.
                </p>
                <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Server infrastructure", "Kader training materials", "Field visits to NTT", "Clinical validation", "Product development"].map(item => (
                    <span key={item} style={{ background: "rgba(2,195,154,0.08)", border: "1px solid rgba(2,195,154,0.15)", color: C.teal, fontSize: 12, padding: "4px 12px", borderRadius: 20 }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer style={{ background: C.charcoal, borderTop: "1px solid rgba(2,195,154,0.1)", padding: "48px 0 32px" }}>
        <div className="section-max">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #02C39A, #017367)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
                <span style={{ color: C.white, fontWeight: 800, fontSize: 18 }}>SahAIbat</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>
                WhatsApp-first AI clinical triage for Community Health Workers in Indonesia. Free for communities. Always.
              </p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 16 }}>
                A product of Vinatra · 11679210 Canada Inc<br />
                Terdaftar PSE Lingkup Privat Asing – NIB: 1202260248509
              </p>
            </div>
            <div>
              <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>PLATFORM</div>
              {[["How it works", "#story"], ["Clinical modules", "#platform"], ["For NGOs", "#support"], ["Privacy policy", "/privacy"]].map(([label, href]) => (
                <a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
                >{label}</a>
              ))}
            </div>
            <div>
              <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>CONNECT</div>
              {[["Email us", "mailto:privacy@sahaibat.com"], ["Instagram", "https://instagram.com/sahaibat"], ["LinkedIn", "#"], ["Ko-fi", "https://ko-fi.com/sahaibat"]].map(([label, href]) => (
                <a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
                >{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 SahAIbat Health · Vinatra · All rights reserved</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Not a diagnostic tool · Bukan pengganti dokter</span>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .two-col { grid-template-columns: 1fr !important; }
            .three-col { grid-template-columns: 1fr !important; }
            .footer-grid { grid-template-columns: 1fr !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </>
  );
}
