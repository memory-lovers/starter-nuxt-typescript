import exlogger from "~/src/utils/logger";
import { userStore } from "~/store";

export default async function({ redirect }) {
  try {
    if (!userStore.isLogin) return redirect({ name: "index" });
  } catch (e) {
    exlogger.error(`Error in authed: ${e}`, e);
  }
  return;
}
