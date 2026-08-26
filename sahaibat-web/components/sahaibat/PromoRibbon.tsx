"use client";

// components/sahaibat/PromoRibbon.tsx
//
// Site-wide promo for SahAIbat DOK — the one layer of the platform that is
// commercially live, so it is the one worth a permanent ribbon.
//
// The line corrects itself in front of the reader: "Indonesia's Clinical
// Scribe" is struck through on "Clinical" and replaced with "Intelligent".
// That is the same move the DOK homepage hero makes, deliberately — a visitor
// who follows this ribbon should recognise the argument when they land.
//
// It plays ONCE. A strikethrough looping on every page of a corporate site
// stops being a message and becomes a distraction.

import { useI18n } from "@/components/sahaibat/LanguageProvider";

const DOK_URL = "https://www.sahaibatdok.com";

export function PromoRibbon() {
  const { lang } = useI18n();
  const id = lang === "id";

  return (
    <div className="promo">
      <span className="promo-sheen" aria-hidden />
      <div className="promo-in">
        <span className="promo-badge">
          <i className="promo-dot" aria-hidden />
          {id ? "AKTIF" : "LIVE"}
        </span>
        <span className="promo-brand">SahAIbat DOK</span>
        <span className="promo-sep" aria-hidden>·</span>

        {/* The sentence a screen reader gets is the corrected one, not the
            half-struck animation — aria-hidden on the discarded word. */}
        <span className="promo-line">
          {id ? "Scribe " : "Indonesia's "}
          <span className="promo-strike" aria-hidden>{id ? "Klinis" : "Clinical"}</span>
          <span className="promo-new">{id ? "Cerdas" : "Intelligent"}</span>
          {id ? " Indonesia untuk dokter" : " Scribe for doctors"}
        </span>

        <a className="promo-cta" href={DOK_URL} target="_blank" rel="noopener noreferrer">
          {id ? "Coba sekarang" : "Try now"} <span aria-hidden>→</span>
        </a>
        <a className="promo-more" href={DOK_URL} target="_blank" rel="noopener noreferrer">
          {id ? "Pelajari" : "Learn more"}
        </a>
      </div>

      <style>{`
        /* Bright bar against a dark hero. The previous version was low-contrast
           grey on near-black and read as chrome rather than an announcement. */
        .promo { background:linear-gradient(90deg,#02C39A,#5DE0C0 46%,#02C39A);
          position:relative; z-index:60; overflow:hidden;
          box-shadow:0 2px 14px rgba(2,195,154,0.35); }
        .promo-sheen { position:absolute; top:0; bottom:0; width:38%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);
          transform:translateX(-140%); animation:promoSheen 5.5s 3.4s infinite ease-in-out;
          pointer-events:none; }
        @keyframes promoSheen { 0%{transform:translateX(-140%)} 55%,100%{transform:translateX(360%)} }
        .promo-in { max-width:1200px; margin:0 auto; padding:10px 24px; position:relative; z-index:1;
          display:flex; align-items:center; gap:11px; flex-wrap:wrap;
          font-size:14px; line-height:1.4; font-weight:600; }
        .promo-badge { display:inline-flex; align-items:center; gap:6px; flex:none;
          background:#0F1F1C; color:#5DE0C0; font-size:10px; font-weight:800;
          letter-spacing:1.3px; padding:4px 10px; border-radius:6px; }
        .promo-dot { width:5px; height:5px; border-radius:50%; background:#5DE0C0;
          flex:none; animation:promoPulse 1.6s infinite; }
        @keyframes promoPulse { 0%,100%{opacity:1} 50%{opacity:.25} }
        .promo-brand { color:#062B24; font-weight:800; letter-spacing:-0.01em; }
        .promo-sep { color:rgba(6,43,36,0.35); }
        .promo-line { color:#0B3A31; font-weight:600; }

        /* the correction: strike the word, then collapse it away */
        .promo-strike { position:relative; color:rgba(6,43,36,0.55);
          display:inline-block; white-space:nowrap;
          animation:promoOut .5s 2.5s forwards cubic-bezier(.4,0,.6,1); }
        .promo-strike:after { content:''; position:absolute; left:-2px; top:52%;
          height:2px; width:0; background:#C4321B; border-radius:2px;
          animation:promoCut .45s 1.5s forwards; }
        @keyframes promoCut { to { width:calc(100% + 4px) } }
        @keyframes promoOut {
          to { opacity:0; max-width:0; margin-right:0; letter-spacing:-.5em; }
        }
        .promo-new { color:#062B24; font-weight:800; opacity:0;
          animation:promoIn .45s 2.85s forwards; }
        @keyframes promoIn { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:none } }

        .promo-cta { margin-left:auto; background:#0F1F1C; color:#5DE0C0;
          font-weight:800; font-size:13px; padding:7px 18px; border-radius:999px;
          text-decoration:none; white-space:nowrap; transition:transform .16s, box-shadow .16s;
          box-shadow:0 2px 10px rgba(6,43,36,0.25); }
        .promo-cta:hover { transform:translateY(-1px); box-shadow:0 5px 16px rgba(6,43,36,0.35); }
        .promo-more { color:#0B3A31; font-size:13px; font-weight:700; text-decoration:none;
          border-bottom:1.5px solid rgba(6,43,36,0.35); white-space:nowrap; }
        .promo-more:hover { border-bottom-color:#0F1F1C; }

        @media (max-width:780px) {
          .promo-in { font-size:12px; gap:8px; padding:8px 16px; }
          .promo-cta { margin-left:0; }
          .promo-sep, .promo-more { display:none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .promo-dot, .promo-strike, .promo-strike:after, .promo-sheen { animation:none !important; }
          .promo-sheen { display:none; }
          .promo-strike { display:none; }
          .promo-new { opacity:1 !important; animation:none !important; }
        }
      `}</style>
    </div>
  );
}
