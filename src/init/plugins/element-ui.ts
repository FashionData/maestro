import { VueConstructor } from "vue";
import Element from "element-ui";

export const installElementUi = (Vue: VueConstructor) => {
  Vue.use(Element);
};
