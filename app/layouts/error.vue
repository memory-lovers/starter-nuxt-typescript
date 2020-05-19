<template>
  <div class="container has-text-centered">
    <template v-if="error.statusCode === 404">
      <!-- NOT FOUND -->
      <h1 class="subtitle">ページが見つかりません...</h1>
      <!-- /NOT FOUND -->
    </template>

    <template v-else>
      <!-- OTHER -->
      <h1 class="subtitle">
        <span>ごめんなさい...</span>
        <br />
        <span>エラーが発生しました...</span>
      </h1>
      <!-- /OTHER -->
    </template>

    <div class="link-back">
      <nuxt-link to="/" v-if="$route.name != 'index'">ホームへ移動</nuxt-link>
      <a href="/" v-else>ホームへ移動</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class ErrorLayout extends Vue {
  @Prop() error;
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40px 16px 40px 16px;
  width: 100%;
  max-width: 600px;

  h1 {
    margin-bottom: 40px;
  }
  p {
    margin-top: 0.5rem;
  }
}
</style>
