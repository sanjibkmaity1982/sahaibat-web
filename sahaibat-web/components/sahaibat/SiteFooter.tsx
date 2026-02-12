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

          {/* Top footer nav */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link className="text-slate-600 hover:text-slate-900" href="/">
              Home
            </Link>

            <Link className="text-slate-600 hover:text-slate-900" href="/partner">
              {t("nav.partner")}
            </Link>

            {/* Legal links */}
            <Link className="text-slate-600 hover:text-slate-900" href="/privacy">
              {t("legal.privacy")}
            </Link>

            <Link className="text-slate-600 hover:text-slate-900" href="/terms">
              {t("legal.terms")}
            </Link>

            <Link className="text-slate-600 hover:text-slate-900" href="/contact">
              {t("legal.contact")}
            </Link>
          </div>
        </div>

        {/* Bottom footer meta */}
        <div className="mt-6 space-y-2 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} SahAIbat</div>

          <div>
            SahAIbat is developed by{" "}
            <span className="font-medium text-slate-500">
              11679210 Canada Inc.
            </span>
          </div>

          <div>
            Visit{" "}
            <a
              href="https://www.viantra.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-500"
            >
              www.viantra.co
            </a>{" "}
            for more details.
          </div>

          <div className="flex items-center gap-1">
            <span>🇨🇦</span>
            <span>Made proudly in Canada.</span>
          </div>

          {/* Social media links */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-slate-400">
            <a
              href="https://www.facebook.com/sahaibat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-500"
            >
              <span>📘</span>
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/sahaibat-health"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-500"
            >
              <span>📷</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
