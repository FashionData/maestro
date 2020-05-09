import { AnyObject } from "@/types";
import { userStore } from "@/store/user";

export const configureStore = (appStore: AnyObject) => {
  appStore.registerModule("m-user", userStore);
};
