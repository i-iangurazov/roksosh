// components/LanguageSwitcher.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import US from "country-flag-icons/react/3x2/US";
import KG from "country-flag-icons/react/3x2/KG";
import RU from "country-flag-icons/react/3x2/RU";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "./ui/select"; // or "@/components/ui/select" if alias is set

const locales = [
  { lang: "en", Flag: US, label: "English" },
  { lang: "ru", Flag: RU, label: "Русский" },
  { lang: "kg", Flag: KG, label: "Кыргызча" }
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string>("en");

  useEffect(() => {
    const langFromCookie = getCookie("x-locale") as string | undefined;
    if (langFromCookie) {
      setSelectedLang(langFromCookie);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setCookie("x-locale", lang);
    setSelectedLang(lang);
    window.location.reload();
  };

  const selectedLocale = useMemo(
    () => locales.find((l) => l.lang === selectedLang) ?? locales[0],
    [selectedLang]
  );

  return (
    <div className="inline-block">
      <Select value={selectedLang} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[130px] justify-between">
          <div className="flex items-center gap-2">
            <selectedLocale.Flag
              title={selectedLocale.label}
              className="h-4 w-6"
            />
            <span>{selectedLocale.label}</span>
          </div>
          {/* default chevron from shadcn trigger will stay on the right */}
        </SelectTrigger>

        <SelectContent>
          {locales.map(({ lang, Flag, label }) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center gap-2">
                <Flag title={label} className="h-4 w-6" />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
