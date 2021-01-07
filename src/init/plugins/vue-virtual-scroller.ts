import { VueConstructor } from "vue";
import VueVirtualScroller from "vue-virtual-scroller";

export const installVueVirtualScroller = (Vue: VueConstructor) => {
  Vue.use(VueVirtualScroller)
};
