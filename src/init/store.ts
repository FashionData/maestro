import { AnyObject } from "@/types";
import { userStore } from "@/store/user";
import { VueConstructor } from "vue";

export const MODULE_NAME = "m-user";

export const configureStore = (Vue: VueConstructor, appStore: AnyObject) => {
  appStore.registerModule(MODULE_NAME, userStore);
  Vue.prototype.$isGranted = function(role: number) {
    return this.$store.getters.user?.role?.code >= role;
  };
};
