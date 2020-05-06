import { VueConstructor } from "vue";
import vueDebounce from 'vue-debounce'

export const installVueDebounce = (Vue: VueConstructor) => {
  Vue.use(vueDebounce)
};
