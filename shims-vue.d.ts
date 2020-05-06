import Vue from "vue";
import firebase from "firebase";
import { AnyObject } from "@/types";

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: AnyObject; // TODO: Type
    $httpsCallableFunction: (name: string, data: AnyObject) => Promise<firebase.functions.HttpsCallableResult>;
  }
}
