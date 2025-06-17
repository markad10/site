import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  scrolled: boolean;
}

export default function LanguageSwitcher({ scrolled }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();

  const buttonClasses = scrolled
    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
    : "bg-white/20 hover:bg-white/30 text-white";
  
  return (
    <button
      onClick={toggleLanguage}
      className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out ${buttonClasses}`}
    >
      {language === "ar" ? "EN" : "عربي"}
    </button>
  );
}
