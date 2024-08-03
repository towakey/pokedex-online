<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'リンク'

const menu = [
  {
    title: 'ポケットモンスターオフィシャルサイト',
    path: 'https://www.pokemon.co.jp/'
  },
  {
    title: 'ポケモンスケールワールド｜バンダイ キャンディ公式サイト',
    path: 'https://www.bandai.co.jp/candy/pokemonscaleworld/'
  },
  {
    title: '『ポケモン GO』公式サイト',
    path: 'https://www.pokemongo.jp/'
  },
  {
    title: '『ポケモンマスターズ EX』公式サイト',
    path: 'https://pokemonmasters-game.com/ja-JP'
  },
  {
    title: 'ポケモンユナイト | 『Pokémon UNITE』公式サイト',
    path: 'https://www.pokemonunite.jp/ja/'
  },
  {
    title: '『Pokémon Sleep』公式サイト',
    path: 'https://www.pokemonsleep.net/'
  },
  {
    title: 'トップページ｜『Pokémon HOME』公式サイト',
    path: 'https://www.pokemon.co.jp/ex/pokemonhome/ja/'
  },
  {
    title: 'トップページ | 『ようこそ！ポケモンカフェ ～まぜまぜパズル～』公式サイト',
    path: 'https://www.poke-maze.jp/'
  },
  {
    title: 'ポケモン徹底攻略｜藍の円盤・スカーレットバイオレット・ポケモンSVもお任せ！',
    path: 'https://yakkun.com/'
  },
  {
    title: 'ポケモンWiki',
    path: 'https://wiki.xn--rckteqa2e.com/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8'
  }
]

definePageMeta({
  title: "Pokedex-Online"
})
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'リンク',
  href: '/link',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("リンク")
updateMetadata(metaTitle.value)
useHead({
  title: metaTitle,
  meta: [
  {
      hid: 'og:title',
      name: 'og:title',
      content: metaTitle.value
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: metaTitle.value
    }
  ]
})
</script>
<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="props">
        <v-breadcrumbs-item
        exact
        :disabled="props.item.disabled"
        :to="props.item.href"
        nuxt
        >
        {{ props.item.title }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col
      cols="12"
      sm="12"
      v-for="item in menu" :key="item.title"
      >
        <!-- <NuxtLink
        :to="{path: `${item.path}`}"
        class="nuxtlink"
        > -->
        <a
        :href="item.path"
        target="_blank"
        >
          <v-card
          elevation-0
          variant="outlined"
          style="background-color: white;"
          >
            <div
            class="d-flex align-center"
            style="float: left;"
            >
              <!-- <v-avatar
              class="ms-2"
              size="100"
              tile
              >
                <v-img :src="`${item.img}`"></v-img>
              </v-avatar> -->
              <v-card-title>{{ item.title }}</v-card-title>
            </div>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>