// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  target: 'static',
  ssr: true,
  prerender: true,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Pokedex-Online',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon.png',
        }
      ],
      script: [
        {
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_ID || ''}`,
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://pokedex-online.jp',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      googleAdsenseId: process.env.GOOGLE_ADSENSE_ID || '',
      adSlot: process.env.AD_SLOT || ''
    },
    apiProxyUrl: process.env.API_PROXY_URL || ''
  },
  bridge: {
    meta: true
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ["@/assets/styles/common.scss"],
  content: {
    highlight: {
      theme: 'github-dark-dimmed',
      preload: ['vb', 'ruby', 'python'],
    },
    documentDriven: false,
    experimental: {
      clientDB: true
    },
    markdown: {
      rehypePlugins: {
        'rehype-slug': {},
        'rehype-autolink-headings': {},
      },
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    "@nuxt/content",
    '@vite-pwa/nuxt',
  ],
  plugins: [
    '~/plugins/vue-touch-events.ts'
  ],
  sourcemap: false,
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@/assets/styles/common.css";',
    //     },
    //   },
    // },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Pokedex-Online',
      short_name: 'PokedexOnline',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon.png',
          sizes: '1000x1000',
          type: 'image/png',
        },
        // {
        //   src: 'icon-192x192.png',
        //   sizes: '192x192',
        //   type: 'image/png',
        // },
        // {
        //   src: 'icon-512x512.png',
        //   sizes: '512x512',
        //   type: 'image/png',
        // },
        // {
        //   src: 'icon-512x512.png',
        //   sizes: '512x512',
        //   type: 'image/png',
        //   purpose: 'any maskable',
        // },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      navigateFallback: '/'
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
    nitro: {
      routeRules: {
        '/api/proxy': { cors: true },
      },
    },
  }})
