"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales, type Locale, defaultLocale } from "@/lib/i18n";

const STORAGE_KEY = "app-locale";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.some((l) => l.code === stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  return { locale, setLocale };
}

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <Languages className="size-4 text-muted-foreground" />
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {locales.map((l) => (
            <SelectItem key={l.code} value={l.code}>
              {l.native}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
