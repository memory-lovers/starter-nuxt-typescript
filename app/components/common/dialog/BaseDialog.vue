<template>
  <transition name="modal">
    <div class="modal is-active" v-if="active">
      <div class="modal-background" @click="close"></div>
      <div class="modal-dialog-content">
        <div class="modal-dialog-wrapper">
          <slot />

          <slot name="footer">
            <div class="modal-dialog-button">
              <b-button type="is-text" :loading="loading" @click="close">{{
                cancelLabel
              }}</b-button>
              <b-button
                :type="type"
                outlined
                :disabled="disabled"
                :loading="loading"
                @click="confirm"
                >{{ confirmLabel }}
              </b-button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseDialog extends Vue {
  @Prop({ required: true }) active!: boolean;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: "OK" }) confirmLabel!: string;
  @Prop({ default: "Cancel" }) cancelLabel!: string;
  @Prop({ default: "is-primary" }) type!: string;

  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  public show() {
    this.$emit("update:active", true);
  }

  public close() {
    if (this.loading) return;
    this.$emit("update:active", false);
  }

  public async confirm() {
    if (this.loading) return;
    this.$emit("confirm");
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>