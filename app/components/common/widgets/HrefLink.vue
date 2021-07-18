<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    @click.stop=""
    :class="classes"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class HrefLink extends Vue {
  @Prop({ required: true }) href!: string;
  @Prop() classes!: any;
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