import { VueConstructor } from "vue";
import VueI18n from "vue-i18n";
import enUS from "@/locale/en-US.json";
import frFR from "@/locale/fr-FR.json";
import enLocale from "element-ui/lib/locale/lang/en";
import frLocale from "element-ui/lib/locale/lang/fr";

// TODO: Use config options

export const LS_LANGUAGE_KEY = 'i18n-language';
export const fallbackLocale = 'en';
export const locale = localStorage.getItem(LS_LANGUAGE_KEY) ? localStorage.getItem(LS_LANGUAGE_KEY) : fallbackLocale;

export const i18n = (Vue: VueConstructor) => {
  Vue.use(VueI18n);

  const messages = {
    en: { ...enUS, ...enLocale },
    fr: { ...frFR, ...frLocale }
  };

  return new VueI18n({ locale: locale!, fallbackLocale, messages })
};
