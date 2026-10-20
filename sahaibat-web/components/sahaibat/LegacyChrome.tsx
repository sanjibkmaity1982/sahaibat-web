"use client";

// The redesigned pages carry their own nav and footer; the older pages keep
// the shared SiteNav / PromoRibbon / SiteFooter until they are redesigned too.

import { usePathname } from "next/navigation";

export const REDESIGN_PATHS = new Set(["/", "/en", "/id", "/impact", "/id/impact"]);

export function LegacyChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (REDESIGN_PATHS.has(pathname)) return null;
  return <>{children}</>;
}
