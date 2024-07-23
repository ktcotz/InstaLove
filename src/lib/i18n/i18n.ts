import i18next from "i18next";
import * as englishTranslation from "./locales/en/en.json";
import * as polishTranslation from "./locales/pl/pl.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: englishTranslation,
  },
  pl: {
    translation: polishTranslation,
  },
} as const;

export const defaultNS = "translation";
export const defaultLanguage = "pl";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    lng: defaultLanguage,
    supportedLngs: ["en", "pl"],
  });

export default i18next;
