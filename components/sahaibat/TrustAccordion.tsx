"use client";

import { useState } from "react";
import { trust } from "@/lib/sahaibat/content";

export function TrustAccordion() {
  const [open, setOpen] = useState<string>(trust[0]?.q ?? "");

  return (
    <div className="rounded-3xl border bg-white p-6">
      <div className="grid gap-3">
        {trust.map((t) => {
          const isOpen = open === t.q;
          return (
            <div key={t.q} className="rounded-2xl border">
              <button
                onClick={() => setOpen(isOpen ? "" : t.q)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <div className="text-sm font-semibold">{t.q}</div>
                <div className="text-slate-500">{isOpen ? "–" : "+"}</div>
              </button>
              {isOpen ? (
                <div className="px-5 pb-5 text-sm text-slate-600">{t.a}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

