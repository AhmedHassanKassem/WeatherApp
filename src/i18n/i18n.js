import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import translateEN from './locale/en.json'
import translateDE from './locale/de.json'
import { Suspense } from "react";



const resources = {
  en: {
    translation: translateEN
  },
  de: {
    translation: translateDE
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react : {
      Suspense : false
    }
  });

  export default i18n;