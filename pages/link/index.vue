<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'リンク'

const menu = [
  {
    title: 'ポケットモンスターオフィシャルサイト',
    path: 'https://www.pokemon.co.jp/',
    category: ['公式']
  },
  {
    title: 'ポケモンスケールワールド｜バンダイ キャンディ公式サイト',
    path: 'https://www.bandai.co.jp/candy/pokemonscaleworld/',
    category: ['公式','グッズ']
  },
  {
    title: 'ポケモンキッズ食玩ポータル｜バンダイ キャンディ公式サイト',
    path: 'https://www.bandai.co.jp/candy/pokemonkids/',
    category: ['公式','グッズ']
  },
  {
    title: 'トップページ | 『ポケットモンスター スカーレット・バイオレット』公式サイト',
    path: 'https://www.pokemon.co.jp/ex/sv/ja/',
    category: ['公式','ゲーム']
  },
  {
    title: 'トップページ ｜ 『Pokémon LEGENDS Z-A』公式サイト',
    path: 'https://www.pokemon.co.jp/ex/legends_z-a/ja/',
    category: ['公式','ゲーム']
  },
  {
    title: '『ポケモン GO』公式サイト',
    path: 'https://www.pokemongo.jp/',
    category: ['公式','ゲーム']
  },
  {
    title: '『ポケモンマスターズ EX』公式サイト',
    path: 'https://pokemonmasters-game.com/ja-JP',
    category: ['公式','ゲーム']
  },
  {
    title: 'ポケモンユナイト | 『Pokémon UNITE』公式サイト',
    path: 'https://www.pokemonunite.jp/ja/',
    category: ['公式','ゲーム']
  },
  {
    title: '『Pokémon Sleep』公式サイト',
    path: 'https://www.pokemonsleep.net/',
    category: ['公式','ゲーム']
  },
  {
    title: 'トップページ｜『Pokémon HOME』公式サイト',
    path: 'https://www.pokemon.co.jp/ex/pokemonhome/ja/',
    category: ['公式','ゲーム']
  },
  {
    title: 'トップページ | 『ようこそ！ポケモンカフェ ～まぜまぜパズル～』公式サイト',
    path: 'https://www.poke-maze.jp/',
    category: ['公式','ゲーム']
  },
  {
    title: 'ポケモン徹底攻略｜藍の円盤・スカーレットバイオレット・ポケモンSVもお任せ！',
    path: 'https://yakkun.com/',
    category: ['攻略サイト']
  },
  {
    title: 'ポケモンWiki',
    path: 'https://wiki.xn--rckteqa2e.com/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8',
    category: ['データ']
  },
  {
    title: '小さくて大きな獣たち -ポケモンの歴史と考察とブログ-',
    path: 'http://pokepoke31.blog.fc2.com/',
    category: ['個人サイト']
  },
  {
    title: 'しろたまぺーす',
    path: 'https://shirotama.xyz/',
    category: ['個人サイト']
  },
  {
    title: 'PokeAPI',
    path: 'https://pokeapi.co/',
    category: ['データ']
  },
  {
    title: 'ポケモン データまとめ wiki - atwiki（アットウィキ）',
    path: 'https://w.atwiki.jp/poyon/',
    category: ['データ']
  },
  {
    title: 'GitHub - towakey/pokedex: This repository is Pokemons JSON data.ポケモンのJSONデータセットです。',
    path: 'https://github.com/towakey/pokedex/',
    category: ['データ']
  },
  {
    title: '『幻のポケモン ルギア爆誕』考察｜旅はまだま続く｜あらすじ解説｜ネタバレ感想｜湯山邦彦',
    path: 'https://naruhoudou.com/rugia_bakutan/',
    category: ['考察記事']
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

// Category filtering
const selectedCategories = ref<Set<string>>(new Set())
const allCategories = ref<string[]>([])

// Toggle category selection
const toggleCategory = (category: string) => {
  if (selectedCategories.value.has(category)) {
    selectedCategories.value.delete(category)
  } else {
    selectedCategories.value.add(category)
  }
  selectedCategories.value = new Set(selectedCategories.value)
}

// Filtered menu items
const filteredMenu = computed(() => {
  if (selectedCategories.value.size === 0) return menu
  return menu.filter(item => item.category && item.category.some(cat => selectedCategories.value.has(cat)))
})

// Fetch all categories
const fetchAllCategories = () => {
  const categories = new Set(menu.flatMap(item => item.category))
  allCategories.value = Array.from(categories)
}

// Call fetchAllCategories when the component is created
fetchAllCategories()
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
    
    <!-- Category filter -->
    <v-chip-group multiple>
      <v-chip
        v-for="category in allCategories"
        :key="category"
        :value="category"
        :selected="selectedCategories.has(category)"
        @click="toggleCategory(category)"
        color="primary"
        :class="{ 'on-primary-variant': selectedCategories.has(category) }"
      >
        {{ category }}
      </v-chip>
    </v-chip-group>

    <v-row>
      <v-col
        cols="12"
        sm="12"
        v-for="item in filteredMenu"
        :key="item.title"
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
<style scoped>
.v-chip.on-primary-variant {
  color: blue !important;
}
</style>