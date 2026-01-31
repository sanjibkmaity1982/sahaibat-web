"use client";

import Link from "next/link";
import { LanguagePill } from "@/components/sahaibat/LanguagePill";
import { useI18n } from "@/components/sahaibat/LanguageProvider";
import Image from "next/image";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
             <Image
  src="/images/logo-horizontal@2x.png"
  alt="SahAIbat"
  width={160}
  height={64}
  className="h-7 w-auto md:h-8"
/>

        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/partner"
            className="hidden text-sm text-slate-600 hover:text-slate-900 sm:block"
          >
            {t("nav.partner")}
          </Link>
          <LanguagePill />
        </div>
      </div>
    </header>
  );
}
