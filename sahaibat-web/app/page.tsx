"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border bg-gradient-to-b from-slate-50 to-white p-7 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("hero.title")}
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">{t("hero.subtitle")}</p>

        <div className="mt-4 inline-flex rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-800">
          {t("hero.pill")}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/partner"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t("hero.ctaPrimary")}
          </Link>
          <a
            href="#story"
            className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            {t("hero.ctaSecondary")}
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
          <Image
            src="/images/hero-kader-family.png"
            alt="A Kader supporting a mother and child in a rural setting"
            width={1600}
            height={1000}
            className="h-[260px] w-full object-cover sm:h-[360px]"
            priority
          />
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="space-y-4">
        <Card title={t("story.whatTitle")} text={t("story.whatText")} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Card title={t("story.localTitle")} text={t("story.localText")} />
          <MediaCard
            image="/images/partnership.png"
            alt="Community partnership discussion in a rural setting"
            caption={t("story.partnerTitle")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MediaCard
            image="/images/doctor-nurse.png"
            alt="Nurse and doctor reviewing a clear summary"
            caption={t("story.reviewerTitle")}
          />
          <Card title={t("story.kaderTitle")} text={t("story.kaderText")} />
        </div>

        <Card title={t("story.partnerTitle")} text={t("story.partnerText")} />
      </section>

      {/* IMPACT */}
      <section className="rounded-3xl border bg-slate-900 p-7 text-white">
        <div className="text-xl font-semibold">{t("impact.title")}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[t("impact.item1"), t("impact.item2"), t("impact.item3")].map((x) => (
            <div key={x} className="rounded-2xl bg-white/10 p-4 text-sm">
              {x}
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="rounded-3xl border bg-white p-7">
        <div className="text-lg font-semibold">{t("brand.name")}</div>
        <p className="mt-2 text-slate-600">{t("disclaimer")}</p>

        <div className="mt-6 overflow-hidden rounded-2xl border">
          <Image
            src="/images/closing-hope.png"
            alt="A family walking together in a rural village at sunset"
            width={1600}
            height={1000}
            className="h-[240px] w-full object-cover sm:h-[320px]"
          />
        </div>

        <div className="mt-6">
          <Link
            href="/partner"
            className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t("hero.ctaPrimary")}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border bg-white p-6">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-3 text-slate-600">{text}</p>
    </div>
  );
}

function MediaCard({
  image,
  alt,
  caption,
}: {
  image: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white">
      <div className="relative h-[220px] w-full">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="text-sm font-semibold">{caption}</div>
      </div>
    </div>
  );
}
