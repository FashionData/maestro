import { VueConstructor } from "vue";
import { AnyObject, ConfigurationOptions } from "@/types";
import { REGION } from "@/constants/firebase";
import { log } from "@/utils/console";
import { USER_MODULE } from "@/init/store";

export const configureFirebase = (
  Vue: VueConstructor,
  firebase: AnyObject,
  config: ConfigurationOptions | undefined
) => {
  Vue.prototype.$firebase = firebase;

  Vue.prototype.$httpsCallableFunction = function(
    name: string,
    query: { [key: string]: string | number } = {},
    data: AnyObject = {}
  ) {
    const currentAccount = this.$store.state[USER_MODULE].selectedAccount;
    const parsedQuery = Object.entries(query)
      .reduce((acc, entry) => {
        return acc + entry[0] + "=" + entry[1] + "&";
      }, "")
      .slice(0, -1);
    const hasQuery = Object.keys(parsedQuery).length > 0;
    return new Promise((resolve, reject) => {
      const functions = firebase.app().functions(REGION);
      if (
        process.env.NODE_ENV === "development" &&
        process.env.VUE_APP_LOCAL_FIREBASE_CF_URL
      ) {
        functions.useFunctionsEmulator(
          process.env.VUE_APP_LOCAL_FIREBASE_CF_URL
        );
      }

      const callableFunction = functions.httpsCallable(
        `${name}${hasQuery ? "?" + parsedQuery : ""}`
      );

      callableFunction({
        ...data,
        ...(currentAccount ? { currentAccount } : {})
      })
        .then(resolve)
        .catch((err: Error) => reject(err));
    });
  };

  if (config?.analytics) {
    firebase.analytics();
    log("Firebase analytics enabled");
  }

  if (config?.performance) {
    Vue.prototype.$perf = () => {
      return firebase.performance();
    };
    log("Firebase performance enabled");
  }
};
