"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DICT, I18nKey, Lang } from "@/lib/sahaibat/i18n";

const Ctx = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const t = (key: I18nKey) => DICT[lang][key];

  return (
    <Ctx.Provider value={{ lang, setLang, t }}>
      {children}
    </Ctx.Provider>
  );
}

export const useI18n = () => useContext(Ctx);
