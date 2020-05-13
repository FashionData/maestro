import Vue from "vue";
import firebase from "firebase";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: any;
    $perf: any;
    $httpsCallableFunction: (
      name: string,
      data: any
    ) => Promise<firebase.functions.HttpsCallableResult>;
  }
}
