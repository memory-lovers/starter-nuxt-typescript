import { FirebaseAuth } from "@firebase/auth-types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AnalyticsMock } from "types";
import exlogger from "./logger";

// ****************************
// * AXIOS
// ****************************
let $axios: NuxtAxiosInstance;
export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
}

// ****************************
// * FIREBASE
// ****************************
let $auth: FirebaseAuth | null = null;
let $analytics: AnalyticsMock = {
  logEvent: (name: string, params: any) => {
    exlogger.info(`Mock: name=${name}, params=${JSON.stringify(params)}`);
  }
};
export function initializeFirebase(firebaseApp: any) {
  if (!!firebaseApp && !!firebaseApp.analytics()) {
    $analytics = firebaseApp.analytics();
    $auth = firebaseApp.auth();
  }
}

// ****************************
// * FIREBASE: Auth
// ****************************

export { $axios, $analytics, $auth };
