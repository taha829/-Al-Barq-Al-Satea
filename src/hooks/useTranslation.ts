import { useLanguage } from "@/contexts/LanguageContext";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";

type TranslationKey = keyof typeof en;

export const useTranslation = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, language };
};
