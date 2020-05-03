import _Vue, { VueConstructor, PluginFunction } from 'vue';
import { Route } from "vue-router";
import { InstallOptions } from "@/types";
import * as components from '@/components';

import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { configureElementUi } from "@/init/element-ui";
import { log } from "@/utils/console";

import { HOME } from "@/constants/router/routes";
import { authMiddleware } from "@/router/middleware";
import HomeView from "@/views/placeholders/HomeView.vue";

import "@/styles/app.scss"

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

export * from "@/router/middleware";
export * from "@/cloud-functions";
export * from '@/components'; // To allow individual component use => can be registered via Vue.component()

export const initializeApp = (
  Vue: VueConstructor,
  App: any,
  options: InstallOptions
) => {
  checkConfiguration(options);
  injectLoader();

  let app: any;
  const { store, router, firebase, theme } = options;

  if (!router.options.routes || !router.options.routes.find((route: Route) => route.path = "/")) {
    router.addRoutes([
      {
        path: HOME.path,
        name: HOME.name,
        meta: { middleware: [authMiddleware] },
        component: HomeView
      }
    ]);

    log("Added placeholder HomeView");
  }

  Vue.use(install, { store, router, firebase, theme });

  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      removeLoader();

      // @ts-ignore
      app = new Vue({
        store,
        router,
        render: (h) => h(App),
      }).$mount("#app");
    }
  });
};

// install function executed by Vue.use()
const install: InstallFunction = function installMaestro(Vue: typeof _Vue, options: InstallOptions) {
  if (install.installed) return;
  install.installed = true;

  configureStore(options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase);
  configureElementUi(Vue, options.theme);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GlobalVue = (global as any).Vue;
}
if (GlobalVue) {
  (GlobalVue as typeof _Vue).use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;
