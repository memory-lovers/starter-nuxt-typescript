<template>
  <footer class="footer is-fluid has-text-white">
    <div class="container p-0">
      <div class="fotter-items">
        <template v-for="(item, index) in fotterItems">
          <template v-if="!!item.href">
            <span
              class="fotter-item-divider"
              :key="`div_${index}`"
              v-if="index != 0"
              >/</span
            >
            <span :key="index">
              <a
                class="footer-item has-text-white"
                :href="item.href"
                target="_blank"
                rel="noopener"
              >
                {{ item.title }}
              </a>
            </span>
          </template>
          <template v-else-if="!!item.to">
            <span
              class="fotter-item-divider"
              :key="`div_${index}`"
              v-if="index != 0"
              >/</span
            >
            <span :key="index">
              <nuxt-link class="footer-item has-text-white" :to="item.to">
                {{ item.title }}
              </nuxt-link>
            </span>
          </template>
        </template>
      </div>
      <div class="fotter-copyright">
        <span v-html="copryright"></span>
        <span v-if="!!version">{{ version }}</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { LinkItem } from "types";

@Component
export default class Footer extends Vue {
  private get copryright(): string {
    return `&copy; ${new Date().getFullYear()} Memory Lovers, LLC.`;
  }

  private get version(): string | null {
    const ver = process.env.VERSION;
    const mode = process.env.APP_MODE;
    if (!!ver && !!mode) return `${ver}@${mode}`;
    else return `${ver}`;
  }

  private fotterItems: LinkItem[] = [
    {
      title: "めもらばについて",
      href: "https://memory-lovers.com",
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
      title: "お問い合わせ",
      href: "https://forms.gle/yzoQfkLh5TXP4VrY7",
    },
    {
      title: "公式Twitter",
      href: "https://twitter.com/MemoryLoverz",
    },
  ];
}
</script>


<style lang="scss">
.footer {
  padding: 2rem 0.5rem;
}

.fotter-items {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  @include is-touch() {
    flex-flow: column;
    align-items: flex-start;
  }
}

.footer-item {
  white-space: nowrap;
  padding: 8px 10px;
}

.fotter-item-divider {
  @include is-touch() {
    display: none;
  }
}

.fotter-copyright {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  @include is-touch() {
    flex-flow: column-reverse;
    align-items: flex-end;
  }

  span {
    display: inline-block;
    margin: 8px 4px;

    @include is-touch() {
      margin: 0px 4px;
    }
  }
}
</style>