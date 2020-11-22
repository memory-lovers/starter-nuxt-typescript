<template>
  <div class="container">
    <section class="section">
      <h2 class="title is-3 has-text-grey">
        "Just start
        <b-icon icon="rocket" size="is-large" />"
      </h2>
      <h3 class="subtitle is-6 has-text-grey">
        Author:
        <a href="https://github.com/anteriovieira">Antério Vieira</a>
      </h3>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Logo extends Vue {}
</script>