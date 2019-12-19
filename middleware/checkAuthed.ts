import authState from "~/plugins/authState";

export default async function({ store, redirect }) {
  try {
    if (!!store.getters["user/isLogin"]) return;

    redirect({ name: "login" });
  } catch (e) {
    console.error(`error=${e}`, e);
    return;
  }
}
