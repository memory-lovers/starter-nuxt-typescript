import { FirebaseFirestore } from "@firebase/firestore-types";
import { User, UpdateParam } from "types";
import firebase from "~/plugins/firebase";

class UserUseCase {
  private db: FirebaseFirestore;

  constructor() {
    this.db = firebase.firestore();
  }

  // ****************************
  // * 参照
  // ****************************
  public async findById(uid: string): Promise<User | null> {
    if (!uid) return null;
    const ref = this.db.collection("users").doc(uid);
    const user = (await ref.get()).data() as User | undefined;
    return user || null;
  }

  // ****************************
  // * 更新
  // ****************************
  public async add(user: User): Promise<void> {
    const ref = this.db.collection("users").doc(user.uid);
    await ref.set(user);
  }

  public async edit(user: User, param: UpdateParam): Promise<void> {
    const ref = this.db.collection("users").doc(user.uid);
    await ref.set({ [param.key]: param.value }, { merge: true });
  }

  public async del(user: User): Promise<void> {
    const ref = this.db.collection("users").doc(user.uid);
    await ref.delete();
  }

  // ****************************
  // * private
  // ****************************
}

export const userUseCase = new UserUseCase();
