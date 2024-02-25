<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'ポケモン図鑑'
definePageMeta({
  title: "Pokedex-Online"
})
// const menu = [
//   {
//     title: '全国図鑑',
//     path: '/pokedex/global',
//     content: '図鑑総数 1008匹'
//   },
//   {
//     title: 'ブルーベリー図鑑',
//     path: '/pokedex/blueberry',
//     content: '図鑑総数 242匹'
//   },
//   {
//     title: 'キタカミ図鑑',
//     path: '/pokedex/kitakami',
//     content: '図鑑総数 200匹'
//   },
//   {
//     title: 'パルデア図鑑',
//     path: '/pokedex/paldea',
//     content: '図鑑総数 400匹'
//   },
//   {
//     title: 'ヒスイ図鑑',
//     path: '/pokedex/hisui',
//     content: '図鑑総数 242匹'
//   },
//   {
//     title: 'ヨロイ島図鑑',
//     path: '/pokedex/isle_of_armor',
//     content: '図鑑総数 242匹'
//   },
//   {
//     title: 'カンムリ雪原図鑑',
//     path: '/pokedex/crown_tundra',
//     content: '図鑑総数 210匹'
//   },
//   {
//     title: 'ガラル図鑑',
//     path: '/pokedex/galar',
//     content: '図鑑総数 400匹'
//   },
//   {
//     title: 'アローラ図鑑(ウルトラサン ウルトラムーン)',
//     path: '/pokedex/alola_usum',
//     content: '図鑑総数 403匹'
//   },
//   {
//     title: 'アローラ図鑑(サン ムーン)',
//     path: '/pokedex/alola_sm',
//     content: '図鑑総数 302匹'
//   },
//   {
//     title: 'マウンテンカロス図鑑',
//     path: '/pokedex/mountain_kalos',
//     content: '図鑑総数 151匹'
//   },
//   {
//     title: 'コーストカロス図鑑',
//     path: '/pokedex/coast_kalos',
//     content: '図鑑総数 153匹'
//   },
//   {
//     title: 'セントラルカロス図鑑',
//     path: '/pokedex/central_kalos',
//     content: '図鑑総数 151匹'
//   },
//   {
//     title: 'イッシュ図鑑(ブラック2 ホワイト2)',
//     path: '/pokedex/unova_b2w2',
//     content: '図鑑総数 300匹'
//   },
//   {
//     title: 'イッシュ図鑑(ブラック ホワイト)',
//     path: '/pokedex/unova_bw',
//     content: '図鑑総数 155匹'
//   },
//   {
//     title: 'シンオウ図鑑',
//     path: '/pokedex/sinnoh',
//     content: '図鑑総数 210匹'
//   },
//   {
//     title: 'ホウエン図鑑',
//     path: '/pokedex/hoenn',
//     content: '図鑑総数 202匹'
//   },
//   {
//     title: 'ジョウト図鑑',
//     path: '/pokedex/johto',
//     content: '図鑑総数 251匹'
//   },
//   {
//     title: 'カントー図鑑',
//     path: '/pokedex/kanto',
//     content: '図鑑総数 151匹'
//   },
// ]
</script>
<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      sm="6"
      v-for="item in appConfig.pokedex_list" :key="item.title"
      >
        <NuxtLink
        :to="{path: `${item.path}`}"
        >
          <v-card
          elevation-0
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>