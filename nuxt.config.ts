import { Configuration } from "@nuxt/types";
require("dotenv").config();

const siteName = "Starter Nuxt TypeScript";
const title = "Starter Nuxt TypeScript";
const description = "Starter Nuxt TypeScript";
const copryright = "Memory Lovers";
const twitterId = "@MemoryLoverz";

const config: Configuration = {
  mode: "spa",
  // srcDir: "app",

  /*
   ** Headers of the page
   */
  head: {
    title: siteName,
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: copryright },
      { name: "copyright", content: copryright },
      {
        name: "format-detection",
        content: "telephone=no,email=no,address=no"
      },

      // For SEO
      { hid: "description", name: "description", content: description },
      { name: "application-name", content: siteName },

      // For Android Chrome: Tab Color
      { name: "theme-color", content: "#FFFFFF" },
      // For Window8/10: Shortcut Icon
      { name: "msapplication-config", content: "/browserconfig.xml" },
      { name: "msapplication-TileColor", content: "#FFFFFF" },
      { name: "msapplication-TileImage", content: "/mstile-144×144.png" },

      // Twitter Card
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      }, // summary, summary_large_image, app, player cards
      { hid: "twitter:site", name: "twitter:site", content: twitterId },
      { hid: "twitter:creator", name: "twitter:creator", content: twitterId },

      // For OGP / Social Meta Tag
      {
        hid: "og:type",
        property: "og:type",
        name: "og:type",
        content: "website"
      },
      {
        hid: "og:title",
        property: "og:title",
        name: "og:title",
        content: title
      },
      {
        hid: "og:description",
        property: "og:description",
        name: "og:description",
        content: description
      },
      {
        hid: "og:url",
        property: "og:url",
        name: "og:url",
        content: process.env.BASE_URL || ""
      },
      {
        hid: "og:image",
        property: "og:image",
        name: "og:image",
        content: `${process.env.BASE_URL}/ogp.png`
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        name: "og:site_name",
        content: siteName
      }
      // { name: "robots", content: "noindex" }
    ],
    link: [
      // Favicon
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      // Favicon: iPhone/iPad
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon-180x180.png"
      },
      // Favicon: Safari
      { rel: "mask-icon", href: "/safari-icon.svg", color: "#FFFFFF" },
      // Favicon: Android Chrome
      {
        rel: "icon",
        type: "image/png",
        sizes: "192×192",
        href: "/android-chrome-192x192.png"
      },
      { rel: "manifest", href: "/manifest.json" },
      { hid: "canonical", rel: "canonical", href: process.env.BASE_URL || "" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  loadingIndicator: {
    // name: "pulse",
    // name: "wandering-cubes",
    // name: "three-bounce",
    // name: "chasing-dots",
    color: "#ff99a3",
    background: "white"
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/buefy.scss", "~/assets/css/transition.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/firebase.ts"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  /*
   ** Router configuration
   */
  router: {
    middleware: ["checkAuthed"]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
    // baseURL: "https://tsundoku.memory-lovers.now.sh"
  },

  // proxy: {
  //   "/api/": {
  //     target: "http://localhost:5001",
  //     pathRewrite: { "^/api/": "" }
  //   }
  // },

  /**
   * nuxt-buefy
   * Doc: https://github.com/buefy/nuxt-buefy
   * Doc: https://buefy.org/documentation/constructor-options
   */
  buefy: {
    css: false
  },

  /**
   * Sitemap
   * Doc: https://github.com/nuxt-community/sitemap-module
   */
  // sitemap: {
  //   path: "/sitemap.xml",
  //   hostname: process.env.BASE_URL || "http://127.0.0.1:3000",
  //   generate: true,
  //   exclude: []
  // },

  /**
   * Sentry
   * Doc: https://github.com/nuxt-community/sentry-module
   */
  // sentry: {
  //   dsn: process.env.SENTRY_DNS || "",
  //   disabled: !process.env.SENTRY_DNS || process.env.NODE_ENV != "production",
  //   config: { environment: process.env.NODE_ENV || "development" }
  // },

  /*
   ** Build configuration
   */
  build: {
    publicPath: "/assets/",
    extractCSS: true,

    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === "production" }
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    dir: "public",
    fallback: true // '404.html' を使用したい場合
  },

  server: {
    port: 3000, // デフォルト: 3000
    host: "localhost" // デフォルト: localhost
  }
};

export default config;
