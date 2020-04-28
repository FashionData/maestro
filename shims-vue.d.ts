import Vue from "vue";
import HttpsCallableResult = firebase.functions.HttpsCallableResult;
import { AnyObject } from "@/types";

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $httpsCallableFunction: (name: string, data: AnyObject) => Promise<HttpsCallableResult>;
  }
}
