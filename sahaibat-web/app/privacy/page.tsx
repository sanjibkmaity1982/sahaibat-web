"use client";

import Link from "next/link";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("legal.privacy.title")}
        </h1>
        <p className="mt-2 text-sm text-slate-600">{t("legal.privacy.updated")}</p>
      </header>

      <section className="space-y-4 text-slate-700 leading-7">
        <p>{t("legal.privacy.p1")}</p>
        <p>{t("legal.privacy.p2")}</p>
        <p>{t("legal.privacy.p3")}</p>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">{t("legal.appPolicyTitle")}</h2>
        <p className="mt-2 text-slate-700 leading-7">{t("legal.appPolicyText")}</p>
        <Link
          className="mt-3 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          href="https://app.sahaibat.com/privacy"
          target="_blank"
        >
          {t("legal.appPolicyLinkLabel")}
        </Link>
      </section>

      <section className="rounded-2xl border bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">{t("legal.websiteNoticeTitle")}</h2>
        <p className="mt-2 text-slate-700 leading-7">{t("legal.websiteNoticeText")}</p>
      </section>
    </main>
  );
}
