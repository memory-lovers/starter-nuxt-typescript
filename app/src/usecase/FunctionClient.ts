import { functions } from "~/plugins/firebase";
import { AppLogicError } from "~/src/exceptions";

class FunctionClient {
  // public async getDoSomething(param: any) {
  //   try {
  //     const callFunc = functions.httpsCallable("call_getApiFile");
  //     const res = await callFunc({ name: param.name });
  //     if (!!res.data["success"]) return res.data["data"];
  //   } catch (error) {
  //     const code = error.code || "UNKOWN_ERROR";
  //     throw new AppLogicError(`エラーが発生しました: ${code}`);
  //   }
  // }
}

export const functionClient = new FunctionClient();
