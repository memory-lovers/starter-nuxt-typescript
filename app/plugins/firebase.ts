import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

try {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    });
    firebase.auth().useDeviceLanguage();

    // Enable analytics
    // if (process.env.NODE_ENV == "production" && process.client) {
    //   firebase.analytics();
    // }
  }
} catch (error) {
  console.error(`Error in firebase.initializeApp: ${error}`, error);
}

export default firebase;
