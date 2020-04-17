import { VueConstructor } from "vue";
import { InstallOptions } from "@/types";

import { checkConfiguration } from "@/init/configuration";
import { configureElementUi } from "@/init/element-ui";
import { configureFirebase } from "@/init/firebase";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";

import { components } from "@/components";
import { auth, guest } from "@/router/middleware";

import "./plugins/element";

export { auth, guest };

export let test: VueConstructor;

export default {
  install(Vue: VueConstructor, options: InstallOptions) {
    checkConfiguration(options);

    configureStore(options.store);
    configureRouter(options.router);
    configureFirebase(Vue, options.firebase);
    configureElementUi(Vue);

    Vue.prototype.$log = (value: any) => console.log("[MAESTRO]:", value);

    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
