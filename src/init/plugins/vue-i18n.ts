import { VueConstructor } from "vue";
import VueI18n from "vue-i18n";
import merge from 'lodash.merge';
import { I18nConfig } from "@/types";
import enUS from "@/locale/en-US.json";
import frFR from "@/locale/fr-FR.json";
import enLocale from "element-ui/lib/locale/lang/en";
import frLocale from "element-ui/lib/locale/lang/fr";

export const LS_LANGUAGE_KEY = 'i18n-language';

export const i18n = (Vue: VueConstructor, i18nConfig: I18nConfig | undefined) => {
  Vue.use(VueI18n);

  const fallbackLocale = i18nConfig?.fallbackLocale || 'en';
  const locale = localStorage.getItem(LS_LANGUAGE_KEY) ? localStorage.getItem(LS_LANGUAGE_KEY) : fallbackLocale;
  const messages = {
    en: merge(enUS, i18nConfig?.en, enLocale),
    fr: merge(frFR, i18nConfig?.fr, frLocale),
  };

  return new VueI18n({ locale: locale!, fallbackLocale, messages })
};
