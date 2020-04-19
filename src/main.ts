import { VueConstructor } from "vue";
import { InstallOptions } from "@/types";

import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { auth, guest } from "@/router/middleware";
import { Maestro } from "@/maestro";

import "./plugins/element";

export { auth, guest };

export const initializeApp = (
  Vue: VueConstructor,
  App: any,
  options: InstallOptions
) => {
  checkConfiguration(options);
  injectLoader();

  let app: any;
  const { store, router, firebase } = options;

  Vue.use(Maestro, { store, router, firebase });

  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      removeLoader();

      app = new Vue({
        store,
        router,
        render: (h) => h(App),
      }).$mount("#app");
    }
  });
};
