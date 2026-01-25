"use client";

import { useMemo, useState } from "react";
import type { RoleKey } from "@/lib/sahaibat/types";
import { roleValue } from "@/lib/sahaibat/content";

const tabs: { key: RoleKey; label: string }[] = [
  { key: "chw", label: "CHW / Kader" },
  { key: "reviewer", label: "Nurse / Doctor" },
  { key: "ngo", label: "NGO / Program" },
];

export function RoleToggle() {
  const [role, setRole] = useState<RoleKey>("chw");

  const data = useMemo(() => roleValue[role], [role]);

  return (
    <div className="rounded-3xl border bg-white p-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = t.key === role;
          return (
            <button
              key={t.key}
              onClick={() => setRole(t.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active
                  ? "bg-slate-900 text-white"
                  : "border bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold">{data.title}</div>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {data.bullets.map((b) => (
            <li key={b} className="rounded-2xl border bg-slate-50 p-4 text-sm">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
