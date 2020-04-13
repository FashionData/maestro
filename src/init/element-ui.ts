import { VueConstructor } from "vue";
import Element from "element-ui";

export const configureElementUi = (Vue: VueConstructor) => {
  Vue.use(Element);

  // TODO: Check for fonts
  const head = document.head;
  const link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/element-ui/lib/theme-chalk/index.css";

  head.appendChild(link);
};
