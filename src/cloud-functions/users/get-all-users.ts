import { AnyObject, User } from "../../types";

export const getAllUsers = (admin: any, data: AnyObject, _: any) => {
  return admin
    .auth()
    .listUsers(1000, data.nextPageToken)
    .then((users: User[]) => (users))
    .catch((err: Error) => (err));
};

