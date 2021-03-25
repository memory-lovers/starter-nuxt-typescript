// 共通エラークラス
export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // https://future-architect.github.io/typescript-guide/exception.html
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toString() {
    return `${this.constructor}: ${this.message}`;
  }
}

export class AppError extends BaseError {
  constructor(public errorCode: number, e?: string) {
    super(e);
  }
}
