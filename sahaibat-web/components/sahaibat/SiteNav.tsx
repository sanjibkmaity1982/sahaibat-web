"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/sahaibat/LanguageProvider";
import { C } from "@/lib/sahaibat/theme";

const LINKS: Array<{ href: string; en: string; id: string }> = [
  { href: "/#network", en: "How it works", id: "Cara kerja" },
  { href: "/technology", en: "Technology", id: "Teknologi" },
  { href: "/enterprise", en: "Enterprise", id: "Enterprise" },
  { href: "/partner", en: "Partner", id: "Mitra" },
];

// Pages that have real, separately-server-rendered EN/ID routes (better for
// SEO than client-side text swapping) — the language pill navigates instead
// of just flipping context state on these.
// English is the default at "/" — the primary reader of sahaibat.com is an
// investor or an enterprise buyer. Bahasa is a full peer site at "/id".
// "/en" is kept as an alias so existing links and indexed URLs do not break.
const ROUTE_PAIR: Record<string, { en: string; id: string }> = {
  "/": { en: "/", id: "/id" },
  "/id": { en: "/", id: "/id" },
  "/en": { en: "/", id: "/id" },
};

export function SiteNav() {
  const { lang, setLang } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const routedPair = ROUTE_PAIR[pathname];
  const activeLang: "en" | "id" = routedPair ? (pathname === "/id" ? "id" : "en") : (lang === "en" ? "en" : "id");

  const LangButtons = ({ onPick }: { onPick?: () => void }) => (
    <>
      {(["en", "id"] as const).map((l) => {
        const active = activeLang === l;
        const style: React.CSSProperties = {
          background: active ? C.teal : "transparent",
          color: active ? C.dark : "rgba(255,255,255,0.6)",
          border: "none",
          borderRadius: 16,
          padding: "4px 12px",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s",
        };
        if (routedPair) {
          return (
            <Link key={l} href={routedPair[l]} style={{ ...style, textDecoration: "none", display: "inline-block" }} onClick={onPick}>
              {l === "en" ? "EN" : "ID"}
            </Link>
          );
        }
        return (
          <button key={l} onClick={() => { setLang(l); onPick?.(); }} style={style}>
            {l === "en" ? "EN" : "ID"}
          </button>
        );
      })}
    </>
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(15,31,28,0.97)" : C.dark,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: "1px solid rgba(2,195,154,0.15)",
        transition: "all 0.3s",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/brand/wordmark-horizontal-dark.png" alt="SahAIbat" style={{ height: 32, width: "auto" }} />
        </Link>
        <div className="nav-desktop" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            >
              {activeLang === "en" ? l.en : l.id}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 3 }}>
            <LangButtons />
          </div>
          <a
            href="https://www.sahaibatdok.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: C.teal, color: C.dark, padding: "8px 20px", borderRadius: 20, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
          >
            {activeLang === "en" ? "Try DoK →" : "Coba DoK →"}
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{ background: "none", border: "none", color: C.white, fontSize: 24, cursor: "pointer" }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ background: C.dark, padding: "20px 24px", borderTop: "1px solid rgba(2,195,154,0.15)" }}>
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 3, width: "fit-content", marginBottom: 16 }}>
            <LangButtons onPick={() => setOpen(false)} />
          </div>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {activeLang === "en" ? l.en : l.id}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
