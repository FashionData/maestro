import { VueConstructor } from "vue";
import Element from "element-ui";

import { store } from "@/store";
import { routes } from "@/routes";
import { components } from "@/components";

type AnyObject = {
  [key: string]: any;
};

export default {
  install(
    Vue: VueConstructor,
    options: { store: AnyObject; router: AnyObject }
  ) {
    if (!options)
      throw new Error("Please provide a Vuex store and a Vue Router at least.");
    if (!options.store)
      throw new Error("Please initialise plugin with a Vuex store.");
    if (!options.router)
      throw new Error("Please initialise plugin with a Vue Router.");

    Vue.use(Element);

    options.store.registerModule("maestro", store);

    options.router.addRoutes(routes);
    options.router.beforeEach((to: any, from: any, next: any) => {
      console.log("[MAESTRO]: BEFORE EACH");
      next();
    });

    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
