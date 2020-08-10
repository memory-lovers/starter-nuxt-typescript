import * as Sentry from "@sentry/browser";
import { AuthInfo, User } from "types";
import authState from "~/plugins/authState";
import firebase from "~/plugins/firebase";
import { userUseCase } from "~/src/usecase/UserUseCase";
import exlogger from "~/src/utils/logger";

class AuthUseCase {
  private auth: firebase.auth.Auth;

  constructor() {
    this.auth = firebase.auth();
  }

  // ****************************
  // * 参照
  // ****************************
  async login(): Promise<AuthInfo> {
    const provider = new firebase.auth.GoogleAuthProvider();

    const credential = await this.auth.signInWithPopup(provider);

    if (!credential || !credential.user || !credential.user.email)
      throw new Error("Login Error: user is none.");

    const user: User | null = await userUseCase.findById(credential.user.uid);
    if (!user) throw new Error("Login Error: user is none.");

    // set Sentry User
    this.setSentry(user);
    return { user: user };
  }

  async loginByInit(): Promise<AuthInfo | null> {
    const firebaseUser = await authState();
    exlogger.info(
      `** loginByInit: uid=${!!firebaseUser ? firebaseUser.uid : "null"}`
    );
    if (!firebaseUser || !firebaseUser.uid) return null;

    const user = await userUseCase.findById(firebaseUser.uid);
    if (!user) {
      await this.logout();
      return null;
    }

    // set Sentry User
    this.setSentry(user);
    return { user: user };
  }

  async logout() {
    const firebaseUser = await authState();
    if (!firebaseUser) return null;
    await this.auth.signOut();
  }

  // ****************************
  // * 更新
  // ****************************

  // ****************************
  // * private
  // ****************************
  private setSentry(user: User) {
    // set Sentry User
    if (process.env.NODE_ENV == "production") {
      const config = { id: user.uid, username: user.name };
      Sentry.configureScope(scope => scope.setUser(config));
    }
  }
}

export const authUseCase = new AuthUseCase();
