import { VueConstructor } from "vue";
import { InstallOptions } from "@/types";

import { checkConfiguration } from "@/init/configuration";
import { configureElementUi } from "@/init/element-ui";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";

import { components } from "@/components";

import "./plugins/element";

export default {
  install(Vue: VueConstructor, options: InstallOptions) {
    checkConfiguration(options);

    configureStore(options.store);
    configureRouter(options.router);
    configureElementUi(Vue);

    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
