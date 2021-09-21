import moment from 'moment';
import firebase from "firebase";
import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: any;
    $httpsCallableFunction: (
      name: string,
      query?: { [key: string]: string | number },
      data?: any
    ) => Promise<firebase.functions.HttpsCallableResult>;
    $get: (url: string, requestConfig?: AxiosRequestConfig) => AxiosResponse;
    $post: (
      url: string,
      payload: { accountId: string; [key: string]: any; },
      requestConfig?: AxiosRequestConfig
    ) => AxiosResponse;
    $isGranted: (role: number) => boolean;
    $moment: typeof moment;
    $perf: any;
    axios: AxiosStatic;
    $http: AxiosStatic;
    $roundToOneDecimal: (numberToRound: number) => number;
    $roundToTwoDecimals: (numberToRound: number) => number;
    $formatWithSign: (numberToFormat: number) => string | number;
  }
}
