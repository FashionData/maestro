import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  createUser as createUserHandler,
  getAllUsers as getAllUsersHandler,
  updateUser as updateUserHandler,
  getAllAccounts as getAllAccountsHandler,
  createAccount as createAccountHandler,
  updateAccount as updateAccountHandler
} from "../../../src/cloud-functions";
import { REGION } from "../../../src/constants/firebase";

// https://firebase.google.com/docs/functions/typescript

const auth = admin.initializeApp();

export const getAllUsers = functions
  .region(REGION)
  .https.onCall((data, context) => getAllUsersHandler(auth, data, context));
export const createUser = functions
  .region(REGION)
  .https.onCall((data, context) => createUserHandler(auth, data, context));
export const updateUser = functions
  .region(REGION)
  .https.onCall((data, context) => updateUserHandler(auth, data, context));
export const getAllAccounts = functions
  .region(REGION)
  .https.onCall((data, context) => getAllAccountsHandler(auth, data, context));
export const createAccount = functions
  .region(REGION)
  .https.onCall((data, context) => createAccountHandler(auth, data, context));
export const updateAccount = functions
  .region(REGION)
  .https.onCall((data, context) => updateAccountHandler(auth, data, context));
