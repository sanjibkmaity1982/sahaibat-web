"use client";

import { useMemo, useState } from "react";
import { scenarios } from "@/lib/sahaibat/content";

export function ScenarioCards() {
  const [active, setActive] = useState(scenarios[0]?.id ?? "");

  const selected = useMemo(
    () => scenarios.find((s) => s.id === active) ?? scenarios[0],
    [active]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-3">
        {scenarios.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={[
                "text-left rounded-2xl border p-5 transition",
                isActive ? "bg-slate-900 text-white" : "hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="text-sm font-semibold">{s.title}</div>
              <div className={["mt-1 text-sm", isActive ? "text-white/80" : "text-slate-600"].join(" ")}>
                {s.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border bg-white p-6">
        <div className="text-sm font-semibold">{selected.title}</div>
        <div className="mt-1 text-sm text-slate-600">{selected.subtitle}</div>

        <div className="mt-6 grid gap-4">
          <Block title="What the CHW captures" items={selected.chw} />
          <Block title="What the reviewer receives" items={selected.reviewer} />
          <Block title="What the patient sees next" items={selected.patient} />
        </div>
      </div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-2 grid gap-2">
        {items.map((i) => (
          <li key={i} className="text-sm text-slate-700">
            • {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

