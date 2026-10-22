"use client";
import { usePathname } from "next/navigation";
import { isRedesignPath } from "@/components/sahaibat/LegacyChrome";

// Redesigned pages own their full-bleed layout; only the older pages get the
// generic centred container.

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isRedesignPath(pathname)) return <>{children}</>;
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      {children}
    </main>
  );
}
