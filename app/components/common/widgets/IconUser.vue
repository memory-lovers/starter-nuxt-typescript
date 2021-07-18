<template>
  <figure class="user-icon is-avatar" v-if="url">
    <img
      :src="url"
      width="40px"
      height="40px"
      alt="ユーザアイコン"
      decoding="async"
      loading="lazy"
    />
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class IconUser extends Vue {
  @Prop({ required: true }) url!: string;
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