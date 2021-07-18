<template>
  <b-dropdown
    position="is-bottom-left"
    append-to-body
    aria-role="menu"
    :mobile-modal="false"
    v-if="!!userIcon && !!userName"
  >
    <template #trigger>
      <a class="navbar-item" role="button">
        <IconUser :url="userIcon" />
      </a>
    </template>

    <b-dropdown-item custom aria-role="menuitem">
      <div class="white-space-nowrap">
        <div>{{ userName }}</div>
      </div>
    </b-dropdown-item>

    <hr class="dropdown-divider" aria-role="menuitem" />

    <b-dropdown-item value="logout" aria-role="menuitem" @click="onClickLogout">
      <b-icon icon="logout"></b-icon>
      <span>Logout</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { userStore } from "~/store";

@Component
export default class HeaderDropdown extends Vue {
  // ****************************************************
  // * computed
  // ****************************************************
  private get userName() {
    return userStore.user?.name;
  }

  private get userIcon() {
    return userStore.user?.photoURL;
  }

  // ****************************************************
  // * methods
  // ****************************************************
  private onClickLogout() {
    this.$emit("logout");
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>