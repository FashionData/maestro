import { Store } from "vuex";
import VueI18n from "vue-i18n";
import { AxiosRequestConfig } from "axios";
import { CustomClaims } from "../utils/role";

export type AnyObject = {
  [key: string]: any;
};

export type I18nConfig = {
  fallbackLocale?: string;
  en?: AnyObject;
  fr?: AnyObject;
};

export interface ExternalScript {
  productionOnly: boolean;
  scriptString: string;
}

export type ConfigurationOptions = {
  analytics?: boolean;
  externalScripts?: ExternalScript[];
  performance?: boolean;
  i18n?: I18nConfig;
  axios?: AxiosRequestConfig;
};

export type InitializeOptions = {
  config?: ConfigurationOptions;
  firebase: AnyObject;
  router: AnyObject;
  store: Store<any>;
};

export type InstallOptions = InitializeOptions & {
  i18n: VueI18n;
};

export type User = CustomClaims & {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  metadata: {
    creationTime: Date;
  };
};
