import { AnyObject } from "@/types";
import { store } from "@/store";
import { userStore } from "@/store/user";

export const configureStore = (appStore: AnyObject) => {
  appStore.registerModule("maestro", store);
  appStore.registerModule("user", userStore);
};
