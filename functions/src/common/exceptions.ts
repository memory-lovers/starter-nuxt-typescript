import * as functions from "firebase-functions";

export const permissionError = new functions.https.HttpsError(
  "permission-denied",
  "The function must be called while authenticated."
);
