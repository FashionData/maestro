import { VueConstructor } from "vue";
import VueI18n from "vue-i18n";
import enUS from "@/locale/en-US.json";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

export const i18n = (Vue: VueConstructor) => {
  Vue.use(VueI18n);

  const messages = {
    en: {
      ...enUS,
      ...enLocale
    },
    zh: {
      message: {
        hello: "你好"
      },
      ...zhLocale
    }
  };

  return new VueI18n({ locale: 'en', messages })
};
