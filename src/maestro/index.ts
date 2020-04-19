import { VueConstructor } from "vue";
import { InstallOptions } from "@/types";

import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";
import { configureFirebase } from "@/init/firebase";
import { configureElementUi } from "@/init/element-ui";

import { components } from "@/components";
import { log } from "@/utils/logs";

export const Maestro = {
  install(Vue: VueConstructor, options: InstallOptions) {
    configureStore(options.store);
    configureRouter(options.router);
    configureFirebase(Vue, options.firebase);
    configureElementUi(Vue);

    // TODO: Add prototype only in Maestro
    Vue.prototype.$log = log;

    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
