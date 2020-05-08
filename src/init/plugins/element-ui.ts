import { VueConstructor } from "vue";
import Element from "element-ui";

export const installElementUi = (Vue: VueConstructor, theme?: NodeRequire) => {
  if (!theme) import("@/styles/theme/index.scss")
  Vue.use(Element);
};
