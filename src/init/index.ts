import _Vue, { PluginFunction, VueConstructor } from "vue";
import { InstallOptions, User } from "@/types";
import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { configureStore } from "@/init/store";
import { configureRouter, injectHomePage } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { installElementUi } from "@/init/plugins/element-ui";
import { installVueDebounce } from "@/init/plugins/vue-debounce";
import { i18n } from "@/init/plugins/vue-i18n";
import { userStore } from "@/store/user";
import * as components from "@/components";

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

  injectHomePage(router);

  Vue.use(install, { store, router, firebase, config });

  firebase.auth().onAuthStateChanged((user: User) => {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }

    if (!app) {
      removeLoader();

      // @ts-ignore
      app = new Vue({
        store,
        router,
        i18n: i18n(Vue),
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
