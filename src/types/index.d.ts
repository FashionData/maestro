import { Store } from "vuex";
import { Role } from "@/constants";

export type AnyObject = {
  [key: string]: any;
};

export type ConfigurationOptions = {
  analytics?: boolean;
  performance?: boolean;
};

export type InstallOptions = {
  store: Store<any>;
  router: AnyObject;
  firebase: AnyObject;
  config?: ConfigurationOptions;
};

export type User = {
  uid: string;
  email: string;
  role: Role;
  displayName: string;
  photoURL: string;
  metadata: {
    creationTime: Date;
  };
};
