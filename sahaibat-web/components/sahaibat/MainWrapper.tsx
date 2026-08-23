"use client";
import { usePathname } from "next/navigation";

// Rich marketing pages own their section-by-section width (via .section-max)
// and go full-bleed edge to edge. Plain content pages (legal, forms) get a
// simple centered container.
const FULL_BLEED_PATHS = new Set(["/", "/en", "/enterprise"]);

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (FULL_BLEED_PATHS.has(pathname)) return <>{children}</>;
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      {children}
    </main>
  );
}
