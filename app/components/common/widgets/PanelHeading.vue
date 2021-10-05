<template>
  <div class="panel-heading" :class="type">
    <div class="panel-heading-label">
      <span>{{ label }}</span>
      <HrefLink :href="link" v-if="!!link">
        <b-icon
          icon="help-circle"
          custom-size="mdi-18px"
          class="has-text-help"
        />
      </HrefLink>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class PanelHeading extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ default: "" }) type!: string;
  @Prop({ default: "" }) helpLink!: string;
  // ****************************************************
  // * computed
  // ****************************************************
  private get link() {
    return !!this.helpLink ? this.helpLink : null;
  }
  // ****************************************************
  // * methods
  // ****************************************************
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>