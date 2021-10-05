<template>
  <component
    :is="tag"
    class="panel-block panel-list-item"
    :class="{ 'is-nolabel': !label }"
    v-bind="$attrs"
  >
    <div class="panel-list-item-label" v-if="!!label">{{ label }}</div>
    <div class="panel-list-item-content" :class="contentClass">
      <div
        class="panel-list-item-content-wrapper"
        :class="{ 'is-nolabel': !label }"
      >
        <slot />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class PanelListItem extends Vue {
  @Prop({ default: "" }) label!: string;
  @Prop({ default: "div" }) tag!: string;
  @Prop({ default: "" }) contentClass!: string | string[] | object;
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
