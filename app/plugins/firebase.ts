import { AnalyticsMock } from "types";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";
import exlogger from "~/src/utils/logger";

try {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    });
    firebase.auth().useDeviceLanguage();

    // Enable analytics
    if (process.env.NODE_ENV == "production" && process.client) {
      firebase.analytics();
    }

    // Enable Emulator
    const functions = firebase.app().functions("asia-northeast1");
    if (
      process.env.NODE_ENV == "production" ||
      process.env.USE_EMULATOR == "false"
    ) {
      // DO NOTHING
    } else if (location.hostname == "localhost") {
      const host = "localhost";
      // firebase.auth().useEmulator(`http://${host}:9099/`);
      functions.useEmulator(host, 5001);

      firebase.firestore().settings({
        host: `${host}:8081`,
        ssl: false
      });
    }
  }
} catch (error) {
  exlogger.error(`Error in firebase.initializeApp: ${error}`, error);
}

export default firebase;
export const functions = firebase.app().functions("asia-northeast1");
export const auth = firebase.app().auth();
export const firestore = firebase.app().firestore();

let _analytics: AnalyticsMock = {
  logEvent: (name: string, params: any) => {
    exlogger.info(`Mock: name=${name}, params=${JSON.stringify(params)}`);
  }
};
if (!!firebase.app() && !!firebase.app().analytics()) {
  _analytics = firebase.app().analytics();
}
export const analytics = _analytics;
