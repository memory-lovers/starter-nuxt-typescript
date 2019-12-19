<template>
  <div>
    <Header></Header>

    <section class="main-content columns">
      <SideMenu :items="items" />

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

// components
import Header from "~/components/organisms/Header.vue";
import SideMenu from "~/components/organisms/SideMenu.vue";

@Component({ components: { Header, SideMenu } })
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
