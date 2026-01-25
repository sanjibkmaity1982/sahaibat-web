"use client";

import type { Lang } from "@/lib/sahaibat/i18n";
import { LANG_LABEL } from "@/lib/sahaibat/i18n";
import { useI18n } from "@/components/sahaibat/LanguageProvider";

const options: Lang[] = ["id", "en", "fr"];

export function LanguagePill() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full border bg-white p-1">
      {options.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50",
            ].join(" ")}
            aria-pressed={active}
            aria-label={`Language: ${LANG_LABEL[l]}`}
          >
            {LANG_LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
