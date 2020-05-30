import { VueConstructor } from "vue";
import VueI18n from "vue-i18n";
import { I18nConfig } from "@/types";
import enUS from "@/locale/en-US.json";
import frFR from "@/locale/fr-FR.json";
import enLocale from "element-ui/lib/locale/lang/en";
import frLocale from "element-ui/lib/locale/lang/fr";

export const LS_LANGUAGE_KEY = 'i18n-language';
// TODO: Add custom fallbackLocale
// TODO: Move custom fallback into const and use i18n defaultLocale value into templates etc
export const fallbackLocale = 'en';
export const locale = localStorage.getItem(LS_LANGUAGE_KEY) ? localStorage.getItem(LS_LANGUAGE_KEY) : fallbackLocale;

export const i18n = (Vue: VueConstructor, i18nConfig: I18nConfig | undefined) => {
  Vue.use(VueI18n);

  const messages = {
    en: { ...enUS, ...i18nConfig?.en, ...enLocale },
    fr: { ...frFR, ...i18nConfig?.fr, ...frLocale }
  };

  return new VueI18n({ locale: locale!, fallbackLocale, messages })
};
