"use client";

import { useI18n } from "@/components/sahaibat/LanguageProvider";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("legal.contact.title")}
        </h1>
      </header>

      <section className="space-y-4 text-slate-700 leading-7">
        <p>{t("legal.contact.p1")}</p>
        <p>
          <span className="font-semibold">{t("legal.contact.emailLabel")}:</span>{" "}
          {t("legal.contact.emailValue")}
        </p>
      </section>

      <section className="rounded-2xl border bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">{t("legal.websiteNoticeTitle")}</h2>
        <p className="mt-2 text-slate-700 leading-7">{t("legal.contact.indonesiaNote")}</p>
      </section>
    </main>
  );
}
