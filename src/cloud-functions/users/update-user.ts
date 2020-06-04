import { UpdateUserPayload } from "../../types/cloud-functions";
import { Collections } from "../../constants";
import { Roles, ROLES } from "../../constants/roles";
import * as fb from "firebase";

const shouldNotTouchField = (obj: any, path: string) =>
  typeof obj[path] === "undefined" || obj[path] === null;

const cleanUpdatePayload = (
  payload: UpdateUserPayload
): Partial<UpdateUserPayload> => {
  let result = {
    email: payload.email,
    password: payload.password,
    displayName: payload.displayName,
    photoURL: payload.photoURL,
    disabled: payload.disabled
  };
  if (shouldNotTouchField(result, "password") || result.password === "") {
    delete result.password;
  }

  return result;
};

export const updateUser = (admin: any, data: UpdateUserPayload, _: any) => {
  return admin
    .auth()
    .updateUser(data.uid, cleanUpdatePayload(data))
    .then((user: fb.User) => {
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
    .then(() => {
      console.log(`Updating ${data.email} social informations`);
      return admin
        .firestore()
        .collection(Collections.users)
        .doc(data.uid)
        .set(
          {
            id: data.uid,
            displayName: data.displayName
          },
          { merge: true }
        )
        .then(() => {
          console.log("Social informations successfully updated");
          return { data };
        });
    })
    .catch((error: Error) => error);
};
