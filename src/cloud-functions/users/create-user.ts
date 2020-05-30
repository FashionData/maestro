import { CreateUserPayload } from "@/types/cloud-functions";

export const createUser = (admin: any, data: CreateUserPayload, _: any) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.displayName,
      photoURL: data.photoURL,
      disabled: false
    })
    .then((user: any) => {
      return { data: user };
    })
    .catch((error: Error) => error);
};
