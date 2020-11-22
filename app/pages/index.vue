<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <card title="Free" icon="github-circle">
          Open source on
          <a href="https://github.com/buefy/buefy">GitHub</a>
        </card>

        <card title="Responsive" icon="cellphone-link">
          <b class="has-text-grey">Every</b> component is responsive
        </card>

        <card title="Modern" icon="alert-decagram">
          Built with
          <a href="https://vuejs.org/">Vue.js</a> and
          <a href="http://bulma.io/">Bulma</a>
        </card>

        <card title="Lightweight" icon="arrange-bring-to-front"
          >No other internal dependency</card
        >
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class IndexPage extends Vue {}
</script>
