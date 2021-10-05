<template>
  <div class="panel-block panel-list-item-loading">
    <b-loading :active="loading" :is-full-page="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class PanelListItemLoading extends Vue {
  @Prop({ required: true }) loading!: boolean;
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