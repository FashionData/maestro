export type AnyObject = {
  [key: string]: any;
}

export type ConfigurationOptions = {
  analytics?: boolean,
  performance?: boolean,
}

export type InstallOptions = {
  store: AnyObject,
  router: AnyObject,
  firebase: AnyObject,
  config?: ConfigurationOptions,
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
