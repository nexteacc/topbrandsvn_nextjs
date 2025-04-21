import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from '../locales/zh.json';
import en from '../locales/en.json';
import ko from '../locales/ko.json';
import vi from '../locales/vi.json';
import ru from '../locales/ru.json';
import ja from '../locales/ja.json';
import zhTW from '../locales/zh-TW.json';


i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
    ko: { translation: ko },
    vi: { translation: vi },
    ru: { translation: ru },
    ja: { translation: ja },
    "zh-TW": { translation: zhTW },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
