<template>
  <footer class="footer is-fluid has-text-white">
    <div class="has-text-centered">
      <template v-for="(item, index) in fotterItems">
        <template v-if="!!item.href">
          <span :key="`div_${index}`" v-if="index != 0">/</span>
          <span :key="index">
            <a
              class="footer-item has-text-white"
              :href="item.href"
              target="_blank"
              rel="noopener"
            >{{ item.title }}</a>
          </span>
        </template>

        <template v-if="!!item.to">
          <span :key="`div_${index}`" class="is-hidden-touch" v-if="index != 0">/</span>
          <span :key="index" class="is-hidden-touch">
            <nuxt-link class="footer-item has-text-white" :to="item.to">{{ item.title }}</nuxt-link>
          </span>
        </template>
      </template>
    </div>
    <div class="copyright has-text-centered">
      <span v-html="copryright"></span>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class Footer extends Vue {
  public get copryright(): string {
    return `&copy; ${new Date().getFullYear()} Memory Lovers.`;
  }
  private fotterItems = [
    {
      title: "めもらばについて",
      href: "https://memory-lovers.com"
    },
    {
      title: "プライバシーポリシー",
      href: "https://memory-lovers.com/policy/"
    },
    {
      title: "利用規約",
      href: "https://memory-lovers.com/tos/"
    },
    {
      title: "お問い合わせ",
      href: "https://forms.gle/yzoQfkLh5TXP4VrY7"
    },
    {
      title: "公式Twitter",
      href: "https://twitter.com/MemoryLoverz"
    }
  ];
}
</script>

<style lang="scss">
.footer {
  padding-top: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.2rem;
}

.footer-item {
  white-space: nowrap;
  padding: 8px 10px;
}
</style>