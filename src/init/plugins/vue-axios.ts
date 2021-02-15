import { VueConstructor } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import VueAxios from "vue-axios";

export const installVueAxios = (Vue: VueConstructor, axiosConfig: AxiosRequestConfig | undefined) => {
  if (axiosConfig) {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = axiosConfig.baseURL;
  }
};
