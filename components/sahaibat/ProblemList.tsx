import { problems } from "@/lib/sahaibat/content";

export function ProblemList() {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {problems.map((p) => (
        <li key={p} className="rounded-2xl border bg-white p-5 text-sm">
          <span className="mr-2">•</span>
          <span className="text-slate-700">{p}</span>
        </li>
      ))}
    </ul>
  );
}

