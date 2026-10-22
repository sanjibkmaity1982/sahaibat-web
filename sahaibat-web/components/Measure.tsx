"use client";

// Aggregate, cookieless measurement (see app/api/m). Sends one "view" per page
// with the referring site, and one "dok_click" when a visitor follows a link to
// sahaibatdok.com. DOK links get utm parameters so the DOK site can attribute
// sign-ups to the page they came from. Honours Do Not Track and Global
// Privacy Control.

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const optedOut = () =>
  typeof navigator !== "undefined" &&
  (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);

function send(e: string, p: string, r?: string, u?: string) {
  if (optedOut()) return;
  const body = JSON.stringify({ e, p, r, u });
  try {
    if (!navigator.sendBeacon?.("/api/m", new Blob([body], { type: "text/plain" }))) {
      fetch("/api/m", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {}
}

let firstView = true;

export function Measure() {
  const pathname = usePathname();

  useEffect(() => {
    // Only the first page of a visit carries the outside referrer.
    const ref = firstView ? document.referrer || undefined : location.origin;
    const utm = firstView ? new URLSearchParams(location.search).get("utm_source") ?? undefined : undefined;
    firstView = false;
    send("view", pathname, ref, utm);
  }, [pathname]);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (!/(^|\.)sahaibatdok\.com$/.test(url.hostname)) return;
      if (!url.searchParams.has("utm_source")) {
        url.searchParams.set("utm_source", "sahaibat.com");
        url.searchParams.set("utm_medium", "website");
        url.searchParams.set("utm_campaign", location.pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home");
        a.href = url.href;
      }
      send("dok_click", location.pathname);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
