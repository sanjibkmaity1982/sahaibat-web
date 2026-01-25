import { features } from "@/lib/sahaibat/content";

export function FeatureGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((f) => (
        <div key={f.title} className="rounded-2xl border p-6">
          <div className="text-sm font-semibold">{f.title}</div>
          <p className="mt-2 text-sm text-slate-600">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

