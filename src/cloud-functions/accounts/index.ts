import { Collections } from "../../constants";

export const getAllAccounts = async (admin: any, data: any, context: any) => {
  const snapshot = await admin
    .firestore()
    .collection(Collections.accounts)
    .get();
  return snapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
};

export const createAccount = async (admin: any, data: any, context: any) => {
  const {
    identifier,
    name,
    status,
    description,
    website,
    contact,
    queries
  } = data;
  const match = await admin
    .firestore()
    .collection(Collections.accounts)
    .where("identifier", "==", identifier)
    .get();
  if (!match.empty) {
    throw new Error("non-unique-id");
  }
  return admin
    .firestore()
    .collection(Collections.accounts)
    .add({
      identifier,
      name,
      status,
      description,
      website,
      contact,
      queries
    })
    .then((ref: any) => ref.get())
    .then((account: any) => ({ data: account.data() }));
};

export const updateAccount = async (admin: any, data: any, context: any) => {
  const { uid, name, status, description, website, contact, queries } = data;
  return admin
    .firestore()
    .collection(Collections.accounts)
    .doc(uid)
    .set(
      {
        name,
        status,
        description,
        website,
        contact,
        queries
      },
      { merge: true }
    );
};
