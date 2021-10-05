import * as Sentry from "@sentry/browser";
import dayjs from "dayjs";
import { AuthInfo, User } from "types";
import authState from "~/plugins/authState";
import firebase from "~/plugins/firebase";
import { userUseCase } from "~/src/usecase/UserUseCase";
import exlogger from "~/src/utils/logger";
import { notifyHelper } from "../helper/NotifyHelper";

export type AuthType = "twitter" | "google";
class AuthUseCase {
  private auth: firebase.auth.Auth;

  constructor() {
    this.auth = firebase.auth();
  }

  // ****************************
  // * LOGIN with popup
  // ****************************
  async loginWithPopup(authType: AuthType = "twitter"): Promise<AuthInfo> {
    const providor = this.getProvider(authType);
    const credential = await this.auth.signInWithPopup(providor);

    if (!credential || !credential.user)
      throw new Error("Login Error: user is none.");

    return await this.getOrCreateUser(credential);
  }

  // ****************************
  // * LOGIN with redirect
  // ****************************
  async loginWithRedirect(authType: AuthType = "google") {
    const providor = this.getProvider(authType);
    await this.auth.signInWithRedirect(providor);
  }

  async checkRedirectResult() {
    exlogger.info(`** checkRedirectResult`);
    try {
      const credential = await this.auth.getRedirectResult();

      if (!credential || !credential.user) return null;
      return await this.getOrCreateUser(credential);
    } catch (error) {
      exlogger.info(`** Login Error: code=${error.code}`);
      if (error.code === "auth/account-exists-with-different-credential") {
        const methods = await this.auth.fetchSignInMethodsForEmail(error.email);
        const providerName = this.getProviderName(methods[0]);
        notifyHelper.error(
          `このメールアドレスは${providerName}でログインしています。\n${providerName}でログインしてください。`
        );
      }
      throw error;
    }
  }

  async loginByInit(): Promise<AuthInfo | null> {
    const firebaseUser = await authState();
    exlogger.info(
      `** loginByInit: uid=${!!firebaseUser ? firebaseUser.uid : "null"}`
    );
    if (!firebaseUser || !firebaseUser.uid) return null;

    const user = await userUseCase.findById(firebaseUser.uid);
    if (!user) return null;

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

  private getProvider(authType: AuthType) {
    if (authType == "google") {
      return new firebase.auth.GoogleAuthProvider();
    } else {
      return new firebase.auth.TwitterAuthProvider();
    }
  }

  private async getOrCreateUser(credential: firebase.auth.UserCredential) {
    if (!credential || !credential.user)
      throw new Error("Login Error: user is none.");

    const user: User | null = await userUseCase.findById(credential.user.uid);
    if (!!user) {
      this.setSentry(user);
      return { user: user };
    }

    // new user
    const twitterId = this.getTwitterId(credential.user);
    const current = dayjs().valueOf();
    const newUser: User = {
      uid: credential.user.uid,
      name: credential.user.displayName || "",
      photoURL: credential.user.photoURL || "",
      // twitterId: twitterId,
      createAt: current,
      updateAt: current
    };

    await userUseCase.save(newUser);

    // set Sentry User
    this.setSentry(newUser);
    return { user: newUser };
  }

  private getTwitterId(user: firebase.User | null): string {
    if (!user || !user.providerData || user.providerData.length < 1) return "";

    for (let i = 0; user.providerData.length; i++) {
      const data = user.providerData[i];
      if (data == null) return "";
      exlogger.info(`providerData=${JSON.stringify(data, null, 2)}`);
      if (!!data && data.providerId == "twitter.com") return data.uid;
    }
    return "";
  }

  private getProviderForProviderId(providerId: string) {
    switch (providerId) {
      case "google.com":
        return new firebase.auth.GoogleAuthProvider();
      case "twitter.com":
        return new firebase.auth.TwitterAuthProvider();
      default:
        return null;
    }
  }

  private getProviderName(providerId: string): string {
    switch (providerId) {
      case "google.com":
        return "Googleアカウント";
      case "twitter.com":
        return "Twitter";
      default:
        return "";
    }
  }
}

export const authUseCase = new AuthUseCase();
