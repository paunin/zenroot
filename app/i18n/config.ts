import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import es from "./locales/es/common.json";
import fr from "./locales/fr/common.json";
import de from "./locales/de/common.json";
import ja from "./locales/ja/common.json";
import ru from "./locales/ru/common.json";
import zh from "./locales/zh/common.json";
import pt from "./locales/pt/common.json";
import ko from "./locales/ko/common.json";
import it from "./locales/it/common.json";

export const supportedLngs = ["en", "es", "fr", "de", "ja", "ru", "zh", "pt", "ko", "it"] as const;

export async function initI18n() {
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: en },
        es: { common: es },
        fr: { common: fr },
        de: { common: de },
        ja: { common: ja },
        ru: { common: ru },
        zh: { common: zh },
        pt: { common: pt },
        ko: { common: ko },
        it: { common: it },
      },
      supportedLngs: [...supportedLngs],
      fallbackLng: "en",
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["querystring", "localStorage", "navigator", "htmlTag"],
        lookupQuerystring: "lang",
        lookupLocalStorage: "zenrootLanguage",
        caches: ["localStorage"],
      },
    });

  return i18n;
}

export default i18n;
