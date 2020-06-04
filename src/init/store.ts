import { AnyObject } from "@/types";
import { userStore } from "@/store/user";
import { VueConstructor } from "vue";

export const configureStore = (Vue: VueConstructor, appStore: AnyObject) => {
  appStore.registerModule("m-user", userStore);
  Vue.prototype.$isGranted = function(role: number) {
    return this.$store.getters.user?.role?.code >= role;
  };
};
