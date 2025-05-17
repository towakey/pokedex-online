<script setup lang="ts">
const appConfig = useAppConfig()
definePageMeta({
  title: "Pokedex-Online"
})
// const menu = [
// {
//     title: 'ポケモン図鑑',
//     path: '/pokedex',
//     img: '/icon.png'
//   },
//   {
//     title: 'わざ一覧',
//     path: '/waza',
//     img: '/icon.png'
//   },
//   {
//     title: 'とくせい一覧',
//     path: '/ability',
//     img: '/icon.png'
//   },
//   {
//     title: 'WebApp',
//     path: '/webapp',
//     img: '/icon.png'
//   },
//   {
//     title: 'チートシート',
//     path: '/cheatsheet',
//     img: '/blog.png'
//   },
//   {
//     title: '図鑑カメラ',
//     path: '/camera',
//     img: '/camera.png'
//   },
//   {
//     title: 'pokedex.jsonについて',
//     path: '/pokedexjson',
//     img: '/icon.png'
//   },
//   {
//     title: 'リンク',
//     path: '/link',
//     img: '/icon.png'
//   }
// ]
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("Pokedex-Online")
updateMetadata(metaTitle.value)

// カテゴリ情報を追加
const categoryTitles = {
  pokemon_data: 'ポケモン関連データ',
  tools_gallery: 'ツールとギャラリー',
  useful_information: 'Information'
}

// カテゴリごとにメニューをグループ化
const groupedMenu = computed(() => {
  const groups: { [key: string]: any[] } = {}
  appConfig.main_menu.forEach(item => {
    if (!groups[item.category]) {
      groups[item.category] = []
    }
    groups[item.category].push(item)
  })
  return groups
})

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
          HOME
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <div v-for="(items, category) in groupedMenu" :key="category" class="mb-8">
      <h2 class="text-h5 mb-4">{{ categoryTitles[category] || category }}</h2>
      <v-row>
        <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="item in items" :key="item.title"
        >
          <NuxtLink
          :to="{path: `${item.path}`}"
          class="nuxtlink"
          >
            <v-card
            elevation-0
            variant="outlined"
            style="background-color: white;"
            >
              <div
              class="d-flex align-center pa-3"
              >
                <v-avatar
                class="me-3"
                size="60" 
                tile
                >
                  <v-img :src="`${item.img}`"></v-img>
                </v-avatar>
                <v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
              </div>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
