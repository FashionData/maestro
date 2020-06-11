import * as fb from "firebase";
import { AccountRole, Collections, Role, Roles, ROLES } from "../constants";

export interface CustomClaims {
  role: Role;
  accountsRole: AccountRole[];
}

export const getCustomClaims = async (
  firestore: fb.firestore.Firestore,
  token: fb.auth.IdTokenResult
): Promise<CustomClaims> => {
  const snapshot = await firestore.collection(Collections.accounts).get();
  const accounts = snapshot.docs.map(doc => doc.data());
  return {
    role: ROLES[(token.claims.role as Roles) ?? 0],
    accountsRole: ((token.claims.accountsRole as string[]) ?? []).reduce(
      (acc: AccountRole[], entry) => {
        const [role, identifier] = entry.split("-");
        const match = accounts.find(
          account => account.identifier === identifier
        );
        if (match) {
          return [
            ...acc,
            {
              identifier: match.identifier,
              name: match.name,
              role: ROLES[(Number(role) as Roles) ?? 0]
            }
          ];
        }
        return [...acc];
      },
      []
    )
  };
};
