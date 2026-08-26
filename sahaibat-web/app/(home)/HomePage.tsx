"use client";

// app/(home)/HomePage.tsx
//
// Corporate rewrite. The argument lives in ./copy.ts — this file only renders it.
//
// The page it replaces opened with "Healthcare closer than ever" and carried a
// section headed "Free — and built as a partner, not a vendor", while
// /investors and /enterprise had already moved to commercial language. An
// investor landing on the root read charity and left before reaching either.
//
// The order below IS the argument, and each section only exists to earn the
// next one: a window is open (WHY) → here is what is broken inside it
// (PROBLEM) → here is what we built (PLATFORM) → here is how it makes money
// Five sections, deliberately: WHO WE ARE and WHAT WE BUILD (hero) → the
// connected platform nobody else has (PLATFORM) → the engineering underneath
// it, which is the actual moat (ENGINE) → it is live, built by these people,
// under these rules (PROOF) → talk to us (CLOSE).
//
// WhyNow, Problem, Model and Moat are still written in copy.ts and still
// render as components — they are simply not on the homepage. Why-now lives
// in the hero sub, the problem is the Platform headline, and the economics
// belong on /investors where someone has already chosen to read them.

import React, { useEffect } from "react";
import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { FadeIn } from "@/components/sahaibat/ui";
import { C } from "@/lib/sahaibat/theme";
import { COPY, FACTS, type Lang } from "./copy";

/* ── small shared pieces ─────────────────────────────────────────────────── */

function Kicker({ children, on = "light" }: { children: React.ReactNode; on?: "light" | "dark" }) {
  const col = on === "dark" ? C.teal : C.tealDk;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: `${col}${on === "dark" ? "1A" : "14"}`, border: `1px solid ${col}40`,
      borderRadius: 20, padding: "6px 16px", marginBottom: 18,
    }}>
      <span style={{ color: col, fontSize: 11, fontWeight: 700, letterSpacing: 1.4 }}>{children}</span>
    </div>
  );
}

function H2({ children, on = "light" }: { children: React.ReactNode; on?: "light" | "dark" }) {
  return (
    <h2 className="display-font" style={{
      fontSize: "clamp(29px,3.9vw,50px)", lineHeight: 1.18, marginBottom: 18, maxWidth: 860,
      color: on === "dark" ? C.white : C.dark, letterSpacing: "-0.01em",
    }}>{children}</h2>
  );
}

function Lead({ children, on = "light" }: { children: React.ReactNode; on?: "light" | "dark" }) {
  return (
    <p style={{
      fontSize: 16.5, lineHeight: 1.85, maxWidth: 760, marginBottom: 44,
      color: on === "dark" ? "rgba(255,255,255,0.62)" : C.muted,
    }}>{children}</p>
  );
}

const SECTION = (bg: string) => ({ background: bg, padding: "104px 0" } as const);
const CARD_DARK = { background: "rgba(255,255,255,0.035)", border: "1px solid rgba(2,195,154,0.16)", borderRadius: 18, padding: "26px 24px", height: "100%" } as const;

/** Runs `fn` once, the first time the returned ref scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = React.useRef<T>(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/**
 * Counts a display string up to its value: "270M+" → 0…270 then "M+".
 * Written to take the STRING the copy already holds rather than a number plus
 * formatting props, so the copy layer stays the single source of truth and a
 * non-numeric value like "One" simply renders as itself.
 */
function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  const { lang } = useI18n();
  const idn = lang === "id";
  const m = value.match(/^([\d.,]+)(.*)$/);
  const raw = m ? m[1] : "";
  // Indonesian inverts the separators: 1.500 is fifteen hundred, 8,7 is 8.7.
  const target = m
    ? parseFloat(idn ? raw.replace(/\./g, "").replace(",", ".") : raw.replace(/,/g, ""))
    : null;
  const dsep = idn ? "," : ".";
  const decimals = raw.includes(dsep) ? raw.split(dsep)[1].length : 0;
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!seen || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // ease-out-cubic — fast start, settles on the number rather than crawling
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target, duration]);

  if (target === null) return <span ref={ref}>{value}</span>;
  // toLocaleString handles grouping and decimal marks for both locales, so the
  // rendered number matches the convention the copy was written in.
  const shown = n.toLocaleString(idn ? "id-ID" : "en-US", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });
  return <span ref={ref}>{shown}{m![2]}</span>;
}

/* ── hero visual: the care continuum, with a record travelling through it ── */

const CONTINUUM = [
  { k: "Community", v: "Posyandu" },
  { k: "Maternal", v: "Bidan" },
  { k: "Family", v: "WhatsApp" },
  { k: "Clinic", v: "Doctor" },
  { k: "Hospital", v: "Claim" },
];

function Continuum() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const trackRef = React.useRef<HTMLDivElement>(null);

  // The pulse travels the rail's pixel width, which only exists at runtime —
  // so the keyframe reads it from a custom property kept in sync with resize
  // rather than hard-coding a distance that would break at every breakpoint.
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const sync = () => el.style.setProperty("--travel", `${el.getBoundingClientRect().width * 0.88}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`continuum${seen ? " run" : ""}`} style={{ marginTop: 46 }}>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 800, letterSpacing: 1.4, marginBottom: 20 }}>
        ONE RECORD, MOVING THROUGH EVERY LAYER
      </div>
      <div className="cont-track" ref={trackRef}>
        <div className="cont-rail" />
        <div className="cont-fill" />
        <div className="cont-pulse" />
        {CONTINUUM.map((c, i) => (
          <div key={c.k} className="cont-node" style={{ ["--i" as string]: i }}>
            <span className="cont-dot" />
            <span className="cont-k">{c.k}</span>
            <span className="cont-v">{c.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── model visual: the flywheel, actually turning ────────────────────────── */

function Flywheel() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const arcs = [
    { label: "REACH", sub: "community", from: 0 },
    { label: "REVENUE", sub: "clinics", from: 120 },
    { label: "MARGIN", sub: "hospitals", from: 240 },
  ];
  return (
    <div ref={ref} className={`fly${seen ? " run" : ""}`}>
      <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 260, display: "block", margin: "0 auto" }}>
        {/* rotating dashed ring — the loop that never stops turning */}
        <circle className="fly-ring" cx="130" cy="130" r="104" fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="5 11" opacity="0.45" />
        {/* three drawn arcs, one per revenue layer */}
        {arcs.map((a, i) => {
          const r = 86, cx = 130, cy = 130;
          const a0 = ((a.from - 88) * Math.PI) / 180, a1 = ((a.from + 26) * Math.PI) / 180;
          const p = `M ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`;
          return <path key={a.label} className="fly-arc" style={{ ["--i" as string]: i }} d={p} fill="none" stroke={C.teal} strokeWidth="7" strokeLinecap="round" />;
        })}
        {/* labels sit outside the arcs */}
        {arcs.map((a, i) => {
          const rad = ((a.from - 31) * Math.PI) / 180, R = 118;
          return (
            <g key={a.label} className="fly-lab" style={{ ["--i" as string]: i }}>
              <text x={130 + R * Math.cos(rad)} y={130 + R * Math.sin(rad)} fill={C.white} fontSize="11.5" fontWeight="800" textAnchor="middle" letterSpacing="0.8">{a.label}</text>
              <text x={130 + R * Math.cos(rad)} y={130 + R * Math.sin(rad) + 14} fill="rgba(255,255,255,0.45)" fontSize="9.5" textAnchor="middle">{a.sub}</text>
            </g>
          );
        })}
        {/* the hub: what all three are actually feeding */}
        <circle className="fly-hub" cx="130" cy="130" r="46" fill="rgba(2,195,154,0.1)" stroke={C.teal} strokeWidth="1.4" />
        <text x="130" y="126" fill={C.teal} fontSize="12.5" fontWeight="800" textAnchor="middle">CONSENTED</text>
        <text x="130" y="142" fill={C.teal} fontSize="12.5" fontWeight="800" textAnchor="middle">CORPUS</text>
        <text x="130" y="158" fill="rgba(255,255,255,0.45)" fontSize="9" textAnchor="middle">trains the model</text>
      </svg>
    </div>
  );
}

/* ── engine visual: one measurement climbing into meaning ────────────────── */
//
// The point of the cascade is that the LEFT column stays the same physical
// event while the RIGHT column changes what it means — so the rung values are
// literal outputs of that one weighing, not six unrelated illustrations.

const RUNGS = [
  { v: "8.2 kg · 74 cm", s: "14 months, female" },
  { v: "WAZ −2.7", s: "WHO growth standard" },
  { v: "SAM", s: "severe acute malnutrition" },
  { v: "Referral", s: "midwife + Puskesmas notified" },
  { v: "13% → 17%", s: "district SAM prevalence" },
  { v: "55 / week", s: "alert threshold, auto-calculated" },
];

function Cascade({ items }: { items: { tag: string; t: string; d: string }[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`casc${seen ? " run" : ""}`}>
      <div className="casc-spine"><div className="casc-spine-fill" /></div>
      {items.map((it, i) => (
        <div key={it.t} className="casc-row" style={{ ["--i" as string]: i }}>
          <div className="casc-marker"><span /></div>
          <div className="casc-body">
            <div className="casc-tag">{it.tag}</div>
            <div className="casc-t">{it.t}</div>
            <p className="casc-d">{it.d}</p>
          </div>
          <div className="casc-val">
            <div className="casc-v">{RUNGS[i]?.v}</div>
            <div className="casc-s">{RUNGS[i]?.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── B2G visual: the epidemic curve, drawn ───────────────────────────────── */
//
// Shape and thresholds mirror the real surveillance tab: a case curve, an
// amber alert line at mean + 1.5 SD, and a red emergency band where the curve
// crosses it. Values are illustrative; the mechanism shown is the real one.

const CURVE = [6, 8, 13, 14, 15, 22, 31, 44, 58, 66, 62, 51, 47, 30, 18, 11, 7, 5, 4, 4];

function EpidemicCurve() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const W = 620, H = 170, pad = 8;
  const max = 72, alert = 55;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (CURVE.length - 1);
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);

  // Catmull-Rom → cubic bezier, so the curve reads like an epi curve rather
  // than a polyline with visible corners.
  let d = `M ${x(0)} ${y(CURVE[0])}`;
  for (let i = 0; i < CURVE.length - 1; i++) {
    const p0 = CURVE[i - 1] ?? CURVE[i], p1 = CURVE[i], p2 = CURVE[i + 1], p3 = CURVE[i + 2] ?? CURVE[i + 1];
    d += ` C ${x(i) + (x(i + 1) - x(i)) / 3} ${y(p1 + (p2 - p0) / 6)}, ${x(i + 1) - (x(i + 1) - x(i)) / 3} ${y(p2 - (p3 - p1) / 6)}, ${x(i + 1)} ${y(p2)}`;
  }
  const over = CURVE.map((v, i) => (v >= alert ? i : -1)).filter((i) => i >= 0);

  return (
    <div ref={ref} className={`epi${seen ? " run" : ""}`}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <linearGradient id="epiFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.teal} stopOpacity="0.34" />
            <stop offset="1" stopColor={C.teal} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* the band where cases sat above threshold */}
        {over.length > 0 && (
          <rect className="epi-band" x={x(over[0])} y={pad} width={x(over[over.length - 1]) - x(over[0])} height={H - pad * 2}
            fill="#E5484D" opacity="0.14" />
        )}
        <path className="epi-area" d={`${d} L ${x(CURVE.length - 1)} ${H - pad} L ${x(0)} ${H - pad} Z`} fill="url(#epiFill)" />
        <path className="epi-line" d={d} fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round" />
        {/* alert threshold — the number the engine computes, not a constant */}
        <line className="epi-thr" x1={pad} y1={y(alert)} x2={W - pad} y2={y(alert)} stroke="#F5A524" strokeWidth="1.4" strokeDasharray="6 5" />
        <text className="epi-thr-l" x={W - pad} y={y(alert) - 7} fill="#F5A524" fontSize="9.5" fontWeight="700" textAnchor="end">
          ALERT · mean + 1.5 SD = 55/wk
        </text>
      </svg>
      <div className="epi-legend">
        <span><i style={{ background: C.teal }} />Weekly cases</span>
        <span><i style={{ background: "#F5A524" }} />Auto-calculated alert threshold</span>
        <span><i style={{ background: "#E5484D" }} />Above threshold — SKDR signal</span>
      </div>
    </div>
  );
}

/* ── 1 · HERO ────────────────────────────────────────────────────────────── */

function Hero({ t }: { t: (typeof COPY)["en"] }) {
  const h = t.hero;
  return (
    <section style={{ background: `linear-gradient(150deg,${C.dark} 0%,${C.charcoal} 55%,${C.tealXdk} 140%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 720, height: 720, background: C.teal, top: -280, right: -180, borderRadius: "50%", filter: "blur(130px)", opacity: 0.1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(2,195,154,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(2,195,154,0.035) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

      <div className="section-max" style={{ position: "relative", zIndex: 1, paddingTop: 128, paddingBottom: 92 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(2,195,154,0.1)", border: "1px solid rgba(2,195,154,0.3)", borderRadius: 20, padding: "7px 16px", marginBottom: 30 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1.3 }}>{h.kicker}</span>
        </div>

        <h1 className="display-font" style={{ fontSize: "clamp(36px,5.4vw,68px)", color: C.white, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 26, maxWidth: 940 }}>
          {h.h1a}<br />
          <span style={{ color: C.teal }}>{h.h1b}</span><br />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>{h.h1c}</span>
        </h1>

        <p style={{ fontSize: 17.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.85, marginBottom: 38, maxWidth: 700 }}>{h.sub}</p>

        <div style={{ display: "flex", gap: 13, flexWrap: "wrap", marginBottom: 56 }}>
          <a href="/investors#deck"
            style={{ background: C.teal, color: C.dark, padding: "14px 28px", borderRadius: 12, fontSize: 14.5, fontWeight: 700, textDecoration: "none" }}>
            {h.ctaPrimary} →
          </a>
          <a href="/enterprise"
            style={{ border: "1.5px solid rgba(2,195,154,0.4)", color: C.white, padding: "14px 28px", borderRadius: 12, fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>
            {h.ctaSecondary}
          </a>
        </div>

        {/* scale of the system we sit inside */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "rgba(2,195,154,0.16)", border: "1px solid rgba(2,195,154,0.16)", borderRadius: 16, overflow: "hidden", marginBottom: 30 }}>
          {h.scale.map((s) => (
            <div key={s.l} style={{ background: "rgba(15,31,28,0.92)", padding: "22px 20px" }}>
              <div className="display-font" style={{ color: C.teal, fontSize: 30, lineHeight: 1, marginBottom: 7 }}><CountUp value={s.n} /></div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12.5, lineHeight: 1.45 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <Continuum />

        <div style={{ display: "flex", gap: 9, flexWrap: "wrap", alignItems: "center", marginTop: 46 }}>
          <img src="/nvidia-inception.png" alt="NVIDIA Inception Program Member" style={{ height: 38, width: "auto", objectFit: "contain", borderRadius: 4, opacity: 0.95 }} />
          {[["PSE Kominfo", FACTS.nib], ["UU PDP", "AES-256-GCM"], ["SATUSEHAT", "HL7 FHIR R4"], ["AWS Jakarta", "ap-southeast-3"]].map(([a, b]) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(2,195,154,0.06)", border: "1px solid rgba(2,195,154,0.2)", borderRadius: 10, padding: "7px 12px" }}>
              {a === "AWS Jakarta" && <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>🇮🇩</span>}
              <span style={{ color: C.teal, fontWeight: 700, fontSize: 11 }}>{a}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>· {b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── 4 · THE PLATFORM ────────────────────────────────────────────────────── */

function Platform({ t }: { t: (typeof COPY)["en"] }) {
  const pl = t.platform;
  return (
    <section id="network" style={SECTION(C.cream)}>
      <div className="section-max">
        <FadeIn>
          <Kicker>{pl.kicker}</Kicker>
          <H2>{pl.h2}</H2>
          <Lead>{pl.lead}</Lead>
        </FadeIn>

        <FadeIn><PlatformPicker nodes={pl.nodes} /></FadeIn>

        <FadeIn>
          <div style={{ marginTop: 30, background: `linear-gradient(135deg,${C.tealXdk},${C.dark})`, borderRadius: 20, padding: "34px 32px" }}>
            <h3 className="display-font" style={{ color: C.white, fontSize: "clamp(22px,2.7vw,34px)", lineHeight: 1.22, marginBottom: 14, maxWidth: 780 }}>{pl.close}</h3>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 15.5, lineHeight: 1.8, maxWidth: 800 }}>{pl.closeSub}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 5 · THE ENGINE ROOM ─────────────────────────────────────────────────── */

function Engine({ t }: { t: (typeof COPY)["en"] }) {
  const e = t.engine;
  return (
    <section style={SECTION(C.dark)}>
      <div className="section-max">
        <FadeIn>
          <Kicker on="dark">{e.kicker}</Kicker>
          <H2 on="dark">{e.h2}</H2>
          <Lead on="dark">{e.lead}</Lead>
        </FadeIn>

        {/* the cascade — one weighing, climbing into meaning */}
        <FadeIn>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, marginBottom: 26 }}>
            {e.cascadeTitle.toUpperCase()}
          </div>
          <Cascade items={e.cascade} />
        </FadeIn>

        {/* the engines themselves */}
        <FadeIn>
          <div className="eng-grid" style={{ marginTop: 40 }}>
            {e.engines.map((en) => (
              <div key={en.t} style={{ ...CARD_DARK, padding: "20px 18px" }}>
                <div style={{ color: C.teal, fontSize: 9.5, fontWeight: 800, letterSpacing: 1.1, marginBottom: 9 }}>{en.m}</div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{en.t}</div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.8, lineHeight: 1.65 }}>{en.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* what the government actually looks at */}
        <FadeIn>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(2,195,154,0.18)", borderRadius: 20, padding: "28px 28px 24px", marginTop: 56 }}>
            <div className="dash-head">
              <div>
                <div style={{ color: C.teal, fontSize: 10, fontWeight: 800, letterSpacing: 1.3, marginBottom: 12 }}>GOVERNMENT DASHBOARD · LIVE</div>
                <h3 className="display-font" style={{ color: C.white, fontSize: "clamp(21px,2.5vw,30px)", lineHeight: 1.25, marginBottom: 14 }}>{e.dashTitle}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14.5, lineHeight: 1.8 }}>{e.dashLead}</p>
                <div className="dash-kpis">
                  {e.dashKpis.map((k) => (
                    <div key={k.l}>
                      <div className="display-font" style={{ color: C.teal, fontSize: 22, lineHeight: 1, marginBottom: 6 }}>{k.n}</div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, lineHeight: 1.5 }}>{k.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9.5, fontWeight: 800, letterSpacing: 1.3, marginBottom: 12 }}>
                  EPIDEMIC CURVE — COMMUNICABLE DISEASE, ONE DISTRICT
                </div>
                <EpidemicCurve />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* The section deliberately stops short. A homepage that explains the
            whole engine leaves nothing to ask about — this one ends on the
            admission that it can't, and points at where the rest lives. */}
        <FadeIn>
        {/* the model the whole stack is quietly feeding */}
        <FadeIn>
          <div className="sov">
            <div className="sov-l">
              <div className="sov-tag">
                <span className="sov-dot" />{e.sovTag}
              </div>
              <h3 className="display-font" style={{ color: C.white, fontSize: "clamp(21px,2.5vw,30px)", lineHeight: 1.25, marginBottom: 13 }}>{e.sovTitle}</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.8 }}>{e.sovBody}</p>
            </div>
            <div className="sov-r">
              {e.sovChips.map((c) => (
                <div key={c.t} className="sov-chip">
                  <b>{c.t}</b>
                  <span>{c.d}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

          <div className="fly-row" style={{ marginTop: 48, paddingTop: 34, borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            <div>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.85, marginBottom: 24 }}>{e.close}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/technology" style={{ background: C.teal, color: C.dark, padding: "12px 24px", borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                {e.closeCta} →
              </a>
              <a href="mailto:investor@sahaibat.com?subject=SahAIbat%20—%20the%20engineering%20underneath"
                 style={{ border: "1.5px solid rgba(2,195,154,0.4)", color: C.white, padding: "12px 24px", borderRadius: 11, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                {e.closeCta2}
              </a>
            </div>
            </div>
            {/* The flywheel argues what the paragraph argues — that this
                compounds rather than sits still — so it belongs beside the
                close, not in a revenue section the homepage no longer carries. */}
            <Flywheel />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


/* ── platform: pick a layer, read that layer ─────────────────────────────── */
//
// Six stacked rows cost ~900px and asked the reader to hold a comparison in
// their head across all of them. The same six are now a selectable rail — the
// market-vs-us bars stay visible on every row, so the spanning argument is
// still made structurally, while only the chosen layer spends vertical space.

const RIVALS = ["Paper registers", "KIA books", "Telehealth apps", "EMRs · AI scribes", "Chatbots", "Casemix consultancies"];

function PlatformPicker({ nodes }: { nodes: (typeof COPY)["en"]["platform"]["nodes"] }) {
  const [sel, setSel] = React.useState(0);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const n = nodes[sel];
  return (
    <div ref={ref} className={`pick${seen ? " run" : ""}`}>
      <div className="pick-rail">
        <div className="pick-head">
          <span>LAYER</span><span>MARKET</span><span>SAHAIBAT</span>
        </div>
        {nodes.map((nd, i) => (
          <button key={nd.name} className={`pick-row${i === sel ? " on" : ""}`} onClick={() => setSel(i)}
            aria-pressed={i === sel}>
            <span className="pick-l">
              <i>{nd.layer}</i>
              <b>{nd.name}</b>
            </span>
            <span className="pick-bar market"><em style={{ ["--i" as string]: i }} /></span>
            <span className="pick-bar us"><em style={{ ["--i" as string]: i }} /></span>
          </button>
        ))}
      </div>

      <div key={n.name} className="pick-panel">
        <div style={{ color: C.teal, fontSize: 10, fontWeight: 800, letterSpacing: 1.3, marginBottom: 8 }}>{n.layer}</div>
        <div className="display-font" style={{ color: C.white, fontSize: 32, lineHeight: 1.05, marginBottom: 6 }}>{n.name}</div>
        <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 12.5, marginBottom: 20 }}>{n.who}</div>
        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.75, marginBottom: 22 }}>{n.what}</p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9.5, fontWeight: 800, letterSpacing: 1.3, marginBottom: 8 }}>
            WHAT THE MARKET OFFERS TODAY — {RIVALS[sel]?.toUpperCase()}
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13.5, lineHeight: 1.7 }}>{n.market}</p>
        </div>
      </div>
    </div>
  );
}

/* ── traction, by care layer ─────────────────────────────────────────────── */
//
// One averaged ANC score was doing all the work and undersold the deployment.
// Tabs let each layer speak with its own numbers without stacking three
// metric rows down the page.

function TractionTabs({ tabs }: { tabs: (typeof COPY)["en"]["traction"]["tabs"] }) {
  const [active, setActive] = React.useState(0);
  const tab = tabs[active];
  return (
    <div>
      <div className="trac-tabs" role="tablist">
        {tabs.map((t, i) => (
          <button key={t.id} role="tab" aria-selected={i === active}
            className={`trac-tab${i === active ? " on" : ""}`} onClick={() => setActive(i)}>
            {t.label}
          </button>
        ))}
      </div>
      {/* keyed on the tab id so the numbers re-count each time you switch */}
      <div key={tab.id} className="trac-panel">
        <div className="proof-metrics" style={{ borderBottom: "none", paddingBottom: 22 }}>
          {tab.metrics.map((m) => (
            <div key={m.l}>
              <div className="display-font" style={{ color: C.teal, fontSize: 38, lineHeight: 1, marginBottom: 9 }}>
                <CountUp value={m.n} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.55 }}>{m.l}</div>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14.5, lineHeight: 1.8, maxWidth: 780,
          paddingBottom: 30, borderBottom: "1px solid rgba(255,255,255,0.09)" }}>{tab.note}</p>
      </div>
    </div>
  );
}

/* ── the name, which is also the product decision ────────────────────────── */

function BrandStory({ t }: { t: (typeof COPY)["en"] }) {
  const b = t.brand;
  return (
    <section style={{ background: C.warm, padding: "72px 0" }}>
      <div className="section-max">
        <FadeIn>
          <div className="brand-row">
            <div className="brand-word">
              <span>Sah</span><em>AI</em><span>bat</span>
              <i>sahabat · companion</i>
            </div>
            <div>
              <div style={{ color: C.tealDk, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4, marginBottom: 14 }}>{b.kicker}</div>
              <p style={{ color: C.dark, fontSize: 18, lineHeight: 1.75, marginBottom: 14, fontWeight: 500 }}>{b.story}</p>
              <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.8 }}>{b.sub}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── DOK: the layer that is already commercial ───────────────────────────── */

function DokSpotlight({ t }: { t: (typeof COPY)["en"] }) {
  const d = t.dok;
  return (
    <section style={{ background: C.cream, padding: "84px 0" }}>
      <div className="section-max">
        <FadeIn>
          <div className="dok-card">
            <div className="dok-glow" />
            <div className="dok-inner">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, animation: "pulse 2s infinite" }} />
                  <span style={{ color: C.teal, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4 }}>{d.kicker}</span>
                </div>
                <h3 className="display-font" style={{ color: C.white, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.2, marginBottom: 16 }}>{d.h2}</h3>
                <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 15.5, lineHeight: 1.8, marginBottom: 22 }}>{d.lead}</p>
                <ul className="dok-list">
                  {d.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 26 }}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer"
                    style={{ background: C.teal, color: C.dark, padding: "13px 26px", borderRadius: 12, fontSize: 14.5, fontWeight: 700, textDecoration: "none" }}>
                    {d.cta} →
                  </a>
                  <span style={{ color: "rgba(255,255,255,0.42)", fontSize: 12.5 }}>{d.badge}</span>
                </div>
              </div>
              <div className="dok-mock">
                <div className="dok-mock-bar"><i /><i /><i /><span>Konsultasi · Ny. Kartika S.</span></div>
                <div className="dok-mock-body">
                  <div className="dok-lab"><span>Kreatinin</span><b>1.9 mg/dL ↑</b></div>
                  <div className="dok-lab"><span>Ureum</span><b>58 mg/dL ↑</b></div>
                  <div className="dok-flag">
                    <div>⚠ eGFR 40 — fungsi ginjal stadium G3b</div>
                    <p>Dihitung dari kreatinin ini. Tidak tercetak di laporan.</p>
                  </div>
                  <div className="dok-code"><span>ICD-10</span><b>E11.2</b><i>dengan komplikasi ginjal</i></div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 5 · PROOF ───────────────────────────────────────────────────────────── */
//
// Traction, team and governance were three full sections making one point:
// this is real, these people built it, under these rules. As three they cost
// ~2,100px and the reader had lost the thread by the third. Merged, they are
// one credibility band you can take in at a glance.

function Proof({ t }: { t: (typeof COPY)["en"] }) {
  const { traction: tr, team: tm } = t;
  return (
    <section style={SECTION(C.dark)}>
      <div className="section-max">
        <FadeIn>
          <Kicker on="dark">{tr.kicker}</Kicker>
          <H2 on="dark">{tr.h2}</H2>
          <Lead on="dark">{tr.lead}</Lead>
        </FadeIn>

        {/* what is running — by layer, because one ANC score undersold it */}
        <FadeIn><TractionTabs tabs={tr.tabs} /></FadeIn>

        {/* who it runs with, who built it, what it runs under — one row each */}
        <FadeIn>
          <div className="proof-rows">
            <div>
              <div className="proof-lbl">DEPLOYMENT PARTNERS</div>
              <div className="proof-chips">
                {tr.partners.map((p) => (
                  <span key={p.n} className="proof-chip">
                    <b>{p.n}</b><i>{p.d}</i>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="proof-lbl">{tm.kicker}</div>
              <h3 className="display-font proof-h">{tm.h2}</h3>
              <p className="proof-sub">{tm.lead}</p>
              {/* Roles, not CVs — and the open ones are shown rather than hidden,
                  because an org chart with visible gaps reads as a company that
                  knows what it is still missing. */}
              <div className="crew">
                {tm.people.map((pr) => (
                  <div key={pr.n} className={`crew-c${pr.open ? " open" : ""}`}>
                    <span className="crew-av">
                      {pr.open ? "+" : pr.n.replace(/^Dr\.\s*/, "").split(" ").slice(0, 2).map((w) => w[0]).join("")}
                    </span>
                    <div>
                      <b>{pr.n}</b>
                      <i>{pr.r}</i>
                      <p>{pr.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 34,
            background: "rgba(2,195,154,0.1)", border: `1px solid ${C.teal}45`, borderRadius: 22, padding: "9px 18px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, animation: "pulse 2s infinite" }} />
            <span style={{ color: C.teal, fontSize: 13, fontWeight: 700 }}>{tr.close}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


/* ── 10 · CLOSING CTA ────────────────────────────────────────────────────── */

function Close({ t }: { t: (typeof COPY)["en"] }) {
  const c = t.cta;
  return (
    <section style={{ ...SECTION(C.cream), paddingBottom: 116 }}>
      <div className="section-max">
        <FadeIn>
          <div style={{ background: `linear-gradient(135deg,${C.dark},${C.tealXdk})`, borderRadius: 26, padding: "56px 44px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 420, height: 420, background: C.teal, top: -190, right: -130, borderRadius: "50%", filter: "blur(115px)", opacity: 0.14, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="display-font" style={{ color: C.white, fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.18, marginBottom: 18, maxWidth: 720 }}>{c.h2}</h2>
              <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 16.5, lineHeight: 1.8, maxWidth: 680, marginBottom: 34 }}>{c.lead}</p>
              <div style={{ display: "flex", gap: 13, flexWrap: "wrap", marginBottom: 30 }}>
                <a href="/investors#deck"
                  style={{ background: C.teal, color: C.dark, padding: "14px 28px", borderRadius: 12, fontSize: 14.5, fontWeight: 700, textDecoration: "none" }}>
                  {c.primary} →
                </a>
                <a href={`mailto:${FACTS.investorEmail}?subject=Investor%20conversation`}
                  style={{ border: "1.5px solid rgba(2,195,154,0.4)", color: C.white, padding: "14px 28px", borderRadius: 12, fontSize: 14.5, fontWeight: 600, textDecoration: "none" }}>
                  {c.secondary}
                </a>
              </div>
              <div style={{ color: "rgba(255,255,255,0.32)", fontSize: 12.5, borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: 20 }}>{c.fine}</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

// `initialLang` is set by the route, not by the visitor: / is English (the
// investor and enterprise entry point) and /id is Bahasa. It is pushed into the
// shared provider so the nav's language switch stays in sync with the page it
// is sitting on.
export default function HomePage({ initialLang = "en" }: { initialLang?: Lang }) {
  const { setLang } = useI18n();
  useEffect(() => { setLang(initialLang); }, [initialLang, setLang]);
  const t = COPY[initialLang];

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.35 } }

        /* ── hero continuum ── */
        .cont-track { position:relative; display:grid;
          grid-template-columns:repeat(5,1fr); align-items:start; padding-top:26px; }
        .cont-rail, .cont-fill { position:absolute; top:30px; left:6%; height:2px; border-radius:2px; }
        .cont-rail { right:6%; background:rgba(2,195,154,0.16); }
        .cont-fill { width:0; background:linear-gradient(90deg,#02C39A,#5DE0C0); }
        .continuum.run .cont-fill { animation: contFill 1.9s .25s cubic-bezier(.3,.8,.3,1) forwards; }
        @keyframes contFill { to { width:88%; } }
        .cont-pulse { position:absolute; top:25px; left:6%; width:12px; height:12px; border-radius:50%;
          background:#5DE0C0; box-shadow:0 0 0 5px rgba(2,195,154,0.18); opacity:0; }
        .continuum.run .cont-pulse { animation: contPulse 3.4s 2.1s cubic-bezier(.45,0,.55,1) infinite; }
        @keyframes contPulse {
          0%   { opacity:0; transform:translateX(0) }
          8%   { opacity:1 }
          92%  { opacity:1 }
          100% { opacity:0; transform:translateX(var(--travel,760px)) }
        }
        .cont-node { position:relative; display:flex; flex-direction:column; align-items:center;
          text-align:center; opacity:0; transform:translateY(10px); }
        .continuum.run .cont-node { animation: contIn .5s calc(.35s + var(--i) * .28s) forwards ease-out; }
        @keyframes contIn { to { opacity:1; transform:none } }
        .cont-dot { width:13px; height:13px; border-radius:50%; background:#0F1F1C;
          border:2px solid #02C39A; margin-bottom:14px; position:relative; z-index:2; }
        .continuum.run .cont-node .cont-dot { animation: dotPop .45s calc(.35s + var(--i) * .28s) backwards; }
        @keyframes dotPop { from { transform:scale(.2) } 60% { transform:scale(1.35) } to { transform:scale(1) } }
        .cont-k { color:#fff; font-size:12.5px; font-weight:700; }
        .cont-v { color:rgba(255,255,255,0.38); font-size:11px; margin-top:3px; }

        /* ── platform layer-span ── */
        .span-wrap { background:#fff; border:1px solid rgba(1,115,103,0.14); border-radius:20px;
          padding:26px 26px 22px; margin-bottom:34px; }
        .span-head { display:grid; grid-template-columns:120px 1fr 1fr; gap:18px;
          font-size:9.5px; font-weight:800; letter-spacing:1.3; padding-bottom:14px; }
        .span-grid { position:relative; display:grid; grid-template-columns:120px 1fr 1fr;
          gap:18px 18px; align-items:center; }
        .span-layer { color:#2D3B38; font-size:13px; font-weight:700; }
        .span-rival span, .span-us span { display:block; height:11px; border-radius:6px;
          transform:scaleX(0); transform-origin:left center; }
        .span-rival span { background:#EDE8DF; color:transparent; font-size:0;
          box-shadow:inset 0 0 0 1px rgba(0,0,0,0.05); width:46%; }
        .span-wrap.run .span-rival span { animation: barIn .5s calc(.15s + var(--i) * .09s) forwards ease-out; }
        .span-us span { background:linear-gradient(90deg,#017367,#02C39A); width:100%; }
        .span-wrap.run .span-us span { animation: barIn .55s calc(.5s + var(--i) * .12s) forwards ease-out; }
        @keyframes barIn { to { transform:scaleX(1) } }
        /* the spine: one unbroken line down the SahAIbat column */
        .span-spine { position:absolute; left:calc(120px + 18px + (100% - 120px - 36px)/2 + 18px);
          top:4px; bottom:4px; width:3px; background:rgba(2,195,154,0.14); border-radius:2px; }
        .span-spine-fill { width:100%; height:0; border-radius:2px;
          background:linear-gradient(180deg,#02C39A,#017367); }
        .span-wrap.run .span-spine-fill { animation: spineDraw 1.5s .45s forwards cubic-bezier(.3,.8,.3,1); }
        @keyframes spineDraw { to { height:100% } }

        /* ── flywheel ── */
        .fly-row { display:grid; grid-template-columns:1fr 300px; gap:34px; align-items:center; }
        .fly-ring { transform-origin:130px 130px; }
        .fly.run .fly-ring { animation: flySpin 26s linear infinite; }
        @keyframes flySpin { to { transform:rotate(360deg) } }
        .fly-arc { stroke-dasharray:200; stroke-dashoffset:200; }
        .fly.run .fly-arc { animation: arcDraw .85s calc(.2s + var(--i) * .3s) forwards ease-out; }
        @keyframes arcDraw { to { stroke-dashoffset:0 } }
        .fly-lab { opacity:0; }
        .fly.run .fly-lab { animation: contIn .5s calc(.5s + var(--i) * .3s) forwards; }
        .fly-hub { opacity:0; transform-origin:130px 130px; }
        .fly.run .fly-hub { animation: hubIn .7s 1.3s forwards ease-out; }
        @keyframes hubIn { from { opacity:0; transform:scale(.75) } to { opacity:1; transform:scale(1) } }

        /* ── engine: the meaning cascade ── */
        .casc { position:relative; display:grid; grid-template-columns:1fr 1fr; gap:4px 34px; }
        .casc-spine { position:absolute; left:7px; top:14px; bottom:22px; width:2px; z-index:0;
          background:rgba(2,195,154,0.14); border-radius:2px; }
        .casc-spine-fill { width:100%; height:0; border-radius:2px;
          background:linear-gradient(180deg,#02C39A,#017367); }
        .casc.run .casc-spine-fill { animation: cascSpine 2.4s .2s forwards cubic-bezier(.35,.8,.35,1); }
        @keyframes cascSpine { to { height:100% } }
        .casc-row { display:grid; grid-template-columns:16px 1fr auto; gap:14px;
          align-items:start; padding:12px 0; opacity:0; transform:translateY(12px); }
        .casc.run .casc-row { animation: contIn .55s calc(.3s + var(--i) * .26s) forwards ease-out; }
        .casc-marker { position:relative; padding-top:4px; z-index:1; }
        .casc-marker span { display:block; width:16px; height:16px; border-radius:50%;
          background:#0F1F1C; border:2px solid #02C39A; position:relative; z-index:2; }
        .casc.run .casc-marker span { animation: dotPop .5s calc(.3s + var(--i) * .26s) backwards; }
        .casc-tag { color:#02C39A; font-size:9px; font-weight:800; letter-spacing:1.2; margin-bottom:5px; }
        .casc-t { color:#fff; font-size:15.5px; font-weight:700; margin-bottom:5px; line-height:1.3; }
        .casc-d { color:rgba(255,255,255,0.5); font-size:12.5px; line-height:1.6; }
        .casc-val { text-align:right; padding-top:2px; }
        .casc-val { text-align:right; }
        .casc-v { color:#02C39A; font-size:19px; font-weight:800; font-variant-numeric:tabular-nums; }
        .casc-s { color:rgba(255,255,255,0.35); font-size:11.5px; margin-top:4px; line-height:1.5; }

        /* ── engine cards + dashboard ── */
        .eng-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(186px,1fr)); gap:12px; }
        .dash-head { display:grid; grid-template-columns:1fr 1fr; gap:38px; align-items:center; }
        .dash-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:26px;
          padding-top:22px; border-top:1px solid rgba(255,255,255,0.08); }

        /* ── epidemic curve ── */
        .epi-area { opacity:0; }
        .epi.run .epi-area { animation: contIn .8s 1.05s forwards; }
        .epi-line { stroke-dasharray:1400; stroke-dashoffset:1400; }
        .epi.run .epi-line { animation: epiDraw 1.7s .15s forwards cubic-bezier(.35,.75,.4,1); }
        @keyframes epiDraw { to { stroke-dashoffset:0 } }
        .epi-thr, .epi-thr-l { opacity:0; }
        .epi.run .epi-thr, .epi.run .epi-thr-l { animation: contIn .5s 1.5s forwards; }
        .epi-band { opacity:0; }
        .epi.run .epi-band { animation: contIn .6s 1.85s forwards; }
        .epi-legend { display:flex; gap:16px; flex-wrap:wrap; margin-top:12px; }
        .epi-legend span { display:inline-flex; align-items:center; gap:6px;
          color:rgba(255,255,255,0.42); font-size:10.5px; }
        .epi-legend i { width:9px; height:9px; border-radius:2px; display:inline-block; }

        /* ── proof band ── */
        .proof-metrics { display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr));
          gap:18px; padding-bottom:34px; border-bottom:1px solid rgba(255,255,255,0.09); }
        .proof-rows { display:grid; gap:44px; padding-top:32px; }
        .proof-lbl { color:#02C39A; font-size:11px; font-weight:800;
          letter-spacing:1.5px; margin-bottom:14px; }
        .proof-h { color:#fff; font-size:clamp(20px,2.2vw,26px); font-weight:700;
          letter-spacing:-0.02em; line-height:1.25; margin-bottom:10px; }
        .proof-sub { color:rgba(255,255,255,0.55); font-size:14.5px; line-height:1.8;
          max-width:660px; margin-bottom:22px; }
        .proof-chips { display:flex; flex-wrap:wrap; gap:9px; }
        .proof-chip { display:inline-flex; flex-direction:column; gap:3px;
          background:rgba(255,255,255,0.035); border:1px solid rgba(2,195,154,0.16);
          border-radius:12px; padding:11px 15px; }
        .proof-chip b { color:#fff; font-size:13.5px; font-weight:700; }
        .proof-chip i { color:rgba(255,255,255,0.42); font-size:11.5px; font-style:normal; }

        /* ── traction tabs ── */
        .trac-tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:26px; }
        .trac-tab { background:rgba(255,255,255,0.04); border:1px solid rgba(2,195,154,0.18);
          color:rgba(255,255,255,0.55); border-radius:11px; padding:9px 20px; font-size:13.5px;
          font-weight:600; cursor:pointer; transition:all .18s; font-family:inherit; }
        .trac-tab:hover { color:#fff; border-color:rgba(2,195,154,0.4); }
        .trac-tab.on { background:#02C39A; border-color:#02C39A; color:#0F1F1C; font-weight:700; }
        .trac-panel { animation: tracIn .35s ease-out; }
        @keyframes tracIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }

        /* ── brand story ── */
        .brand-row { display:grid; grid-template-columns:300px 1fr; gap:44px; align-items:center; }
        .brand-word { font-family:'IBM Plex Sans',system-ui,sans-serif; font-size:44px; font-weight:700;
          color:#0F1F1C; letter-spacing:-1.5px; line-height:1.1; }
        .brand-word em { color:#02C39A; font-style:normal; position:relative; }
        .brand-word em:after { content:''; position:absolute; left:-3px; right:-3px; bottom:2px; height:8px;
          background:rgba(2,195,154,0.2); border-radius:3px; z-index:-1; }
        .brand-word i { display:block; font-family:inherit; font-style:normal;
          font-size:12px; letter-spacing:1.6px; color:#6B8078; font-weight:600; margin-top:12px; }

        /* ── DOK spotlight ── */
        .dok-card { position:relative; background:linear-gradient(140deg,#0F1F1C,#024D42);
          border-radius:26px; padding:44px 44px; overflow:hidden;
          box-shadow:0 24px 60px rgba(2,77,66,0.28); }
        .dok-glow { position:absolute; width:420px; height:420px; background:#02C39A; top:-190px; right:-130px;
          border-radius:50%; filter:blur(120px); opacity:0.16; pointer-events:none; }
        .dok-inner { position:relative; z-index:1; display:grid; grid-template-columns:1fr 340px; gap:44px; align-items:center; }
        .dok-list { list-style:none; display:grid; gap:9px; }
        .dok-list li { color:rgba(255,255,255,0.7); font-size:13.5px; line-height:1.6;
          padding-left:22px; position:relative; }
        .dok-list li:before { content:'✓'; position:absolute; left:0; color:#02C39A; font-weight:800; }
        .dok-mock { background:rgba(255,255,255,0.05); border:1px solid rgba(2,195,154,0.22);
          border-radius:16px; overflow:hidden; }
        .dok-mock-bar { display:flex; align-items:center; gap:5px; padding:11px 14px;
          background:rgba(255,255,255,0.05); border-bottom:1px solid rgba(2,195,154,0.16); }
        .dok-mock-bar i { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.2); }
        .dok-mock-bar span { margin-left:8px; color:rgba(255,255,255,0.45); font-size:10.5px; }
        .dok-mock-body { padding:14px; }
        .dok-lab { display:flex; justify-content:space-between; align-items:center; padding:8px 0;
          border-bottom:1px solid rgba(255,255,255,0.06); }
        .dok-lab span { color:rgba(255,255,255,0.55); font-size:12.5px; }
        .dok-lab b { color:#FF8A80; font-size:12.5px; font-variant-numeric:tabular-nums; }
        .dok-flag { background:rgba(255,138,128,0.1); border:1px solid rgba(255,138,128,0.28);
          border-radius:10px; padding:11px 12px; margin-top:12px; }
        .dok-flag div { color:#FFB4AC; font-size:12px; font-weight:700; margin-bottom:5px; }
        .dok-flag p { color:rgba(255,255,255,0.5); font-size:11px; line-height:1.55; }
        .dok-code { display:flex; align-items:center; gap:9px; margin-top:12px; padding-top:12px;
          border-top:1px solid rgba(255,255,255,0.06); }
        .dok-code span { color:rgba(255,255,255,0.35); font-size:10px; font-weight:800; letter-spacing:1.1; }
        .dok-code b { color:#02C39A; font-size:15px; }
        .dok-code i { color:rgba(255,255,255,0.45); font-size:11.5px; font-style:normal; }

        /* ── platform picker ── */
        .pick { display:grid; grid-template-columns:1fr 400px; gap:22px; align-items:start; }
        .pick-rail { background:#fff; border:1px solid rgba(1,115,103,0.14); border-radius:20px; padding:20px 18px; }
        .pick-head { display:grid; grid-template-columns:1fr 88px 88px; gap:14px; padding:0 12px 12px;
          font-size:9px; font-weight:800; letter-spacing:1.3; color:#6B8078; }
        .pick-head span:first-child { color:#017367; }
        .pick-head span:last-child { color:#017367; }
        .pick-row { display:grid; grid-template-columns:1fr 88px 88px; gap:14px; align-items:center;
          width:100%; text-align:left; background:transparent; border:1px solid transparent;
          border-radius:12px; padding:12px; cursor:pointer; font-family:inherit; transition:all .16s; }
        .pick-row:hover { background:#F9F5EE; }
        .pick-row.on { background:#F9F5EE; border-color:rgba(2,195,154,0.4); }
        .pick-l i { display:block; font-style:normal; font-size:9px; font-weight:800; letter-spacing:1.2;
          color:#02C39A; margin-bottom:3px; }
        .pick-l b { display:block; font-size:16px; font-weight:700; color:#0F1F1C; }
        .pick-bar em { display:block; height:9px; border-radius:5px; transform:scaleX(0); transform-origin:left center; }
        .pick-bar.market em { background:#EDE8DF; width:46%; box-shadow:inset 0 0 0 1px rgba(0,0,0,0.05); }
        .pick.run .pick-bar.market em { animation: barIn .45s calc(.1s + var(--i) * .07s) forwards ease-out; }
        .pick-bar.us em { background:linear-gradient(90deg,#017367,#02C39A); width:100%; }
        .pick.run .pick-bar.us em { animation: barIn .5s calc(.4s + var(--i) * .09s) forwards ease-out; }
        .pick-panel { background:linear-gradient(150deg,#0F1F1C,#024D42); border-radius:20px;
          padding:30px 28px; position:sticky; top:90px; animation: tracIn .32s ease-out; }

        /* ── crew ── */
        .crew { display:grid; grid-template-columns:repeat(auto-fill,minmax(268px,1fr)); gap:10px; }
        .crew-c { display:flex; gap:12px; align-items:flex-start; padding:14px 15px;
          background:rgba(255,255,255,0.035); border:1px solid rgba(2,195,154,0.16);
          border-radius:14px; transition:transform .18s, border-color .18s, background .18s; }
        .crew-c:hover { transform:translateY(-2px); border-color:rgba(2,195,154,0.45);
          background:rgba(2,195,154,0.07); }
        .crew-c.open { border-style:dashed; border-color:rgba(255,255,255,0.18); background:transparent; }
        .crew-c.open:hover { border-color:rgba(2,195,154,0.5); }
        .crew-av { flex:none; width:34px; height:34px; border-radius:10px;
          background:rgba(2,195,154,0.16); color:#5DE0C0; font-size:12px; font-weight:800;
          display:flex; align-items:center; justify-content:center; letter-spacing:.5px; }
        .crew-c.open .crew-av { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.4);
          font-size:17px; font-weight:400; }
        .crew-c b { display:block; color:#fff; font-size:13.5px; font-weight:700; line-height:1.3; }
        .crew-c i { display:block; font-style:normal; color:#02C39A; font-size:10.5px;
          font-weight:700; letter-spacing:.5px; margin:3px 0 6px; }
        .crew-c.open i { color:rgba(255,255,255,0.35); }
        .crew-c p { color:rgba(255,255,255,0.5); font-size:12px; line-height:1.6; }

        /* ── sovereign model band ── */
        .sov { margin-top:44px; display:grid; grid-template-columns:1fr 300px; gap:32px;
          align-items:center; background:linear-gradient(135deg,rgba(2,195,154,0.1),rgba(2,195,154,0.03));
          border:1px solid rgba(2,195,154,0.3); border-radius:20px; padding:28px 30px; }
        .sov-tag { display:inline-flex; align-items:center; gap:8px; color:#02C39A;
          font-size:10px; font-weight:800; letter-spacing:1.4px; margin-bottom:12px; }
        .sov-dot { width:6px; height:6px; border-radius:50%; background:#02C39A;
          animation:promoPulse 1.8s infinite; }
        @keyframes promoPulse { 0%,100%{opacity:1} 50%{opacity:.25} }
        .sov-r { display:grid; gap:9px; }
        .sov-chip { background:rgba(0,0,0,0.22); border:1px solid rgba(2,195,154,0.22);
          border-radius:12px; padding:11px 14px; }
        .sov-chip b { display:block; color:#5DE0C0; font-size:13px; font-weight:800; margin-bottom:3px; }
        .sov-chip span { color:rgba(255,255,255,0.48); font-size:11.5px; line-height:1.55; }

        @media (max-width: 980px) {
          .node-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .node-head { display: none !important; }
          .node-market { border-left: none !important; padding-left: 0 !important;
                         border-top: 1px solid rgba(0,0,0,0.08); padding-top: 12px !important; }
          .fly-row, .sov { grid-template-columns: 1fr !important; }
          .casc { grid-template-columns: 1fr !important; }
          .dash-head { grid-template-columns: 1fr !important; gap: 30px !important; }
          .dok-inner { grid-template-columns: 1fr !important; }
          .brand-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .pick { grid-template-columns: 1fr !important; }
          .pick-panel { position:static !important; }
        }
        @media (max-width: 720px) {
          .cont-track { grid-template-columns:repeat(2,1fr); gap:26px 12px; }
          .cont-rail, .cont-fill, .cont-pulse { display:none; }
          .span-head { grid-template-columns:88px 1fr 1fr; gap:10px; font-size:8.5px; }
          .span-grid { grid-template-columns:88px 1fr 1fr; gap:14px 10px; }
          .span-spine { display:none; }
          .casc-row { grid-template-columns:16px 1fr; gap:14px; }
          .casc-val { grid-column:2; text-align:left; padding-top:10px; }
          .dash-kpis { grid-template-columns:repeat(2,1fr); }
          .dok-card { padding:30px 24px; }
          .brand-word { font-size:36px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cont-fill { width:88% !important; }
          .cont-pulse { display:none !important; }
          .cont-node, .fly-lab, .fly-hub { opacity:1 !important; transform:none !important; }
          .span-rival span, .span-us span { transform:scaleX(1) !important; }
          .span-spine-fill { height:100% !important; }
          .fly-arc { stroke-dashoffset:0 !important; }
          .continuum.run *, .span-wrap.run *, .fly.run *, .casc.run *, .epi.run * { animation:none !important; }
          .casc-row, .epi-area, .epi-thr, .epi-thr-l, .epi-band { opacity:1 !important; transform:none !important; }
          .casc-spine-fill { height:100% !important; }
          .epi-line { stroke-dashoffset:0 !important; }
          .trac-panel, .pick-panel { animation:none !important; }
          .pick-bar em { transform:scaleX(1) !important; }
        }
      `}</style>
      <Hero t={t} />
      <BrandStory t={t} />
      <Platform t={t} />
      <Engine t={t} />
      <DokSpotlight t={t} />
      <Proof t={t} />
      <Close t={t} />
    </>
  );
}
