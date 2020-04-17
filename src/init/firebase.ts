import { VueConstructor } from "vue";
import { AnyObject } from "@/types";

export const configureFirebase = (Vue: VueConstructor, firebase: AnyObject) => {
  Vue.prototype.$firebase = firebase;
};
