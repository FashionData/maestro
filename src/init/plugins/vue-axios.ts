import { VueConstructor } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import VueAxios from "vue-axios";
import { Store } from "vuex";
import { AnyObject } from "@/types";

export const installVueAxios = (Vue: VueConstructor, axiosConfig: AxiosRequestConfig | undefined, store: Store<any>) => {
  if (axiosConfig) {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = axiosConfig.baseURL;

    const getCommonHeader = (accessToken: string) => ({
      'Authorization': `Bearer ${accessToken}`
    })

    Vue.prototype.$get = function(url: string, requestConfig: AxiosRequestConfig) {
      return Vue.prototype.$http.get(
        url,
        {
          headers: getCommonHeader(store.state['m-user'].user.stsTokenManager?.accessToken),
          ...requestConfig,
        },
      );
    }

    Vue.prototype.$post = function(url: string, payload: AnyObject, requestConfig: AxiosRequestConfig) {
      const mUserState = store.state['m-user'];
      return Vue.prototype.$http.post(
        url,
        {
          ...payload,
          accountId: mUserState.selectedAccount,
        },
        {
          headers: getCommonHeader(mUserState.user.stsTokenManager?.accessToken),
          ...requestConfig,
        },
      );
    }
  }
};
