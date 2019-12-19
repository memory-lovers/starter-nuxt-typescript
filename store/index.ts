import { Store } from "vuex";
import { initialiseStores } from "~/src/utils/store-accessor";

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

export * from "~/src/utils/store-accessor";
