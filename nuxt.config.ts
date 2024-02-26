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
          href: '/favicon.png',
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
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // "@/assets/styles/common.css"
        },
      },
    },
  },
})
