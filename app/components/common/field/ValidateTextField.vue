<template>
  <ValidationProvider
    :rules="rules"
    :name="label"
    v-slot="{ errors, valid }"
    slim
  >
    <b-field
      :label="label"
      :label-position="labelPosition"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="!!errors && errors.length > 0 ? errors : message"
      :expanded="expanded"
    >
      <b-input
        :type="inputType"
        :value="value"
        :min="min"
        :step="step"
        :placeholder="placeholder"
        @input="onChange"
        :expanded="expanded"
      />
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class ValidateTextField extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ default: undefined }) rules!: string;
  @Prop({ required: true }) value!: string | null;
  @Prop({ default: "text" }) inputType!: string;
  @Prop({ default: "on-border" }) labelPosition!: string;
  @Prop({ default: null }) min!: number | null;
  @Prop({ default: null }) step!: number | null;
  @Prop({ default: "" }) message!: string;
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: false }) expanded!: boolean;
  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  // ****************************************************
  // * emit
  // ****************************************************
  private onChange(val: string) {
    this.$emit("input", val);
  }
}
</script>