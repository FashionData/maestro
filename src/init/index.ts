import _Vue, { PluginFunction, VueConstructor } from "vue";
import { InitializeOptions, InstallOptions, User } from "@/types";
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
  options: InitializeOptions
) => {
  checkConfiguration(options);
  injectLoader();

  let app: any;
  const i18nInstance = i18n(Vue, options.config?.i18n);
  const { store, router, firebase, config } = options;
  const installOptions: InstallOptions = { store, router, firebase, i18n: i18nInstance, config };

  injectHomePage(router);

  Vue.use(install, installOptions);

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
        i18n: i18nInstance,
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
  installElementUi(Vue, options.i18n);
  installVueDebounce(Vue);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};
