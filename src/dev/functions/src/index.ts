import * as functions from 'firebase-functions';
import { helloWorld } from "../../../cloud-functions";

// https://firebase.google.com/docs/functions/typescript

export const test = functions.https.onRequest((request, response) => helloWorld(request, response));
