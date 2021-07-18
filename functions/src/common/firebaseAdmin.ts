import * as admin from "firebase-admin";

if (admin.apps.length < 1) {
  admin.initializeApp();
}

export default admin;
export const inc = admin.firestore.FieldValue.increment;
