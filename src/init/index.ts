import _Vue, { PluginFunction, VueConstructor } from "vue";
import { InitializeOptions, InstallOptions, User } from "@/types";
import { checkConfiguration } from "@/init/configuration";
import { injectLoader, removeLoader } from "@/init/loader";
import { configureStore } from "@/init/store";
import { configureRouter, injectHomePage } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { installElementUi } from "@/init/plugins/element-ui";
import { installVueDebounce } from "@/init/plugins/vue-debounce";
import * as fb from "firebase";
import { i18n } from "@/init/plugins/vue-i18n";
import * as components from "@/components";
import HomeView from "@/views/placeholders/HomeView.vue";
import { VueRouter } from "vue-router/types/router";
import { Role, ROLES, Roles } from "@/constants";
import { Store } from "vuex";

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

let metadataRef: any = null;
let callback: any = null;
let hasRefreshedToken = false;
let app: any;

const getRole = (token: fb.auth.IdTokenResult): Role =>
  ROLES[(token.claims.role as Roles) ?? 0];

const mountApp = (
  Vue: typeof _Vue,
  App: any,
  router: VueRouter,
  store: Store<any>
) => {
  removeLoader();

  // @ts-ignore
  app = new Vue({
    store,
    router,
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

  Vue.use(install, { store, router, firebase, config });

    firebase.auth().onAuthStateChanged(async (user: fb.User) => {
      if (callback) {
        metadataRef.off("value", callback);
      }
      if (user) {
        let role = getRole(await user.getIdTokenResult());
        store.commit("authenticateUser");
        store.commit("setUser", { ...user.toJSON(), role });
        metadataRef = firebase.database().ref(`metadata/${user.uid}/refreshTime`);
        callback = async () => {
          role = getRole(await user.getIdTokenResult(true));
          store.commit("authenticateUser");
          store.commit("setUser", { ...user.toJSON(), role });
          if (!hasRefreshedToken && !app) {
            mountApp(Vue, App, router as VueRouter, store);
          }
          hasRefreshedToken = true;
        };
        metadataRef.on("value", callback);
      } else {
        if (!app) {
          mountApp(Vue, App, router as VueRouter, store);
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

  configureStore(options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase, options.config);
  installElementUi(Vue, options.i18n);
  installVueDebounce(Vue);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};
