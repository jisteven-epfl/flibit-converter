/**
 * Initializes i18next with English translations for the test environment.
 * This must be imported before any component tests that use react-i18next.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../src/i18n/locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
