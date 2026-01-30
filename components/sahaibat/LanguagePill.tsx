"use client";

import { LANG_LABEL, Lang } from "@/lib/sahaibat/i18n";
import { useI18n } from "./LanguageProvider";

export function LanguagePill() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex gap-1 rounded-full border p-1">
      {Object.keys(LANG_LABEL).map((l) => (
        <button
          key={l}
          onClick={() => {
            setLang(l);
            localStorage.setItem("lang", l);
          }}
          className={`px-3 py-1 text-xs rounded-full ${
            lang === l ? "bg-black text-white" : "text-slate-600"
          }`}
        >
          {LANG_LABEL[l as Lang]}
        </button>
      ))}
    </div>
  );
}
