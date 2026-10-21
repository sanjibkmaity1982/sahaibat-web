"use client";

// components/redesign/RedesignPage.tsx
//
// Concept A ("At every stage of life, SahAIbat is there"), ported from the
// approved preview. The markup is rendered on the server, so every word is in
// the HTML for search engines and slow phones; engine.js then adds the
// language switch, guided demos, live mini experiences and the GSAP scroll
// storytelling. Both languages ship in the markup (<span lang>), and the
// .sb[data-l] attribute picks which one shows.

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARKUP } from "./markup";
import { initRedesign } from "./engine";
import "./redesign.css";

export type RedesignLang = "en" | "id";
export type RedesignView = "home" | "impact";

// Bahasa Indonesia is the default and owns the bare paths.
const PATHS: Record<RedesignLang, Record<RedesignView, string>> = {
  id: { home: "/", impact: "/impact" },
  en: { home: "/en", impact: "/en/impact" },
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Turnstile = {
  render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
  getResponse: (id: string) => string | undefined;
  reset: (id: string) => void;
};

function loadTurnstile(): Promise<Turnstile | null> {
  const w = window as unknown as { turnstile?: Turnstile };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve(w.turnstile ?? null);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
}

export function RedesignPage({ lang, view }: { lang: RedesignLang; view: RedesignView }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    Object.assign(window, { gsap, ScrollTrigger });

    let curLang = lang;
    let widget: string | null = null;
    let ts: Turnstile | null = null;

    const cleanup = initRedesign(root, {
      lang,
      view,
      onLang: (l: RedesignLang) => {
        curLang = l;
        window.history.replaceState(null, "", PATHS[l][view]);
        try {
          localStorage.setItem("sahaibat_lang", l);
        } catch {}
      },
      onView: (v: RedesignView, anchor: string | null) => {
        router.push(PATHS[curLang][v] + (anchor ?? ""));
      },
      onGate: async () => {
        if (!TURNSTILE_SITE_KEY || widget) return;
        ts = await loadTurnstile();
        const el = root.querySelector<HTMLElement>("#sbxTs");
        if (ts && el) {
          widget = ts.render(el, { sitekey: TURNSTILE_SITE_KEY, size: "flexible", appearance: "interaction-only" });
        }
      },
      // Tokens are single-use and take a moment to arrive after the widget is
      // rendered or reset, so wait for one (up to 8 s) instead of sending none.
      getToken: async () => {
        if (!TURNSTILE_SITE_KEY) return null;
        for (let i = 0; i < 40 && (!ts || !widget); i++) await new Promise((r) => setTimeout(r, 200));
        if (!ts || !widget) return null;
        let token = ts.getResponse(widget);
        for (let i = 0; i < 40 && !token; i++) {
          await new Promise((r) => setTimeout(r, 200));
          token = ts.getResponse(widget);
        }
        if (token) ts.reset(widget);
        return token ?? null;
      },
    });

    return () => {
      cleanup();
      // Fresh nodes drop every element listener engine.js attached.
      root.innerHTML = MARKUP;
    };
  }, [lang, view, router]);

  return (
    <div
      ref={ref}
      className="sb"
      data-l={lang}
      lang={lang}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: MARKUP }}
    />
  );
}
