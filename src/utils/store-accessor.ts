import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import UserModule from "~/store/modules/user";

let userStore: UserModule;

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserModule, store);
}

export { initialiseStores, userStore };
