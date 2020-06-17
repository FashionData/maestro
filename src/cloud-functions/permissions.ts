import { CFAccountRole, Collections, ROLES, Roles } from "../constants";

export const isGranted = (context: any, role: number) => {
  return context.auth?.token?.role >= role;
};

export const isSuperAdmin = (context: any) => {
  return context.auth?.token?.role >= Roles.SuperAdmin;
};

export const getAccountRole = async (
  admin: any,
  context: any,
  data: { currentAccount: string }
): Promise<CFAccountRole> => {
  const token = context.auth?.token;
  const accountRole = token?.accountsRole?.find((code: string) =>
    code.includes(data.currentAccount)
  );
  if (!accountRole) {
    throw new Error("account-denied");
  }
  const [role, identifier] = accountRole.split("-");
  const snapshot = await admin
    .firestore()
    .collection(Collections.accounts)
    .where("identifier", "==", identifier)
    .get();
  if (snapshot.docs.length > 0) {
    return {
      ...snapshot.docs[0].data(),
      role: ROLES[(Number(role) as Roles) ?? 0]
    };
  }
  throw new Error("invalid-account");
};
