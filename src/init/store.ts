import { AnyObject } from "@/types";
import { store } from "@/store";
import { userStore } from "@/store/user";

export const configureStore = (appStore: AnyObject) => {
  appStore.registerModule("m", store);
  appStore.registerModule("m-user", userStore);
};
