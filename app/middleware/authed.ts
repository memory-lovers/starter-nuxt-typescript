export default async function({ store, redirect }) {
  try {
    if (!store.getters["user/isLogin"]) redirect({ name: "index" });
  } catch (e) {
    console.error(`error=${e}`, e);
    return;
  }
}
