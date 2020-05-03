import { VueConstructor } from "vue";
import Element from "element-ui";

import "@/styles/theme.scss"

export const configureElementUi = (Vue: VueConstructor) => {
  Vue.use(Element);
};
