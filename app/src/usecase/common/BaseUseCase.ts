import { FirebaseFirestore } from "@firebase/firestore-types";
import firebase from "~/plugins/firebase";

export abstract class BaseUseCase {
  protected db: FirebaseFirestore;

  constructor() {
    this.db = firebase.firestore();
  }
}
