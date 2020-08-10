import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User, AuthInfo } from "types";
import { authUseCase } from "~/src/usecase/AuthUseCase";

export interface UserState {
  user: User | null;
}

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
  SET_USER(authInfo: AuthInfo | null) {
    this.user = !!authInfo ? authInfo.user : null;
  }

  // ****************************
  // * Actions
  // ****************************
  @Action({ rawError: true })
  async login() {
    const user = await authUseCase.login();
    this.SET_USER(user);
  }

  @Action({ rawError: true })
  async logout() {
    await authUseCase.logout();
    this.SET_USER(null);
  }

  @Action({ rawError: true })
  async loginByInit() {
    const authInfo = await authUseCase.loginByInit();
    this.SET_USER(authInfo);
  }
}
