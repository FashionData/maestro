import * as firebase from "firebase";

const options = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(options);
