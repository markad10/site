import { useLanguage } from "@/contexts/LanguageContext";
import { ar } from "@/translations/ar";
import { en } from "@/translations/en";

export function useTranslation() {
  const { language } = useLanguage();
  
  const translations = {
    ar,
    en,
  };

  const t = translations[language];

  return { t, language };
}
