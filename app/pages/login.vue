<template>
  <div class="container">
    <h2 class="page-title">ログイン</h2>

    <div class="has-text-centered">
      <b-button
        class="is-twitter has-shadow"
        @click="login('twitter')"
        :loading="loading"
        icon-left="twitter"
        >Twitterでログイン
      </b-button>
      <b-button
        class="is-white has-shadow"
        @click="login('google')"
        :loading="loading"
        icon-left="google"
        >Googleでログイン
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, mixins } from "nuxt-property-decorator";
import { HeadInfo } from "types";
import HeadMixin from "~/mixins/HeadMixin";
import { notifyHelper } from "~/src/helper/NotifyHelper";
import { AuthType } from "~/src/usecase/AuthUseCase";
import exlogger from "~/src/utils/logger";
import { userStore } from "~/store";

@Component
export default class LoginPage extends mixins(HeadMixin) {
  private loading: boolean = true;

  public headInfo(): HeadInfo {
    return {
      title: "ログイン",
    };
  }

  asyncData({ store, redirect, query }) {
    // 認証済みなら、ホームへリダイレクト
    if (userStore.isLogin) redirect({ name: "index" });
  }

  async mounted() {
    if (!process.browser) return;
    try {
      this.loading = true;
      await userStore.checkRedirectResult();
      exlogger.info(`LoginPage:mounted: isLogin=${userStore.isLogin}`);
      if (!userStore.isLogin) return;

      this.$router.replace("/");
    } catch (error) {
      exlogger.error(`Error in checkRedirectResult: ${error}`, error);
      if (error.code == "auth/popup-blocked") {
        notifyHelper.error("ポップアップがブロックされました...");
      }
    } finally {
      this.loading = false;
    }
  }

  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  private async login(authType: AuthType) {
    if (!!this.loading) return;

    try {
      this.loading = true;
      await userStore.loginWithRedirect(authType);

      this.$router.push(`/`);
    } catch (error) {
      exlogger.error(`Error in login: ${error}`, error);
      if (error.code == "auth/popup-blocked") {
        notifyHelper.error("ポップアップがブロックされました...");
      }
    } finally {
      this.loading = false;
    }
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************

.login-page {
  padding: 1rem 1rem;
  text-align: center;
}

.login-help {
  font-size: 0.9rem;
  padding-top: 1.5rem;
}

.login-image {
  width: 200px;
  height: 200px;
  margin-bottom: 0.5rem;
}

// ****************************
// * Flex Layout
// ****************************
</style>