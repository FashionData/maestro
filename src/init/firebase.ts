import { VueConstructor } from "vue";
import { AnyObject, User } from "@/types";
import { userStore } from "@/store/user";
import { REGION } from "@/constants/firebase";

export const configureFirebase = (Vue: VueConstructor, firebase: AnyObject) => {
  Vue.prototype.$firebase = firebase;

  Vue.prototype.$httpsCallableFunction = (name: string, data: AnyObject = {}) => {
    return new Promise((resolve, reject) => {
      const callableFunction = firebase.app().functions(REGION).httpsCallable(name);

      callableFunction(data)
        .then(resolve)
        .catch((err: Error) => reject(err));
    });
  };

  firebase.auth().onAuthStateChanged((user : User) => {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }
  });
};
