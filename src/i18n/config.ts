import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import zhTranslation from "./locales/zh/translation.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const STORAGE_KEY = "flibit-language";

function detectInitialLanguage(): LanguageCode {
  const isBrowser =
    typeof window !== "undefined" &&
    typeof window.location !== "undefined" &&
    typeof localStorage !== "undefined" &&
    typeof navigator !== "undefined";

  if (!isBrowser) {
    return "en";
  }

  // 1. URL Path priority
  const pathLang = window.location.pathname.split("/")[1];
  if (pathLang === "zh") {
    return "zh";
  }
  if (pathLang) {
    return "en";
  }

  // 2. Local Storage
  const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
    return saved;
  }
  
  // 3. Browser Language
  const browserLang = navigator.language.split("-")[0] as LanguageCode;
  if (SUPPORTED_LANGUAGES.some((l) => l.code === browserLang)) {
    return browserLang;
  }
  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    zh: { translation: zhTranslation },
  },
  lng: detectInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { STORAGE_KEY };
export default i18n;
