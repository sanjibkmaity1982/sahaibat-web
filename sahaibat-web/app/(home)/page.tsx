"use client";
import { useState, useEffect, useRef } from "react";

const C = {
  teal: "#02C39A", tealDk: "#017367", tealXdk: "#024D42",
  cream: "#F9F5EE", warm: "#EDE8DF", dark: "#0F1F1C", charcoal: "#1E2D2A",
  text: "#2D3B38", muted: "#6B8078", white: "#FFFFFF", gold: "#D4A843",
  pink: "#E91E8C", blue: "#3B82F6", purple: "#8B5CF6", orange: "#F97316",
};

const PHOTOS = {
  kaderField: "/images/hero-kader-family.png",
  motherChild: "/images/motherchild.png",
  posyandu: "/images/doctor-nurse.png",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0); const ref = useRef<HTMLSpanElement>(null); const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; const inc = end / 60; let cur = 0;
        const t = setInterval(() => {
          cur += inc; if (cur >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(cur));
        }, 33);
      }
    }, { threshold: 0.5 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>{children}</div>;
}

function Tag({ label, color }: { label: string; color: string }) {
  return <span style={{ background: `${color}12`, border: `1px solid ${color}30`, color, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{label}</span>;
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang }: { lang: "en" | "id"; setLang: (l: "en" | "id") => void }) {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links: [string, string][] = lang === "en"
    ? [["#story", "Our Story"], ["#products", "Products"], ["#compliance", "Compliance"], ["#impact", "Impact"], ["#partners", "Partners"], ["#team", "Team"]]
    : [["#story", "Cerita"], ["#products", "Produk"], ["#compliance", "Kepatuhan"], ["#impact", "Dampak"], ["#partners", "Mitra"], ["#team", "Tim"]];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(15,31,28,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(2,195,154,0.15)" : "none", transition: "all 0.3s", padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <img src="/images/art/logo-horizontal-white@2x.png" alt="SahAIbat" style={{ height: 36, width: "auto" }} />
        <div className="nav-desktop" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {links.map(([href, label]) => (<a key={href} href={href} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"}>{label}</a>))}
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 3 }}>
            {(["en", "id"] as const).map(l => (<button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? C.teal : "transparent", color: lang === l ? C.dark : "rgba(255,255,255,0.6)", border: "none", borderRadius: 16, padding: "4px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{l === "en" ? "EN" : "ID"}</button>))}
          </div>
          <a href="#support" style={{ background: C.teal, color: C.dark, padding: "8px 20px", borderRadius: 20, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{lang === "en" ? "Request a Pilot" : "Ajukan Pilot"}</a>
        </div>
        <button onClick={() => setOpen(!open)} className="nav-mobile-btn" style={{ background: "none", border: "none", color: C.white, fontSize: 24, cursor: "pointer" }}>{open ? "✕" : "☰"}</button>
      </div>
      {open && (<div style={{ background: C.dark, padding: "20px 24px", borderTop: "1px solid rgba(2,195,154,0.15)" }}>
        {links.map(([href, label]) => (<a key={href} href={href} onClick={() => setOpen(false)} style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{label}</a>))}
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          {(["en", "id"] as const).map(l => (<button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? C.teal : "rgba(255,255,255,0.08)", color: lang === l ? C.dark : "rgba(255,255,255,0.6)", border: "none", borderRadius: 16, padding: "6px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{l === "en" ? "English" : "Bahasa"}</button>))}
        </div>
      </div>)}
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [lang, setLang] = useState<"en" | "id">("en");

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${C.dark};font-family:'Plus Jakarta Sans',sans-serif;color:${C.text};overflow-x:hidden}
      ::selection{background:${C.teal};color:${C.dark}}
      .section-max{max-width:1200px;margin:0 auto;padding:0 24px}
      .display-font{font-family:'Playfair Display',serif}
      .teal-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;opacity:0.12}
      .nav-desktop{display:flex!important}.nav-mobile-btn{display:none!important}
      .hero-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:64px;align-items:center}
      .two-col{display:grid;grid-template-columns:1fr 1fr;gap:40px}
      .three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
      .four-col{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
      .ilp-card{width:300px;flex:0 0 auto}
      .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
      .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .social-link{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);text-decoration:none;font-size:13px;transition:color 0.2s;padding:6px 0}
      .social-link:hover{color:${C.teal}}
      @media(max-width:960px){
        .nav-desktop{display:none!important}.nav-mobile-btn{display:block!important}
        .hero-grid,.two-col,.invest-grid{grid-template-columns:1fr!important;gap:32px!important}
        .three-col{grid-template-columns:1fr!important;gap:20px!important}
        .ilp-card{width:100%!important}
        .four-col{grid-template-columns:repeat(2,1fr)!important}
        .footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
        .photo-grid{grid-template-columns:1fr 1fr!important}
      }
      @media(max-width:480px){.four-col{grid-template-columns:1fr!important}.section-max{padding:0 16px}.footer-grid{grid-template-columns:1fr!important}}
    `}</style>

    <Nav lang={lang} setLang={setLang}/>

    {/* ══ FLOATING INVESTOR BADGE (VC Hook) ═════════════════════════════════ */}
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99, background: "rgba(30,45,42,0.9)", border: `1px solid ${C.teal}`, backdropFilter: "blur(12px)", padding: "12px 18px", borderRadius: 16, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 18 }}>📊</span>
        <div>
          <div style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>Investor Deep-Dive</div>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 500 }}>80% Satusehat Ready</div>
        </div>
        <a href="#compliance" style={{ background: C.teal, color: C.dark, textDecoration: "none", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 8, marginLeft: 8 }}>View Traction</a>
      </div>
    </div>

    {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: `linear-gradient(160deg,${C.dark} 0%,${C.charcoal} 100%)` }}>
      <div className="teal-glow" style={{ width: 600, height: 600, background: C.teal, top: -200, right: -100 }} />
      <div className="section-max" style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 80, width: "100%" }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "inline-block" }} />
              <span style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>COMPLIANT ENTERPRISE HEALTH INFRASTRUCTURE</span>
            </div>
            <h1 className="display-font" style={{ fontSize: "clamp(38px, 4.5vw, 62px)", color: C.white, lineHeight: 1.15, marginBottom: 24, fontWeight: 800 }}>
              {lang === "en" ? "Bridging Rural Care via" : "Menjembatani Layanan Desa Melalui"}<br />
              <span style={{ color: C.teal }}>WhatsApp-First AI Triage.</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
              {lang === "en"
                ? "SahAIbat provides Indonesia's 1.4 million community health workers with a fully offline-capable triage ecosystem. No heavy app downloads. Zero operational friction. Sovereign data residency."
                : "SahAIbat membekali 1,4 juta kader kesehatan dengan ekosistem triase berkemampuan offline penuh. Tanpa unduh aplikasi berat. Bebas hambatan operasional."}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#products" style={{ background: C.teal, color: C.dark, padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 14px ${C.teal}30` }}>
                {lang === "en" ? "Explore the Stack" : "Jelajahi Produk"}
              </a>
              <a href="#compliance" style={{ border: "1.5px solid rgba(2,195,154,0.4)", color: C.white, padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                {lang === "en" ? "Regulatory Framework" : "Kerangka Regulasi"}
              </a>
            </div>
          </div>
          <div>
            <div style={{ background: "rgba(2,195,154,0.04)", border: "1px solid rgba(2,195,154,0.15)", borderRadius: 24, padding: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 12 }}>
                <div style={{ color: C.muted, textTransform: "uppercase", fontSize: 10, letterSpacing: 1, marginBottom: 12, textAlign: "center" }}>⚡ Live Simulated Triage System</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px 14px", borderRadius: 12, maxWidth: "85%", alignSelf: "flex-start", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p style={{ color: C.teal, fontSize: 10, fontWeight: 700, marginBottom: 2 }}>Kader (Field Worker)</p>
                    <p style={{ color: C.white }}>Anak umur 3 tahun, demam tinggi 39.8°C sudah 5 jam.</p>
                  </div>
                  <div style={{ background: "rgba(2,195,154,0.1)", padding: "10px 14px", borderRadius: 12, maxWidth: "85%", alignSelf: "flex-end", border: `1px solid ${C.teal}30` }}>
                    <p style={{ color: C.gold, fontSize: 10, fontWeight: 700, marginBottom: 2 }}>SahAIbat Core AI Engine</p>
                    <p style={{ color: C.white, fontSize: 11.5 }}>🟡 PANTAU KETAT<br />1. Kompres air hangat.<br />2. Cek kejang / kaku leher.<br />* Data Saved locally (Offline Sync ready)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ ONE-GLANCE INVESTOR THESIS BAND ═══════════════════════════════════ */}
    <InvestorBand lang={lang} />

    {/* ══ STORY ══════════════════════════════════════════════════════════════ */}
    <section id="story" style={{ background: C.cream, padding: "100px 0" }}>
      <div className="section-max">
        <div style={{ maxWidth: 800, margin: "0 auto 64px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.tealDk}15`, border: `1px solid ${C.tealDk}30`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
            <span style={{ color: C.tealDk, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>THE INFRATRUST SOLUTION</span>
          </div>
          <h2 className="display-font" style={{ fontSize: "clamp(32px, 3.8vw, 48px)", color: C.dark, lineHeight: 1.2, fontWeight: 800 }}>
            {lang === "en" ? "Where Connectivity Drops, Safety Shouldn't." : "Saat Sinyal Terputus, Layanan Tetap Jalan."}
          </h2>
        </div>
        <div className="two-col" style={{ alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 16, color: C.text, lineHeight: 1.8, marginBottom: 24 }}>
              {lang === "en"
                ? "Indonesia's community midwives and Kaders handle immense workloads across high-burden geographic corridors. Traditional legacy medical records are often heavily siloed, manual, or completely missing."
                : "Bidan dan Kader di lapangan menghadapi beban kerja yang tinggi di wilayah terpencil. Sistem rekam medis konvensional sering kali terfragmentasi atau hilang."}
            </p>
            <p style={{ fontSize: 16, color: C.text, lineHeight: 1.8, marginBottom: 24, fontWeight: 600 }}>
              {lang === "en"
                ? "SahAIbat acts as a modern architectural overlay, pulling unstructured communication interfaces down into automated, standardized compliance protocols."
                : "SahAIbat bertindak sebagai lapisan arsitektur modern yang merapikan komunikasi tidak terstruktur menjadi protokol kepatuhan yang baku."}
            </p>
          </div>
          <div style={{ background: C.dark, borderRadius: 24, padding: 36, color: C.white }}>
            <h4 style={{ color: C.teal, fontSize: 14, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>ECOSYSTEM ADVANTAGES</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <span style={{ fontWeight: 700, color: C.white, display: "block" }}>WhatsApp Layer Connectivity</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Enables adoption with zero client-side training.</span>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
              <div>
                <span style={{ fontWeight: 700, color: C.white, display: "block" }}>Local Data Sovereignty</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Fully processed within local parameters to meet UU PDP mandates.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ PRODUCTS (Interactive State-Driven Tabs) ═════════════════════════ */}
    <ProductsSection lang={lang} />

    {/* ══ DE-RISKING & TRUST (The Compliance Section) ═══════════════════════ */}
    <section id="compliance" style={{ background: C.charcoal, padding: "100px 0", borderTop: `1px solid ${C.teal}20` }}>
      <div className="section-max">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }} className="invest-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>INVESTOR PROTECTION</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "36px", color: C.white, lineHeight: 1.25, marginBottom: 20, fontWeight: 700 }}>
              Enterprise Grade & Compliant by Design
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7 }}>
              Building healthtech platforms inside emerging economies requires structural risk management. We prioritize legal sovereignty and strict system integration ahead of market rollouts.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="four-col">
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
              <h4 style={{ color: C.white, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>UU PDP Compliant</h4>
              <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>Enforces row-level identity masking and comprehensive NIK encryption matrices.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🇮🇩</div>
              <h4 style={{ color: C.white, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>AWS Jakarta Sovereign</h4>
              <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>Zero off-shore leakage risk. Runs natively within geographic data center boundaries.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📈</div>
              <h4 style={{ color: C.white, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>~80% Ready System</h4>
              <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>Technical integration layers map tightly to updated national medical standards.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💼</div>
              <h4 style={{ color: C.white, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Registered Operator</h4>
              <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>Formally documented and fully registered under PSE privatization guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ NATIONAL FRAMEWORK (ILP) ═══════════════════════════════════════════ */}
    <ILPSection lang={lang} />

    {/* ══ ECOSYSTEM STACK ════════════════════════════════════════════════════ */}
    <EcosystemSection lang={lang} />

    {/* ══ IN-DEVELOPMENT PRODUCTS (DoK + Sehat) ══════════════════════════════ */}
    <NextProductsSection lang={lang} />

    {/* ══ FLYWHEEL ═══════════════════════════════════════════════════════════ */}
    <FlywheelSection lang={lang} />

    {/* ══ VOICES FROM THE FIELD (video) ══════════════════════════════════════ */}
    <FieldVoicesSection lang={lang} />

    {/* ══ IMPACT ═════════════════════════════════════════════════════════════ */}
    <ImpactSection lang={lang} />

    {/* ══ FIELD PARTNERS ═════════════════════════════════════════════════════ */}
    <FieldPartnersSection lang={lang} />

    {/* ══ TEAM ════════════════════════════════════════════════════════════════ */}
    <TeamSection lang={lang} />

    {/* ══ PARTNER WITH US ════════════════════════════════════════════════════ */}
    <section id="support" style={{ background: C.dark, padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="teal-glow" style={{ width: 600, height: 600, background: C.teal, bottom: "-20%", right: "-10%" }} />
      <div className="section-max" style={{ position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ color: C.teal, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>PARTNER WITH US</span>
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(32px,4vw,52px)", color: C.white, lineHeight: 1.2, marginBottom: 16 }}>
              {lang === "en" ? <>Bring SahAIbat to<br /><span style={{color: C.teal}}>your community.</span></> : <>Bawa SahAIbat ke<br /><span style={{color: C.teal}}>komunitas Anda.</span></>}
            </h2>
          </div>
        </FadeIn>
        <div className="three-col" style={{ marginBottom: 48 }}>
          {[
            { icon: "🚀", title: lang === "en" ? "Run a pilot" : "Jalankan pilot", amount: lang === "en" ? "Pilot" : "Pilot", desc: lang === "en" ? "Deploy SahAIbat with a cohort of your Kaders across one or more districts. We handle setup, training, and clinical alignment." : "Terapkan SahAIbat dengan sekelompok Kader Anda di satu atau beberapa wilayah. Kami menangani penyiapan, pelatihan, dan penyelarasan klinis.", cta: lang === "en" ? "Request a Pilot" : "Ajukan Pilot", href: "mailto:admin@sahaibat.com?subject=Pilot Request", color: C.teal, featured: true },
            { icon: "🤝", title: lang === "en" ? "Partner with us" : "Bermitra", amount: lang === "en" ? "Partnership" : "Kemitraan", desc: lang === "en" ? "NGO, health programme, researcher, or government partner — let's talk about deploying SahAIbat at scale across your network." : "NGO, program kesehatan, peneliti, atau mitra pemerintah — mari bicara tentang penerapan SahAIbat dalam skala besar di jaringan Anda.", cta: lang === "en" ? "Start a Conversation" : "Mulai Percakapan", href: "mailto:admin@sahaibat.com?subject=Partnership Inquiry", color: C.pink, featured: false },
            { icon: "📊", title: lang === "en" ? "Fund a deployment" : "Danai penerapan", amount: lang === "en" ? "Sponsor" : "Sponsor", desc: lang === "en" ? "Funders and CSR partners can sponsor a full district rollout — infrastructure, training, and impact reporting included." : "Donatur dan mitra CSR dapat mensponsori penerapan satu wilayah penuh — infrastruktur, pelatihan, dan pelaporan dampak termasuk.", cta: lang === "en" ? "Talk to Us" : "Hubungi Kami", href: "mailto:admin@sahaibat.com?subject=Deployment Sponsorship", color: C.gold, featured: false },
          ].map(({ icon, title, amount, desc, cta, href, color, featured }) => (
            <FadeIn key={title} delay={100}>
              <div style={{ background: featured ? `linear-gradient(135deg,${C.tealXdk},${C.tealDk})` : "rgba(255,255,255,0.03)", border: `1.5px solid ${featured ? C.teal : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <div className="display-font" style={{ color, fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{amount}</div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{title}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, flex: 1 }}>{desc}</p>
                <a href={href} style={{ display: "block", marginTop: 24, textAlign: "center", padding: "12px 24px", borderRadius: 12, background: featured ? C.teal : "transparent", border: `1.5px solid ${featured ? C.teal : "rgba(255,255,255,0.2)"}`, color: featured ? C.dark : C.white, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>{cta} →</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
    <footer style={{ background: C.charcoal, borderTop: "1px solid rgba(2,195,154,0.1)", padding: "56px 0 32px" }}>
      <div className="section-max">
        <div className="footer-grid" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}><img src="/images/art/logo-horizontal-white@2x.png" alt="SahAIbat" style={{ height: 32, width: "auto", opacity: 0.85 }} /></div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>WhatsApp-first AI clinical triage for Community Health Workers in Indonesia. Built to strengthen frontline care.</p>
            <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, lineHeight: 1.7 }}>All IP owned by<br /><strong style={{ color: "rgba(255,255,255,0.3)" }}>Vinatra · 11679210 Canada Inc</strong><br />Terdaftar PSE Lingkup Privat Asing<br />NIB: 1202260248509</p>
          </div>
          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>PLATFORM</div>
            {([["#story", lang === "en" ? "Our Story" : "Cerita Kami"], ["#products", lang === "en" ? "Products" : "Produk"], ["#compliance", lang === "en" ? "Compliance" : "Kepatuhan"], ["#partners", lang === "en" ? "Field Partners" : "Mitra Lapangan"], ["#team", lang === "en" ? "Team" : "Tim"]] as [string, string][]).map(([href, label]) => (<a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", marginBottom: 9, transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"}>{label}</a>))}
          </div>
          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>CONNECT</div>
            {([["📧", "admin@sahaibat.com", "mailto:admin@sahaibat.com"], ["📸", "sahaibat_health", "https://instagram.com/sahaibat_health"], ["💼", "LinkedIn", "https://www.linkedin.com/company/110529968/"], ["💬", "+62 819 1866 9241", "https://wa.me/6281918669241"]] as [string, string, string][]).map(([icon, label, href]) => (<a key={label} href={href} target={href.startsWith("http") ? "_blank" : "_self"} className="social-link"><span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{icon}</span><span>{label}</span></a>))}
          </div>
          <div>
            <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>LEGAL</div>
            {([["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"], ["Contact", "/contact"]] as [string, string][]).map(([label, href]) => (<a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", marginBottom: 9 }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.teal} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"}>{label}</a>))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 SahAIbat · IP owned by Vinatra (11679210 Canada Inc) · All rights reserved</span>
        </div>
      </div>
    </footer>
  </>);
}

// ══════════════════════════════════════════════════════════════════════════════
function ProductsSection({ lang }: { lang: "en" | "id" }) {
  const [active, setActive] = useState(0);
  const tabs = [
    { id: 0, icon: "❤️‍🩹", label: "Kasih", sublabel: "Family Chat", accent: C.teal, headline: "Real-time Patient Risk Profiling", story: "Kasih runs directly within existing consumer chat protocols. By standardizing high-frequency triage fields without requiring structural software transformations, rural families navigate urgency layers systematically.", features: ["Warm Natural Interface", "Instant Structured Risk Grids", "Low Resource Execution Profiles"] },
    { id: 1, icon: "🩺", label: "Kader App", sublabel: "Life-Cycle Triage", accent: C.pink, headline: "Ecosystem-Wide Frontline Logging", story: "The Kader App processes comprehensive localized clinical indicators natively. Field worker workflows scale cleanly through single-surface tracking architecture.", features: ["Full Life-Cycle Tracking Blocks", "Automated Parameter Computation", "Reliable Local Array Cache"] }
  ];
  const p = tabs[active] || tabs[0];
  return (
    <section id="products" style={{ background: C.dark, padding: "100px 0" }}>
      <div className="section-max">
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{ padding: "12px 20px", borderRadius: 12, cursor: "pointer", background: active === t.id ? t.accent : "rgba(255,255,255,0.05)", color: active === t.id ? C.dark : C.white, border: "none", fontWeight: 700 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", padding: 32, borderRadius: 24, border: `1px solid ${p.accent}20` }}>
          <h3 className="display-font" style={{ color: C.white, fontSize: 28, marginBottom: 16 }}>{p.headline}</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24, maxWidth: 640 }}>{p.story}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.features.map(f => <Tag key={f} label={f} color={p.accent} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection({ lang }: { lang: "en" | "id" }) {
  return (
    <section id="impact" style={{ background: C.cream, padding: "100px 0" }}>
      <div className="section-max">
        <h2 className="display-font" style={{ fontSize: 36, color: C.dark, marginBottom: 32 }}>Proven Field Traction</h2>
        <div className="three-col">
          <div style={{ background: C.dark, padding: 32, borderRadius: 16, color: C.white }}>
            <div style={{ fontSize: 40, color: C.teal, fontWeight: 800 }}>90 Sec</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Average velocity from baseline incoming query to definitive care path triage recommendation.</p>
          </div>
          <div style={{ background: C.dark, padding: 32, borderRadius: 16, color: C.white }}>
            <div style={{ fontSize: 40, color: C.pink, fontWeight: 800 }}>61K+</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Target cohort reach across primary operating corridors in high-priority treatment networks.</p>
          </div>
          <div style={{ background: C.dark, padding: 32, borderRadius: 16, color: C.white }}>
            <div style={{ fontSize: 40, color: C.gold, fontWeight: 800 }}>100%</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Data isolation strategy utilizing regional instances to strictly guarantee sovereign privacy thresholds.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldPartnersSection({ lang }: { lang: "en" | "id" }) { return null; }
function TeamSection({ lang }: { lang: "en" | "id" }) { return null; }
function ILPSection({ lang }: { lang: "en" | "id" }) { return null; }
function EcosystemSection({ lang }: { lang: "en" | "id" }) { return null; }
function NextProductsSection({ lang }: { lang: "en" | "id" }) { return null; }
function FlywheelSection({ lang }: { lang: "en" | "id" }) { return null; }
function FieldVoicesSection({ lang }: { lang: "en" | "id" }) { return null; }

function InvestorBand({ lang }: { lang: "en" | "id" }) {
  return (
    <section style={{ background: `linear-gradient(135deg, ${C.tealXdk}, ${C.dark})`, padding: "48px 0", borderTop: "1px solid rgba(2,195,154,0.15)", borderBottom: "1px solid rgba(2,195,154,0.15)" }}>
      <div className="section-max">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center" }} className="invest-grid">
          <div>
            <h3 className="display-font" style={{ color: C.white, fontSize: 24, marginBottom: 8 }}>The Operational Flywheel</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              Frontline utilities scale naturally, capturing structured high-density data channels. Commercial product monetization loops recursively fund basic ecosystem infrastructure.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
            <div>
              <div style={{ color: C.teal, fontSize: 28, fontWeight: 800 }}>1.4M</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Addressable Field Network</div>
            </div>
            <div>
              <div style={{ color: C.teal, fontSize: 28, fontWeight: 800 }}>6 Surfaces</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Single Core System Engine</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
