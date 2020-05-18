import _Vue, { PluginFunction, VueConstructor } from "vue";
import { Route } from "vue-router";
import { InstallOptions } from "@/types";
import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { HOME } from "@/constants/router/routes";
import { authMiddleware } from "@/router/middleware";
import { log } from "@/utils/console";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { installElementUi } from "@/init/plugins/element-ui";
import { installVueDebounce } from "@/init/plugins/vue-debounce";
import * as components from "@/components";
import HomeView from "@/views/placeholders/HomeView.vue";

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

export const initializeApp = (
  Vue: VueConstructor,
  App: any,
  options: InstallOptions
) => {
  checkConfiguration(options);
  injectLoader();

  let app: any;
  const { store, router, firebase, config } = options;

  if (
    !router.options.routes ||
    !router.options.routes.find((route: Route) => (route.path = "/"))
  ) {
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

  Vue.use(install, { store, router, firebase, config });

  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      removeLoader();

      // @ts-ignore
      app = new Vue({
        store,
        router,
        render: h => h(App)
      }).$mount("#app");
    }
  });
};

// install function executed by Vue.use()
export const install: InstallFunction = function installMaestro(
  Vue: typeof _Vue,
  options: InstallOptions
) {
  if (install.installed) return;
  install.installed = true;

  configureStore(options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase, options.config);
  installElementUi(Vue);
  installVueDebounce(Vue);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};
