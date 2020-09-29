import { VueConstructor } from "vue";

export const installVueMoment = (Vue: VueConstructor) => {
  Vue.use(require('vue-moment'));
};
