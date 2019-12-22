import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { UserState } from "~/types";

@Module({ stateFactory: true, namespaced: true, name: "user" })
export default class UserModule extends VuexModule implements UserState {
  uid: string | null = null;

  // ****************************
  // * Getters
  // ****************************
  get isLogin(): boolean {
    return this.uid != null;
  }

  // ****************************
  // * Mutations
  // ****************************
  @Mutation
  setUser(uid: string | null) {
    this.uid = uid;
  }

  // ****************************
  // * Actions
  // ****************************
  @Action
  async login(uid: string | null) {
    this.setUser(uid);
  }
}
