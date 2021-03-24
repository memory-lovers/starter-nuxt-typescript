<template>
  <a :href="href" target="_blank" rel="noopener">
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class HrefLink extends Vue {
  @Prop({ required: true }) href!: string;
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