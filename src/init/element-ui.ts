import { VueConstructor } from "vue";
import Element from "element-ui";

export const configureElementUi = (Vue: VueConstructor, theme?: string) => {
    if (!theme) {
      import("@/styles/theme.scss")
    }
  Vue.use(Element);
};
