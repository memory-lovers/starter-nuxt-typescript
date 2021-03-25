import { NuxtConfig } from "@nuxt/types";
import * as fs from "fs";
require("dotenv").config();

const SITE_NAME = "Starter Nuxt TypeScript";
const SITE_TITLE = "Starter Nuxt TypeScript";
const SITE_DESC = "Starter Nuxt TypeScript";
const COPYRIGHT = "Memory Lovers";
const TWITTER_ID = "@MemoryLoverz";

const LOADING_COLOR = "#ff99a3";

const readdirRecursively = (dir: string, dirs: string[] = []) => {
  dirs.push(dir);
  fs.readdirSync(dir).forEach(file => {
    const dirPath = `${dir}/${file}`;
    if (fs.statSync(dirPath).isDirectory()) {
      readdirRecursively(dirPath, dirs);
    }
  });

  return dirs;
};

const components = readdirRecursively("./app/components").map(v =>
  v.replace("./app/components", "~/components")
);
console.info(`components=${JSON.stringify(components, null, 2)}`);

const config: NuxtConfig = {
  srcDir: "app",
  ssr: false,
  target: "server",
  components: components,

  env: {
    BASE_URL: process.env.BASE_URL || "",
    API_KEY: process.env.API_KEY || "",
    AUTH_DOMAIN: process.env.AUTH_DOMAIN || "",
    PROJECT_ID: process.env.PROJECT_ID || "",
    STORAGE_BUCKET: process.env.STORAGE_BUCKET || "",
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID || "",
    APP_ID: process.env.APP_ID || "",
    MEASUREMENT_ID: process.env.MEASUREMENT_ID || "",
    // PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY || ""
    ADSENSE_CLIENT_ID: process.env.ADSENSE_CLIENT_ID || "",
    ADSENSE_ANALYTICS_ACCOUNT: process.env.ADSENSE_ANALYTICS_ACCOUNT || "",
    ADSENSE_DOMAIN_NAME: process.env.ADSENSE_DOMAIN_NAME || ""
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/style-resources"],

  /*
   ** Headers of the page
   */
  head: {
    title: SITE_NAME,
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: COPYRIGHT },
      { name: "copyright", content: COPYRIGHT },
      {
        name: "format-detection",
        content: "telephone=no,email=no,address=no"
      },

      // For SEO
      { hid: "description", name: "description", content: SITE_DESC },
      { name: "application-name", content: SITE_NAME },

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
      { hid: "twitter:site", name: "twitter:site", content: TWITTER_ID },
      { hid: "twitter:creator", name: "twitter:creator", content: TWITTER_ID },

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
        content: SITE_TITLE
      },
      {
        hid: "og:description",
        property: "og:description",
        name: "og:description",
        content: SITE_DESC
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
        content: SITE_NAME
      },
      { name: "robots", content: "noindex" }
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
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
        crossorigin: true
      },
      {
        rel: "preconnect",
        href: "https://firestore.googleapis.com",
        crossorigin: true
      },
      {
        rel: "preconnect",
        href: "https://firebasestorage.googleapis.com",
        crossorigin: true
      },
      // {
      //   rel: "preconnect",
      //   href: "https://www.googletagmanager.com",
      //   crossorigin: true
      // },
      // {
      //   rel: "preconnect",
      //   href: "https://www.google-analytics.com",
      //   crossorigin: true
      // },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
      },
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
    color: LOADING_COLOR,
    background: "white"
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/buefy.scss", "~/assets/css/transition.scss"],

  styleResources: {
    scss: [
      "~/assets/css/_variables.scss",
      "~/assets/css/_colors.scss",
      "~/assets/css/_breakpoints.scss"
    ]
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios-accessor.ts",
    "~/plugins/firebase",
    "~/plugins/vee-validate"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/potato4d/nuxt-client-init-module
    "nuxt-client-init-module",
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://github.com/nuxt-community/sitemap-module
    "@nuxtjs/sitemap",
    // Doc: https://github.com/nuxt-community/sentry-module
    "@nuxtjs/sentry"
    // Doc: https://github.com/fukuiretu/nuxt-user-agent
    // "nuxt-user-agent",
    // Doc: https://github.com/nuxt-community/google-adsense-module
    // "@nuxtjs/google-adsense",
    // Doc: https://github.com/webcore-it/nuxt-clipboard2
    // "nuxt-clipboard2"
  ],

  /*
   ** Router configuration
   */
  router: {
    middleware: [],
    linkExactActiveClass: "is-active"
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
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
    // materialDesignIcons: false,
    // defaultIconPack: "fas",
    // defaultIconComponent: "font-awesome-icon"
  },

  // fontawesome: {
  //   component: "font-awesome-icon",
  //   imports: [
  //     {
  //       set: "@fortawesome/free-solid-svg-icons",
  //       icons: ["fas"]
  //     },
  //     {
  //       set: "@fortawesome/free-brands-svg-icons",
  //       icons: ["fab"]
  //     }
  //   ]
  // },

  /**
   * Sitemap
   * Doc: https://github.com/nuxt-community/sitemap-module
   */
  sitemap: {
    path: "/sitemap.xml",
    hostname: process.env.BASE_URL || "http://127.0.0.1:3000",
    generate: true,
    exclude: []
  },

  /**
   * PWA
   * Doc: https://pwa.nuxtjs.org/
   */
  pwa: {
    manifest: {
      name: SITE_NAME,
      short_name: SITE_NAME,
      lang: "ja",
      description: SITE_DESC,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: LOADING_COLOR,
      orientation: "any",
      icons: [36, 48, 72, 96, 128, 144, 152, 192, 256, 384, 512].map(v => {
        return {
          src: `/android-chrome-${v}x${v}.png`,
          sizes: `${v}x${v}`,
          type: "image/png"
        };
      })
      // gcm_sender_id: process.env.MESSAGING_SENDER_ID || ""
    },
    runtimeCaching: [
      {
        urlPattern: `^https://fonts.googleapis.com/`,
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: {
          cacheName: "google-fonts-cache",
          cacheExpiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },

  /**
   * AdSence
   * Doc: https://github.com/nuxt-community/google-adsense-module
   */
  "google-adsense": {
    id: process.env.ADSENSE_CLIENT_ID || "",
    analyticsUacct: process.env.ADSENSE_ANALYTICS_ACCOUNT || "",
    analyticsDomainName: process.env.ADSENSE_DOMAIN_NAME || "",
    test: !process.env.ADSENSE_CLIENT_ID || process.env.NODE_ENV != "production"
  },

  /**
   * Sentry
   * Doc: https://github.com/nuxt-community/sentry-module
   */
  sentry: {
    dsn: process.env.SENTRY_DNS || "",
    disabled: !process.env.SENTRY_DNS || process.env.NODE_ENV != "production",
    config: { environment: process.env.NODE_ENV || "development" }
  },

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
  },

  dotenv: {
    path: process.cwd()
  }
};

export default config;
