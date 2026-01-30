"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { I18nKey, Lang } from "@/lib/sahaibat/i18n";
import { DICT } from "@/lib/sahaibat/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: I18nKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("sahaibat_lang") as Lang | null;
    if (saved === "id" || saved === "en" || saved === "fr") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("sahaibat_lang", l);
  };

  const t = (k: I18nKey) => DICT[lang]?.[k] ?? DICT.en[k] ?? k;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
