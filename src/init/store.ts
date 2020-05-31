import { AnyObject, User } from "@/types";
import { userStore } from "@/store/user";
import { VueConstructor } from "vue";

export const configureStore = (Vue: VueConstructor, appStore: AnyObject) => {
  appStore.registerModule("m-user", userStore);
  Vue.prototype.$isGranted = (role: number) => {
    return (userStore.state.user as User)?.role.code >= role;
  };
};
