import React from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, STORAGE_KEY, type LanguageCode } from "./i18n/config";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const handleChange = (lang: LanguageCode) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <div className="absolute top-4 left-4 flex items-center gap-1.5" aria-label={t("languageSwitcher.label")}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          aria-pressed={currentLang === lang.code}
          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors border ${
            currentLang === lang.code
              ? "bg-white/30 text-white border-white/40"
              : "bg-white/10 text-blue-100/80 border-white/10 hover:bg-white/20 hover:text-white"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
