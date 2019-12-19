import { Configuration } from "@nuxt/types";
require("dotenv").config();

const config: Configuration = {
  mode: "spa",
  // srcDir: "app",

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
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

  terser: {
    terserOptions: {
      compress: { drop_console: process.env.NODE_ENV === "production" }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: "/assets/",
    extractCSS: true,

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
