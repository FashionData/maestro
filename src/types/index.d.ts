export type AnyObject = {
  [key: string]: any;
}

export type InstallOptions = { store: AnyObject; router: AnyObject, firebase: AnyObject, theme?: NodeRequire }

export type User = {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
};
