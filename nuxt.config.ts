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
      ]
    }
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
  }})
