import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  createUser as createUserHandler,
  getAllUsers as getAllUsersHandler,
  updateUser as updateUserHandler
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
