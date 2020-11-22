<template>
  <div class="main-container">
    <Header @click="activeMenu = !activeMenu" />

    <section class="main-content">
      <nuxt />
    </section>

    <DrawerMenu :active.sync="activeMenu" @logout="onClickLogout" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { notifyHelper } from "~/src/helper/NotifyHelper";
import { userStore } from "~/store";

@Component
export default class DefaultLayout extends Vue {
  public activeMenu: boolean = false;

  private async onClickLogout() {
    this.activeMenu = false;

    await userStore.logout();
    notifyHelper.success("またね！");
    this.$router.push("/login");
  }
}
</script>

<style lang="scss">
.main-container {
  min-height: 100vh;

  position: relative;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-bottom: 3rem;
}
</style>