"use client";

// The redesigned pages carry their own nav and footer; the older pages keep
// the shared SiteNav / PromoRibbon / SiteFooter until they are redesigned too.

import { usePathname } from "next/navigation";

export const REDESIGN_PATHS = new Set(["/", "/en", "/impact", "/en/impact", "/privacy", "/en/privacy", "/terms", "/en/terms"]);

export function LegacyChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (REDESIGN_PATHS.has(pathname)) return null;
  return <>{children}</>;
}
