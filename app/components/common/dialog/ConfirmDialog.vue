<template>
  <transition name="modal">
    <div class="modal is-active" v-if="active">
      <div class="modal-background" @click="close"></div>
      <div class="modal-dialog-content">
        <div class="modal-dialog-wrapper">
          <slot />

          <div class="modal-dialog-button">
            <b-button type="is-text" @click="close">{{ cancelLabel }}</b-button>
            <b-button :class="type" @click="confirm">{{
              confirmLabel
            }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  @Prop({ default: "OK" }) confirmLabel!: string;
  @Prop({ default: "Cancel" }) cancelLabel!: string;
  @Prop({ default: "is-primary" }) type!: string;

  protected active: boolean = false;
  private callback: Function | null = null;

  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  public show(callback: Function) {
    this.active = true;
    this.callback = callback;
  }

  public close() {
    this.active = false;
  }

  public async confirm() {
    if (!!this.callback) await this.callback();
    this.close();
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************

// ****************************
// * Flex Layout
// ****************************
</style>