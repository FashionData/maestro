import { VueConstructor } from "vue";
import Element from "element-ui";
import { i18n } from "@/init/plugins/vue-i18n";

export const installElementUi = (Vue: VueConstructor) => {
  Vue.use(Element, {
    i18n: (key: string, value: string) => i18n(Vue).t(key, value)
  });
};
