<template>
  <aside class="section">
    <p class="menu-label is-hidden-touch">General</p>
    <ul class="menu-list">
      <li v-for="(item, key) of items" :key="key">
        <nuxt-link :to="item.to" exact-active-class="is-active">
          <b-icon :icon="item.icon" />
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SideMenu extends Vue {
  @Prop({ default: [] }) items;
  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>