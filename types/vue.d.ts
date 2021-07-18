import Vue, { ComponentOptions } from "vue";
// import "buefy/types";
import "@nuxtjs/axios/types";

declare module "vuex/types/index" {
  interface Store<S> {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
}

declare module "@nuxt/vue-app" {
  interface Context {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
  interface NuxtAppOptions {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
}

// Nuxt 2.9+
declare module "@nuxt/types" {
  interface Context {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
  interface NuxtAppOptions {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $gtm: any;
    $ua: any;
    $copyText: any;
  }
}
