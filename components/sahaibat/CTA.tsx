import Link from "next/link";

export function CTA({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border bg-slate-900 p-8 text-white">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="mt-2 max-w-2xl text-white/80">{subtitle}</div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90"
        >
          Book a demo
        </Link>
        <Link
          href="/scenarios"
          className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10"
        >
          Explore scenarios
        </Link>
      </div>
    </div>
  );
}

