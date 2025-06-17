import { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.className = language === "ar" ? "font-tajawal" : "font-inter";
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
