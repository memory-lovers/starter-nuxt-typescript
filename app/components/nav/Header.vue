<template>
  <b-navbar type="is-primary" wrapper-class="container">
    <template #brand>
      <b-navbar-item
        tag="nuxt-link"
        :to="{ name: 'index' }"
        exact-active-class=""
      >
        <span class="has-text-weight-bold">Start Template</span>
      </b-navbar-item>
    </template>

    <template #burger v-if="isLogin">
      <HeaderDropdown
        @logout="onClickLogout"
        class="ml-auto mr-3 is-hidden-desktop"
        aria-label="menu"
        aria-expanded="false"
      />
    </template>

    <template #start>
      <b-navbar-item tag="nuxt-link" :to="toRouteHome" v-if="isLogin">
        <strong>HOME</strong>
      </b-navbar-item>
    </template>

    <template #end>
      <template v-if="isLogin">
        <HeaderDropdown class="mr-2" @logout="onClickLogout" />
      </template>
      <template v-else>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link class="button is-inverted" :to="{ name: 'login' }">
              <strong>Login</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { userStore } from "~/store";

@Component
export default class Header extends Vue {
  private get isLogin() {
    return userStore.isLogin;
  }

  private get toRouteHome() {
    return { name: "index" };
  }

  private onClickLogout() {
    this.$emit("logout");
  }
}
</script>