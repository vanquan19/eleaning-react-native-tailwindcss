// i18n/index.js
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "~/locales/en.json";
import vi from "~/locales/vi.json";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode || "en",
  fallbackLng: "vi",

  interpolation: {
    escapeValue: false,
  },

  debug: __DEV__,
});

export default i18n;
