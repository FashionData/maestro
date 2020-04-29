import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getAllUsers as getAllUsersHandler } from "../../../src/cloud-functions";
import { REGION } from "../../../src/constants/firebase";

// https://firebase.google.com/docs/functions/typescript

const auth = admin.initializeApp();

export const getAllUsers = functions.region(REGION).https.onCall((data, context) => getAllUsersHandler(auth, data, context));
