import Vue from "vue";
import firebase from "firebase";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: any;
    $isGranted: (role: number) => boolean;
    $perf: any;
    $httpsCallableFunction: (
      name: string,
      query?: { [key: string]: string | number },
      data?: any
    ) => Promise<firebase.functions.HttpsCallableResult>;
  }
}
