import { VueConstructor } from "vue";
import { AnyObject, User } from "@/types";
import { userStore } from "@/store/user";

export const configureFirebase = (Vue: VueConstructor, firebase: AnyObject) => {
  Vue.prototype.$firebase = firebase;

  firebase.auth().onAuthStateChanged((user : User) => {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }
  });
};
