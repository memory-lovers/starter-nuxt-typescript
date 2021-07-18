import { HeadInfo } from "types";
import Vue from "vue";
import Component from "vue-class-component";
import { MetaInfo } from "vue-meta";

const addTailingSlash = (url: string) => {
  if (!url || url.substr(-1) === "/") return url;
  else return url + "/";
};

@Component
export default class HeadMixin extends Vue {
  public headInfo(): HeadInfo {
    return {};
  }

  public head(): MetaInfo {
    const info = this.headInfo();

    const res: MetaInfo = { meta: [], link: [] };

    // TITLE
    if (!!info.title) {
      res.title = info.title;
    }

    // Description
    if (!!info.description) {
      res.meta?.push({
        hid: "description",
        name: "description",
        content: info.description
      });
    }

    // for OGP
    const ogTitle = info.ogTitle || info.title;
    if (!!ogTitle) {
      res.meta?.push({
        hid: "twitter:title",
        name: "twitter:title",
        content: ogTitle
      });

      res.meta?.push({
        hid: "og:title",
        property: "og:title",
        content: ogTitle
      });
    }

    // ogDesc
    const ogDesc = info.ogDesc || info.description;
    if (!!ogDesc) {
      res.meta?.push({
        hid: "twitter:description",
        name: "twitter:description",
        content: ogDesc
      });

      res.meta?.push({
        hid: "og:description",
        property: "og:description",
        content: ogDesc
      });
    }

    // OGP Image
    if (!!info.ogImagePath) {
      res.meta?.push({
        hid: "twitter:image",
        name: "twitter:image",
        content: info.ogImagePath
      });

      res.meta?.push({
        hid: "og:image",
        property: "og:image",
        content: info.ogImagePath
      });
    }

    // URL
    const baseUrl: string = process.env.BASE_URL || "";
    const pageUrl: string = addTailingSlash(`${baseUrl}${this.$route.path}`);
    if (info.isCurrentPath == undefined || info.isCurrentPath != false) {
      res.meta?.push({ hid: "og:url", property: "og:url", content: pageUrl });
    }

    // noindex
    if (info.isNoIndex != null && info.isNoIndex == true) {
      res.meta?.push({ name: "robots", content: "noindex" });
    }

    // canonical
    res.link?.push({ hid: "canonical", rel: "canonical", href: pageUrl });

    return res;
  }
}
