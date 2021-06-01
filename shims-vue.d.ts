import moment from 'moment';
import firebase from "firebase";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: any;
    $httpsCallableFunction: (
      name: string,
      query?: { [key: string]: string | number },
      data?: any
    ) => Promise<firebase.functions.HttpsCallableResult>;
    $isGranted: (role: number) => boolean;
    $moment: typeof moment;
    $perf: any;
    axios: AxiosInstance;
    $http: AxiosInstance;
    $roundToOneDecimal: (numberToRound: number) => number;
    $roundToTwoDecimals: (numberToRound: number) => number;
    }
}
