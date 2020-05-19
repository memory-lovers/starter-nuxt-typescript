import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { UserState, User } from "types";

@Module({ stateFactory: true, namespaced: true, name: "user" })
export default class UserModule extends VuexModule implements UserState {
  user: User | null = null;

  // ****************************
  // * Getters
  // ****************************
  get isLogin(): boolean {
    return this.user != null;
  }

  // ****************************
  // * Mutations
  // ****************************
  @Mutation
  setUser(user: User | null) {
    this.user = user;
  }

  // ****************************
  // * Actions
  // ****************************
  @Action
  async login() {
    // TODO login
    // this.setUser(user);
  }
}
