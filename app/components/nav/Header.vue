<template>
  <nav
    class="navbar header is-primary is-mobile"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item"
        :to="{ name: 'index' }"
        exact-active-class=""
      >
        <span class="has-text-weight-bold">Start Template</span>
      </nuxt-link>

      <nuxt-link class="navbar-item" :to="{ name: 'home' }" v-if="isLogin">
        <b-icon icon="home" />
        <span>HOME</span>
      </nuxt-link>

      <a class="navbar-item has-text-white" @click="onClick">
        <b-icon icon="menu" />
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { userStore } from "~/store";

@Component
export default class Header extends Vue {
  private get isLogin() {
    return userStore.isLogin;
  }

  private onClick() {
    this.$emit("click");
  }
}
</script>

<style lang="scss" scoped>
.logo {
  padding: 0 8px;
  > img {
    max-height: $navbar-height;
  }
}

.navbar {
  &.is-mobile {
    display: block;
  }
}

.navbar-brand {
  > .navbar-item {
    &:nth-last-of-type(1) {
      margin-left: auto;
    }
  }
}
</style>