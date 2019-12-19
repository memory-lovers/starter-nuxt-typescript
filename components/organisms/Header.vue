<template>
  <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="~assets/buefy.png" alt="Buefy" height="28" />
      </a>

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
