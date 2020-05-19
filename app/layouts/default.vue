<template>
  <div class="main-container">
    <Header />

    <section class="main-content columns">
      <SideMenu :items="items" />

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class DefaultLayout extends Vue {
  private items = [
    {
      title: "Home",
      icon: "home",
      to: { name: "index" }
    },
    {
      title: "Inspire",
      icon: "lightbulb",
      to: { name: "inspire" }
    }
  ];
}
</script>

<style lang="scss">
.main-container {
  min-height: 100vh;

  position: relative;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-bottom: 3rem;
}
</style>