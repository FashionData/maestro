import VueI18n from "vue-i18n";

export type AnyObject = {
  [key: string]: any;
}

export type ConfigurationOptions = {
  analytics?: boolean;
  performance?: boolean;
  i18n?: I18nConfig
}

export type I18nConfig = {
  fallbackLocale?: string;
  en?: AnyObject;
  fr?: AnyObject;
}

export type InitializeOptions = {
  store: AnyObject,
  router: AnyObject,
  firebase: AnyObject,
  config?: ConfigurationOptions,
}

export type InstallOptions = InitializeOptions & {
  i18n: VueI18n,
}

export type User = {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  metadata: {
    creationTime: Date
  }
};
