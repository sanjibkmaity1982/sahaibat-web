"use client";

import Link from "next/link";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">{t("brand.name")}</div>
            <div className="mt-1 text-xs text-slate-500">{t("disclaimer")}</div>
          </div>

          <div className="flex gap-4 text-sm">
            <Link className="text-slate-600 hover:text-slate-900" href="/">
              Home
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/partner">
              {t("nav.partner")}
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-400">© {new Date().getFullYear()} SahAIbat</div>
      </div>
    </footer>
  );
}
