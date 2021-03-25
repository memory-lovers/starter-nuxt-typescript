// Firebase toolss
import * as admin from "firebase-admin";
import { convetTsJson } from "./common/utils";
import { serviceAccount as sa } from "./serviceAccount";

const serviceAccount = sa.develop;
const params = convetTsJson(serviceAccount);
admin.initializeApp({ credential: admin.credential.cert(params) });
const db = admin.firestore();

// ****************************
// * MAIN
// ****************************
async function main() {
  console.log(`***** START MAIN`);

  try {
    // TODO
  } catch (error) {
    console.error(`Error: error`, error);
  }

  console.log(`***** END   MAIN`);
}

main().then();
