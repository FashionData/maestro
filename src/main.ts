import { VueConstructor } from "vue";
import { InstallOptions } from "@/types";

import { checkConfiguration } from "@/init/configuration";
import { configureElementUi } from "@/init/element-ui";
import { configureFirebase } from "@/init/firebase";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";

import { components } from "@/components";
import { auth, guest } from "@/router/middleware";

import { log } from "@/utils/logs";

import "./plugins/element";

export { auth, guest };

const Maestro = {
  install(Vue: VueConstructor, options: InstallOptions) {
    configureStore(options.store);
    configureRouter(options.router);
    configureFirebase(Vue, options.firebase);
    configureElementUi(Vue);

    Vue.prototype.$log = log;

    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};

export const initializeApp = (
  Vue: VueConstructor,
  App: any,
  options: InstallOptions
) => {
  checkConfiguration(options);

  let app: any;
  const { store, router, firebase } = options;

  Vue.use(Maestro, { store, router, firebase });

  // TODO: Add loader

  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      // TODO: Clean loader
      app = new Vue({
        store,
        router,
        render: (h) => h(App),
      }).$mount("#app");
    }
  });
};
