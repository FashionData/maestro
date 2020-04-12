import { AnyObject } from "@/types";
import { store } from "@/store";

export const configureStore = (appStore: AnyObject) => {
  appStore.registerModule("maestro", store);
};
