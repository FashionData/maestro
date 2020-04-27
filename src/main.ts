import _Vue, { VueConstructor, PluginFunction } from 'vue';
import { InstallOptions } from "@/types";
import * as components from '@/components';
import { auth, guest } from "@/router/middleware";

import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { configureElementUi } from "@/init/element-ui";
import { log } from "@/utils/logs";

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

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

  Vue.use(install, { store, router, firebase });

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

  checkConfiguration(options);

  configureStore(options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase);
  configureElementUi(Vue);

  // TODO: Add prototype only in Maestro
  Vue.prototype.$log = log;

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

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components';
