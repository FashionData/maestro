import { CreateUserPayload } from "../../types/cloud-functions";
import { Roles, ROLES } from "../../constants/roles";

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
    .then((result: any) => {
      const userRole = ROLES[(data.role ?? 0) as Roles];
      console.log(
        `Setting user ${result.data.email} to role ${userRole.name} (${userRole.code})`
      );
      return admin
        .auth()
        .setCustomUserClaims(result.data.uid, {
          role: data.role
        })
        .then(() => {
          const metadataRef = admin
            .database()
            .ref("metadata/" + result.data.uid);
          return metadataRef.set({ refreshTime: new Date().getTime() });
        });
    })
    .catch((error: Error) => error);
};
