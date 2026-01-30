"use client";

import Link from "next/link";
import { LanguagePill } from "@/components/sahaibat/LanguagePill";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900" aria-hidden />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{t("brand.name")}</div>
            <div className="text-xs text-slate-500">{t("brand.tagline")}</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/partner" className="hidden text-sm text-slate-600 hover:text-slate-900 sm:block">
            {t("nav.partner")}
          </Link>
          <LanguagePill />
        </div>
      </div>
    </header>
  );
}
