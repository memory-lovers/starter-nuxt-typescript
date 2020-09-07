import { IncomingMessage } from "http";
import jwtDecode from "jwt-decode";
import cookieHelper from "~/src/helper/CookieHelper";
import exlogger from "~/src/utils/logger";

export function getRequertToken(req: IncomingMessage) {
  // requestのAuthorizationからIDトークンを取得
  const authorizationHeader = req.headers.authorization || "";
  const components = authorizationHeader.split(" ");
  const token = components.length > 1 ? components[1] : "";
  return token;
}

export function getRequertUid(req: IncomingMessage): string | null {
  try {
    // requestのAuthorizationからUIDを取得
    let token = cookieHelper.getToken(req.headers.cookie);
    if (!token) token = getRequertToken(req);
    if (!token) return null;

    const decodedToken = jwtDecode(token) as any;
    if (!decodedToken) return null;

    return decodedToken.user_id;
  } catch (error) {
    exlogger.warn(`Error in getRequertUid: ${error}`);
    return null;
  }
}
