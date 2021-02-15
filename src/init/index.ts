import _Vue, { PluginFunction, VueConstructor } from "vue";
import { InitializeOptions, InstallOptions } from "@/types";
import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { injectPrototypes } from "@/init/prototypes";
import { configureStore } from "@/init/store";
import { configureRouter, injectHomePage } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { installElementUi } from "@/init/plugins/element-ui";
import { installVueDebounce } from "@/init/plugins/vue-debounce";
import { installVueMoment } from "@/init/plugins/vue-moment";
import { installVueVirtualScroller } from "@/init/plugins/vue-virtual-scroller";
import * as fb from "firebase";
import { i18n } from "@/init/plugins/vue-i18n";
import * as components from "@/components";
import { VueRouter } from "vue-router/types/router";
import { Store } from "vuex";
import VueI18n from "vue-i18n";
import { getCustomClaims } from "@/utils/role";
import {installVueAxios} from "@/init/plugins/vue-axios";

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

let metadataRef: any = null;
let callback: any = null;
let app: any = null;

const mountApp = (
  Vue: typeof _Vue,
  App: any,
  router: VueRouter,
  store: Store<any>,
  i18n: VueI18n
) => {
  removeLoader();

  // @ts-ignore
  app = new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
  }).$mount("#app");
};

export const initializeApp = (
  Vue: VueConstructor,
  App: any,
  options: InitializeOptions
) => {
  checkConfiguration(options);
  injectLoader();
  injectPrototypes();

  const i18nInstance = i18n(Vue, options.config?.i18n);
  const { config, firebase, router, store } = options;
  const installOptions: InstallOptions = { config, firebase, i18n: i18nInstance, router, store };

  injectHomePage(router);

  Vue.use(install, installOptions);

  firebase.auth().onAuthStateChanged(async (user: fb.User) => {
    if (callback) {
      metadataRef.off("value", callback);
    }
    if (user) {
      let claims = await getCustomClaims(
        firebase.firestore(),
        await user.getIdTokenResult()
      );
      store.commit("authenticateUser");
      store.commit("setUser", { ...user.toJSON(), ...claims });
      if (!app) {
        mountApp(Vue, App, router as VueRouter, store, i18nInstance);
      }

      metadataRef = firebase.database().ref(`metadata/${user.uid}/refreshTime`);
      callback = async () => {
        claims = await getCustomClaims(
          firebase.firestore(),
          await user.getIdTokenResult(true)
        );
        store.commit("authenticateUser");
        store.commit("setUser", { ...user.toJSON(), ...claims });
      };
      metadataRef.on("value", callback);
    } else {
      if (!app) {
        mountApp(Vue, App, router as VueRouter, store, i18nInstance);
      }
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

  configureStore(Vue, options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase, options.config);
  installElementUi(Vue, options.i18n);
  installVueAxios(Vue, options.config?.axios);
  installVueDebounce(Vue);
  installVueMoment(Vue);
  installVueVirtualScroller(Vue);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};
