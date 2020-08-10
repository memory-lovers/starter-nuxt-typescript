<template>
  <nav
    class="navbar header has-shadow is-primary"
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

      <div class="navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Header extends Vue {}
</script>
