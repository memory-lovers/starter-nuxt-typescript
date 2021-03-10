<template>
  <transition name="modal">
    <div class="modal is-active" v-if="active">
      <div class="modal-background" @click="close"></div>
      <div class="modal-dialog-content">
        <div class="modal-dialog-wrapper">
          <slot />

          <slot name="footer">
            <div class="modal-dialog-button">
              <b-button type="is-text" @click="close">{{
                cancelLabel
              }}</b-button>
              <b-button :type="type" outlined @click="confirm">{{
                confirmLabel
              }}</b-button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class BaseDialog extends Vue {
  @Prop({ required: true }) active!: boolean;
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
    this.$emit("update:active", false);
  }

  public async confirm() {
    this.$emit("confirm");
    this.close();
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>