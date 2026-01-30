"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export default function PartnerPage() {
  const { t } = useI18n();
  const [data, setData] = useState({
    org: "",
    country: "",
    region: "",
    focus: "",
    size: "",
    email: "",
    message: "",
  });

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`NGO Partnership Inquiry - ${data.org || "SahAIbat"}`);
    const body = encodeURIComponent(
      [
        `${t("partner.org")}: ${data.org}`,
        `${t("partner.country")}: ${data.country}`,
        `${t("partner.region")}: ${data.region}`,
        `${t("partner.focus")}: ${data.focus}`,
        `${t("partner.size")}: ${data.size}`,
        `${t("partner.email")}: ${data.email}`,
        ``,
        `${t("partner.message")}:`,
        data.message,
      ].join("\n")
    );
    return `mailto:admin@sahaibat.com?subject=${subject}&body=${body}`;
  }, [data, t]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-7">
        <h1 className="text-2xl font-semibold">{t("partner.pageTitle")}</h1>
        <p className="mt-2 text-slate-600">{t("partner.pageSubtitle")}</p>
        <p className="mt-4 text-xs text-slate-500">{t("disclaimer")}</p>
      </div>

      <div className="rounded-3xl border bg-slate-50 p-7">
        <div className="text-lg font-semibold">{t("partner.formTitle")}</div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label={t("partner.org")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.org}
              onChange={(e) => setData({ ...data, org: e.target.value })}
            />
          </Field>
          <Field label={t("partner.country")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
            />
          </Field>
          <Field label={t("partner.region")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.region}
              onChange={(e) => setData({ ...data, region: e.target.value })}
            />
          </Field>
          <Field label={t("partner.size")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.size}
              onChange={(e) => setData({ ...data, size: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4">
          <Field label={t("partner.focus")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.focus}
              onChange={(e) => setData({ ...data, focus: e.target.value })}
            />
          </Field>

          <Field label={t("partner.email")}>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Field>

          <Field label={t("partner.message")}>
            <textarea
              className="w-full rounded-xl border px-3 py-2"
              rows={5}
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={mailto}
            className="inline-flex justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t("partner.submit")}
          </a>

          <div className="text-sm text-slate-600">
            {t("partner.directEmail")}{" "}
            <a className="font-semibold text-slate-900 underline" href="mailto:admin@sahaibat.com">
              admin@sahaibat.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {children}
    </label>
  );
}
