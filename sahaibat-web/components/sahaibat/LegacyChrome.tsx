"use client";

// The redesigned pages carry their own nav and footer. Only the older pages
// (which now redirect to the new site, see next.config.ts) still use the
// shared SiteNav / PromoRibbon / SiteFooter.

import { usePathname } from "next/navigation";

const LEGACY_PREFIXES = ["/enterprise", "/technology", "/investors", "/partner", "/contact"];

export const isRedesignPath = (pathname: string) =>
  !LEGACY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export function LegacyChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isRedesignPath(pathname)) return null;
  return <>{children}</>;
}
