import Vue from "vue";
import VueMoment from "vue-moment";
import firebase from "firebase";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: any;
    $httpsCallableFunction: (
      name: string,
      query?: { [key: string]: string | number },
      data?: any
    ) => Promise<firebase.functions.HttpsCallableResult>;
    $isGranted: (role: number) => boolean;
    $moment: VueMoment;
    $perf: any;
  }
}
