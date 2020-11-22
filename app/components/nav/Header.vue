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
        <img src="~assets/buefy.png" alt="Buefy" height="28" />
      </nuxt-link>

      <a class="navbar-item has-text-white" @click="onClick">
        <b-icon icon="menu" />
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Header extends Vue {
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
    &:nth-of-type(2) {
      margin-left: auto;
    }
  }
}
</style>