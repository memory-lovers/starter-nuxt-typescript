import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User, AuthInfo } from "types";
import { AuthType, authUseCase } from "~/src/usecase/AuthUseCase";

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
  @Mutation
  SET_USER(authInfo: AuthInfo | null) {
    this.user = !!authInfo ? authInfo.user : null;
  }

  // ****************************
  // * Actions
  // ****************************
  @Action({ rawError: true })
  async login() {
    const user = await authUseCase.loginWithPopup();
    this.SET_USER(user);
  }

  @Action({ rawError: true })
  async loginWithRedirect(authType: AuthType = "google") {
    await authUseCase.loginWithRedirect(authType);
  }

  @Action({ rawError: true })
  async checkRedirectResult() {
    const authInfo = await authUseCase.checkRedirectResult();
    if (!!authInfo) this.SET_USER(authInfo);
  }

  @Action({ rawError: true })
  async logout() {
    await authUseCase.logout();
    this.SET_USER(null);
  }

  @Action({ rawError: true })
  async loginByInit() {
    const authInfo = await authUseCase.loginByInit();
    if (!authInfo) return;

    this.SET_USER(authInfo);
  }
}
