import { VueConstructor } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export const installVueAxios = (Vue: VueConstructor, axiosConfig: boolean | undefined) => {
  if (axiosConfig) Vue.use(VueAxios, axios);
};
