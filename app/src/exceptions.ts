import { notifyHelper } from "./helper/NotifyHelper";
import exlogger from "./utils/logger";

export class AppError extends Error {
  readonly cause?: any;

  constructor(e?: string, cause?: any) {
    super(e);
    this.name = new.target.name;
    this.cause = cause;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // https://future-architect.github.io/typescript-guide/exception.html
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Logicエラー
export class AppLogicError extends AppError {
  constructor(e?: string, cause?: any) {
    super(e);
  }
}

// メッセージのないエラー
export class AppNoMessageError extends AppError {}

// ****************************
// * Common
// ****************************
export class AppNetworkError extends AppError {
  constructor(cause?: any) {
    super("ネットワークエラーが発生しました。通信状況を確認ください。", cause);
  }
}

export class AppInternalError extends AppError {
  constructor(cause?: any) {
    super("エラーが発生しました。", cause);
  }
}

// ****************************
// * Auth
// ****************************
export class NoAuthedError extends AppError {
  constructor(cause?: any) {
    super("ログインしていません。", cause);
  }
}

export class UserNotFoundError extends AppError {
  constructor(cause?: any) {
    super("該当のユーザが存在しません。", cause);
  }
}

// ****************************
// * Stripe
// ****************************

export class InvalidPriceIdError extends AppLogicError {}

// ****************************
// * Firebase
// ****************************

export class StorageFileNotFoundError extends AppLogicError {}

// ****************************
// * Http
// ****************************
export class AppHttpError extends AppError {
  constructor(public statusCode: number, e?: string) {
    super(e);
  }
}

// ****************************
// * Convert Error
// ****************************
export function convertError(error: any) {
  exlogger.info(`convertError: name=${error.name}, code=${error.code}`);

  // LogicError
  if (error instanceof AppLogicError) return error;

  // Firebase Auth
  const code = error.code;
  if (!!code) {
    switch (code) {
      case "auth/network-request-failed":
        return new AppNetworkError(error);
      case "auth/popup-blocked":
        return new AppLogicError("ポップアップがブロックされました");
      case "auth/requires-recent-login":
        return new AppLogicError(
          "前回のログインから時間が経過しています。一度ログアウト後に、再ログインください。"
        );
      // Cancel
      case "auth/cancelled-popup-request":
      case "auth/popup-closed-by-user":
        return new AppNoMessageError();
      default:
        return new AppLogicError(`エラーが発生しました: ${code}`, error);
    }
  }

  return new AppInternalError();
}

// ****************************
// * Utils
// ****************************
export const handlingError = (label: string) => (error: any) => {
  const appError = convertError(error);
  exlogger.error(`Error in ${label}: ${appError}`, error);
  notifyHelper.error(appError.message);
};
