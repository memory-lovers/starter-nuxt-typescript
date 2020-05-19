import { Context } from "@nuxt/types";
import { ActionTree, Store } from "vuex";
import { ActionContext } from "vuex/types";
import { initialiseStores, userStore } from "~/src/utils/store-accessor";
import logger from "~/src/utils/logger";

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

// RootStateを追加
export const state = () => ({});
export type RootState = ReturnType<typeof state>;
type RootActionContext = ActionContext<RootState, RootState>;

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
  async nuxtServerInit(context: RootActionContext, server: Context) {
    // TODO
  },

  nuxtClientInit: async (context: RootActionContext, server: Context) => {
    try {
      if (!!userStore.isLogin) return;
      // TODO
    } catch (error) {
      logger.error(`Error in nuxtClientInit: ${error}`, error);
    }
  }
};

export * from "~/src/utils/store-accessor";
