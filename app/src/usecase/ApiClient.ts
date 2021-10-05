import { $axios } from "~/src/utils/api";
import exlogger from "~/src/utils/logger";

class ApiClient {
  // public async getHoge(): Promise<Hoge[]> {
  //   return await this.doGet<Hoge[]>("/...", []);
  // }

  // ****************************
  // * private
  // ****************************
  private async doGet<T>(url: string, defVal: T): Promise<T> {
    const base =
      process.env.NODE_ENV == "production" ? "https://api.sssapi.app" : "/api";
    const apiUrl = base + url;
    try {
      exlogger.info(`doGet: ${apiUrl}`);
      const res = await $axios.$get(apiUrl);
      return res as T;
    } catch (error) {
      exlogger.error(`Error in doGet ${apiUrl}: ${error}`);
      return defVal;
    }
  }
}

export const apiClient = new ApiClient();
