import { VueConstructor } from "vue";
import { AnyObject, ConfigurationOptions, User } from "@/types";
import { userStore } from "@/store/user";
import { REGION } from "@/constants/firebase";
import { log } from "@/utils/console";

export const configureFirebase = (
  Vue: VueConstructor,
  firebase: AnyObject,
  config: ConfigurationOptions | undefined
) => {
  Vue.prototype.$firebase = firebase;

  Vue.prototype.$httpsCallableFunction = (
    name: string,
    data: AnyObject = {}
  ) => {
    return new Promise((resolve, reject) => {
      const callableFunction = firebase
        .app()
        .functions(REGION)
        .httpsCallable(name);

      callableFunction(data)
        .then(resolve)
        .catch((err: Error) => reject(err));
    });
  };

  if (config?.hasOwnProperty("analytics")) {
    firebase.analytics();
    log("Firebase analytics enabled");
  }

  if (config?.hasOwnProperty("performance")) {
    Vue.prototype.$perf = () => {
      return firebase.performance();
    };
    log("Firebase performance enabled");
  }

  firebase.auth().onAuthStateChanged((user: User) => {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }
  });
};
