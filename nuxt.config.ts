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
})
