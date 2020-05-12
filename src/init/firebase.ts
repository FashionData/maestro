import { VueConstructor } from "vue";
import { AnyObject, User } from "@/types";
import { userStore } from "@/store/user";
import { REGION } from "@/constants/firebase";

export const configureFirebase = (Vue: VueConstructor, firebase: AnyObject) => {
  Vue.prototype.$firebase = firebase;

  Vue.prototype.$httpsCallableFunction = (
    name: string,
    query: { [key: string]: string | number } = {},
    data: AnyObject = {}
  ) => {
    const parsedQuery = Object.entries(query)
      .reduce((acc, entry) => {
        return acc + entry[0] + "=" + entry[1] + "&";
      }, "")
      .slice(0, -1);
    const hasQuery = Object.keys(parsedQuery).length > 0;
    return new Promise((resolve, reject) => {
      const callableFunction = firebase
        .app()
        .functions(REGION)
        .httpsCallable(`${name}${hasQuery ? "?" + parsedQuery : ""}`);

      callableFunction(data)
        .then(resolve)
        .catch((err: Error) => reject(err));
    });
  };

  firebase.auth().onAuthStateChanged((user: User) => {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }
  });
};
