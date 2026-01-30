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
        {/* Embedded storyline: why different + early triage */}
<SectionCard title="Why SahAIbat is different">
  <p>
    Most digital triage tools are designed for hospitals, apps, or
    high-connectivity settings.
  </p>
  <p>
    SahAIbat is designed for <span className="font-semibold text-slate-900">community-based care</span>,
    where decisions are made in villages, in small clinics, and often over WhatsApp — not dashboards.
  </p>
  <p className="font-semibold text-slate-900">Instead of trying to diagnose, SahAIbat focuses on safer decision timing:</p>
  <BulletList
    items={[
      "what should be checked now",
      "which signals should not be missed",
      "and when care should be escalated",
    ]}
  />
  <p>
    This makes SahAIbat easier to trust, easier to adopt, and safer to scale.
  </p>
</SectionCard>

<SectionCard title="Supporting early triage — for communities and patients">
  <p>
    SahAIbat supports <span className="font-semibold text-slate-900">early triage</span>, not diagnosis.
  </p>
  <p>
    Community health workers can use it to guide structured intake during visits.
  </p>
  <p>
    Patients and families can also use SahAIbat to describe symptoms clearly and receive calm,
    non-diagnostic guidance — helping them decide when to seek care.
  </p>
  <p>
    Every step is designed to <span className="font-semibold text-slate-900">support human judgment</span>, not replace it.
  </p>
</SectionCard>

      </section>

      function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border bg-white p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-3 space-y-3 text-slate-600">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((x) => (
        <li key={x} className="flex gap-2 text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900" />
          <span className="leading-relaxed">{x}</span>
        </li>
      ))}
    </ul>
  );
}


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

      {/* Embedded storyline: reporting + scope + strategic focus */}
<section className="space-y-4">
  <SectionCard title="Clear reporting, ready to integrate">
    <p>
      SahAIbat captures structured, anonymized insights that help programs understand what’s happening on the ground.
    </p>
    <BulletList
      items={[
        "program monitoring and learning",
        "reporting needs for partners and funders",
        "future integration with partner or regulatory systems when required",
      ]}
    />
    <p>
      The goal is not complexity — it’s <span className="font-semibold text-slate-900">clarity</span>.
    </p>
  </SectionCard>

  <SectionCard title="Designed for high-impact community health programs">
    <p>SahAIbat is well suited for programs that rely on structured symptom assessment, including:</p>
    <BulletList
      items={[
        "maternal & child health screening",
        "fever, dengue, and infectious disease follow-up",
        "TB and respiratory symptom screening",
        "chronic condition awareness (NCDs)",
        "general community health triage and referral support",
      ]}
    />
    <p>
      The system can be adapted over time to align with local guidelines and program needs.
    </p>
  </SectionCard>

  <SectionCard title="Built for programs working closest to the community">
    <p>SahAIbat is especially valuable for organizations that:</p>
    <BulletList
      items={[
        "support maternal & child health through community-based programs",
        "operate rural clinics transitioning from paper-based workflows",
        "coordinate community health worker networks already using WhatsApp",
        "run TB, dengue, malaria, or chronic disease screening initiatives",
      ]}
    />
    <p>
      These programs often carry the highest responsibility — and the least digital support.
      <span className="font-semibold text-slate-900"> SahAIbat exists to bridge that gap.</span>
    </p>
  </SectionCard>
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
