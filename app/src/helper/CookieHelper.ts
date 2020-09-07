import Cookies from "universal-cookie";
import exlogger from "~/src/utils/logger";

const KEY_TOKEN = "access_token";
const options = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7 // 1week
};

class CookieHelper {
  public setToken(token: string | null, req?: string) {
    const cookies = !!req ? new Cookies(req) : new Cookies();
    exlogger.info(`CookieHelper.setToken: ${!!token ? "not null" : "is null"}`);
    if (!!token) {
      cookies.set(KEY_TOKEN, token, options);
    } else {
      cookies.remove(KEY_TOKEN);
    }
  }

  public getToken(req?: string): string | null {
    const cookies = !!req ? new Cookies(req) : new Cookies();
    const token = cookies.get(KEY_TOKEN);
    exlogger.info(`CookieHelper.getToken: ${!!token ? "not null" : "is null"}`);
    return !!token ? token : null;
  }

  public removeToken(req?: string) {
    const cookies = !!req ? new Cookies(req) : new Cookies();
    exlogger.info(`CookieHelper.removeToken`);
    cookies.remove(KEY_TOKEN);
  }
}

const cookieHelper = new CookieHelper();
export default cookieHelper;
