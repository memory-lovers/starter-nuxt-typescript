import Vue from "vue";
import Component from "vue-class-component";
import {
  MetaInfo,
  MetaPropertyCharset,
  MetaPropertyEquiv,
  MetaPropertyName,
  MetaPropertyMicrodata,
  MetaPropertyProperty
} from "vue-meta";
import { HeadInfo } from "types";

const SITE_NAME = "Starter Nuxt TypeScript";
const SITE_TITLE = "Starter Nuxt TypeScript";
const SITE_DESC = "Starter Nuxt TypeScript";
const TWITTER_ID = "@MemoryLoverz";

type MetaInfoMeta =
  | MetaPropertyCharset
  | MetaPropertyEquiv
  | MetaPropertyName
  | MetaPropertyMicrodata
  | MetaPropertyProperty;

@Component
export default class HeadMixin extends Vue {
  public headInfo(): HeadInfo {
    return {};
  }

  public head(): MetaInfo {
    const info = this.headInfo();

    // Title: 指定なければデフォルト。
    const title: string = info.title || SITE_TITLE;

    // Description: 指定なければ、デフォルト
    const description: string = info.description || SITE_DESC;

    // URL
    const baseUrl: string = process.env.baseUrl || "";
    const thisUrl: string = `${baseUrl}${info.specPath || this.$route.path}`;
    const ogUrl: string = !!info.isCurrentPath ? thisUrl : baseUrl;

    // for OGP
    // 指定があればそれを適用。なければ、title/description
    const ogTitle: string = info.ogTitle || title;
    let ogDesc: string = info.ogDesc || description;

    const ogImageUrl: string = info.ogImagePath || `${baseUrl}/ogp.png`;

    // meta
    const meta: MetaInfoMeta[] = [
      // For SEO
      { hid: "description", name: "description", content: description },

      // Twitter Card
      { hid: "twitter:site", name: "twitter:site", content: TWITTER_ID },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      }, // summary, summary_large_image, app, player cards
      { hid: "twitter:title", name: "twitter:title", content: ogTitle },
      { hid: "twitter:image", name: "twitter:image", content: ogImageUrl },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: ogDesc
      },
      { hid: "twitter:creator", name: "twitter:creator", content: TWITTER_ID },

      // OGP / Social Meta Tag
      { hid: "og:title", property: "og:title", content: ogTitle },
      { hid: "og:image", property: "og:image", content: ogImageUrl },
      { hid: "og:description", property: "og:description", content: ogDesc },
      { hid: "og:url", property: "og:url", content: ogUrl },
      { hid: "og:type", property: "og:type", content: "article" },
      { hid: "og:site_name", property: "og:site_name", content: SITE_NAME }
    ];

    if (!!info.isNoIndex) {
      meta.push({ name: "robots", content: "noindex" });
    }

    return {
      title: title,
      meta: meta,
      link: [
        // CANONICAL
        { hid: "canonical", rel: "canonical", href: thisUrl }
      ]
    };
  }
}
