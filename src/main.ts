import { VueConstructor } from "vue";
import { store } from "./store";
import { routes } from "@/routes";

import ButtonComponent from "@/components/ButtonComponent.vue";

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

    options.store.registerModule("maestro", store);

    options.router.addRoutes(routes);
    options.router.beforeEach((to: any, from: any, next: any) => {
      console.log('[MAESTRO]: BEFORE EACH');
      next();
    });

    Vue.component("button-component", ButtonComponent);
  }
};
