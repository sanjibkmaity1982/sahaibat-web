"use client";
import { usePathname } from "next/navigation";

// All three homepage routes own their section-by-section width
// (/id was added later and missed this set, which boxed the Bahasa
// homepage inside the generic container).
// Only the homepage owns its section-by-section width (via .section-max) and
// goes full-bleed edge to edge. Every other page — including rich pages like
// /enterprise and /investors — gets the standard centered container, since
// their content has no internal max-width of its own.
const FULL_BLEED_PATHS = new Set(["/", "/en", "/id"]);

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (FULL_BLEED_PATHS.has(pathname)) return <>{children}</>;
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      {children}
    </main>
  );
}
