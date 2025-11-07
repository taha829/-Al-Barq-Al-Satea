import { useLanguage } from "@/contexts/LanguageContext";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";

type TranslationKey = keyof typeof en;

export const useTranslation = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  const t = (key: string, params?: Record<string, unknown>): string => {
    const keys = key.split(".");
    let value: unknown = translations as unknown;

    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value !== "string") return key;

    const str = value as string;
    if (!params) return str;

    // Simple interpolation: replace {name} tokens with params[name]
    return str.replace(/\{(\w+)\}/g, (_, p1) => {
      const v = params[p1];
      return v !== undefined ? String(v) : `{${p1}}`;
    });
  };

  const isRTL = language === "ar";

  return { t, language, isRTL };
};
