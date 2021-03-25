import { ApiResponseFailure } from "../../../types";
import exlogger from "./logger";

export function handlingError(
  funcName: string,
  error: any
): ApiResponseFailure {
  exlogger.warn(`Error in ${funcName}: ${error}`, error);

  if (!!error.isAxiosError && !error.response) {
    // Network Error
    return { success: false, errorCode: "NETWORK_ERROR" };
  } else if (!!error.isAxiosError) {
    const errorData = error.response.data;
    exlogger.error(`Error in ${funcName}: ${JSON.stringify(errorData)}`);

    // API ERROR
    const errorCode = errorData["ECODE"] || "UNKOWN_ERROR";
    if (!!errorCode) return { success: false, errorCode: errorCode };
  } else {
    // exlogger.error(`Error in ${funcName}: ${JSON.stringify(error, null, 2)}`);
    exlogger.error(`Error in ${funcName}: ${error}`);
  }

  // TODO: Firebase Firestore Error
  // TODO: Firebase Auth Error
  return { success: false, errorCode: "UNKOWN_ERROR" };
}
