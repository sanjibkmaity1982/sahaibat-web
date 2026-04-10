"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Homepage is fully self-contained — no wrapper constraints
  if (pathname === "/") return <>{children}</>;

  // All other pages get the standard max-width container
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      {children}
    </main>
  );
}
