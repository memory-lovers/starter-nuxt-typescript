import { $analytics } from "~/src/utils/api";
import exlogger from "./logger";

class EventLogger {
  // ログインボタンのクリック
  clickLogin() {
    this.sendEvent("click_login");
  }

  // ****************************
  // * Authentication
  // ****************************
  // ログイン
  login(uid: string, method: string, funcName: string) {
    this.sendEvent("login", { uid: uid, method: method, funcName: funcName });
  }

  // ログアウト
  logout(uid: string) {
    this.sendEvent("logout", { uid: uid });
  }

  // ログイン
  register(uid: string, method: string) {
    this.sendEvent("register", { uid: uid, method: method });
  }

  unregister(uid: string) {
    this.sendEvent("unregister", { uid: uid });
  }

  // ****************************
  // * Private
  // ****************************
  private sendEvent(name: string, params?: any) {
    try {
      const paramsStr = JSON.stringify(params);
      if (!$analytics) {
        exlogger.warn(`!$analytics: name=${name}, params=${paramsStr}`);
        return;
      }

      exlogger.info(`** sendEvent: name=${name}, params=${paramsStr}`);
      $analytics.logEvent(name, params);
    } catch (error) {
      exlogger.warn(`Error in sendEvent: ${error}`);
    }
  }
}

export const eventLogger = new EventLogger();
