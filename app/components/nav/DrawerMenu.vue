<template>
  <b-sidebar
    class="is-mobile"
    type="is-white"
    :fullheight="true"
    :fullwidth="false"
    :overlay="true"
    :right="true"
    :open="active"
    @close="close"
  >
    <div class="p-1">
      <b-menu>
        <b-menu-list label="MENU">
          <template v-if="isLogin">
            <b-menu-item
              icon="sign-out-alt"
              label="ログアウト"
              @click="onClickLogout"
            />
          </template>
          <template v-else>
            <b-menu-item
              icon="sign-in-alt"
              label="ログイン"
              tag="nuxt-link"
              to="/login"
            />
          </template>
        </b-menu-list>

        <b-menu-list label="ABOUT">
          <template v-for="(item, index) in aboutItems">
            <b-menu-item
              :label="item.title"
              tag="a"
              :href="item.href"
              :key="index"
            />
          </template>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import { userStore } from "~/store";

@Component
export default class DrawerMenu extends Vue {
  @Prop({ required: true }) active!: boolean;

  private aboutItems = [
    {
      title: "公式Twitter",
      href: "https://twitter.com/zutsuu_friends",
    },
    {
      title: "要望/問い合わせ",
      href: "https://forms.gle/yzoQfkLh5TXP4VrY7",
    },
    {
      title: "プライバシーポリシー",
      href: "https://memory-lovers.com/policy/",
    },
    {
      title: "利用規約",
      href: "https://memory-lovers.com/tos/",
    },
    {
      title: "運営会社",
      href: "https://memory-lovers.com",
    },
  ];
  // ****************************************************
  // * computed
  // ****************************************************
  private get isLogin() {
    return userStore.isLogin;
  }
  // ****************************************************
  // * methods
  // ****************************************************
  private close() {
    this.$emit("update:active", false);
  }

  private onClickLogout() {
    this.$emit("logout");
  }

  @Watch("$route")
  private onChageRoute() {
    this.close();
  }
}
</script>