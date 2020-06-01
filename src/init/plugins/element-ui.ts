import { VueConstructor } from "vue";
import Element from "element-ui";
import VueI18n from "vue-i18n";

export const installElementUi = (Vue: VueConstructor, i18n: VueI18n) => {
  Vue.use(Element, {
    i18n: (key: string, value: string) => i18n.t(key, value)
  });
};
