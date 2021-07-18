import { AppMode } from "types";
import exlogger from "./logger";

export function pp(obj?: any | null): string {
  if (!obj) return "null";
  return JSON.stringify(obj, null, 2);
}

export function ppByte(size: number): string {
  const { target, unit } = getTarget(size);
  if (target == null) return size + unit;
  return Math.floor((size / target) * Math.pow(10, 2)) / Math.pow(10, 2) + unit;
}

/**
 * 入力されたファイルサイズを元に計算につかうバイト数と単位を返却
 */
function getTarget(size: number): { target: number | null; unit: string } {
  const kb = 1024;
  const mb = Math.pow(kb, 2);
  const gb = Math.pow(kb, 3);
  const tb = Math.pow(kb, 4);

  if (size >= tb) return { target: tb, unit: "TB" };
  if (size >= gb) return { target: gb, unit: "GB" };
  if (size >= mb) return { target: mb, unit: "MB" };
  if (size >= kb) return { target: kb, unit: "KB" };
  return { target: null, unit: "byte" };
}

export function getMode(): AppMode {
  if (process.env.NODE_ENV != "production") {
    exlogger.info(`getMode: dev`);
    return "dev";
  }
  const mode = process.env.APP_MODE || "prod";
  exlogger.info(`getMode: ${mode}`);
  return mode as AppMode;
}
