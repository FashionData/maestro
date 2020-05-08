export type AnyObject = {
  [key: string]: any;
}

export type InstallOptions = { store: AnyObject; router: AnyObject, firebase: AnyObject }

export type User = {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  metadata: {
    creationTime: Date
  }
};
