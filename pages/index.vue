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

// 今日の注目ポケモンデータ
const featuredPokemon = ref({
  id: '',
  name: '',
  image: '',
  description: '',
  link: ''
});

// ページマウント時にランダムで注目ポケモンを設定
onMounted(() => {
  const candidates = appConfig.featured_pokemon_candidates;
  if (candidates && candidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selectedPokemon = candidates[randomIndex];
    featuredPokemon.value = {
      id: selectedPokemon.id,
      name: selectedPokemon.name,
      image: `/img/${('0000' + selectedPokemon.id).slice(-4)}.png`,
      description: selectedPokemon.description,
      link: `/pokedex/global/${selectedPokemon.id}`
    };
  }
});

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

    <!-- 今日のポケモン セクション -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card 
          variant="tonal"
          class="featured-pokemon-card"
        >
          <v-card-title class="text-h5 pt-4 ps-4">
            今日の注目ポケモン！
          </v-card-title>
          <v-card-text class="pb-4">
            <v-row align="center" class="fill-height">
              <v-col cols="12" md="5" class="d-flex justify-center align-center pa-0 pokemon-image-col">
                <NuxtLink :to="featuredPokemon.link" class="pokemon-image-link">
                  <v-img
                    :src="featuredPokemon.image"
                    :alt="featuredPokemon.name"
                    height="200"
                    width="200"
                    contain
                    class="pokemon-image"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </NuxtLink>
              </v-col>
              <v-col cols="12" md="7">
                <h3 class="text-h6 mb-2 pokemon-name">{{ featuredPokemon.name }}</h3>
                <p class="text-body-1 pokemon-description">
                  {{ featuredPokemon.description }}
                </p>
                <v-btn 
                  :to="featuredPokemon.link" 
                  color="primary" 
                  class="mt-3 featured-pokemon-button"
                  variant="elevated"
                  size="large"
                >
                  詳しく見る
                  <v-icon end icon="mdi-arrow-right-circle-outline"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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

<style scoped>
.featured-pokemon-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px !important; /* Vuetifyのデフォルトスタイルを上書き */
  overflow: visible; /* 画像がはみ出るように */
}

.pokemon-image-col {
  position: relative; /* 画像の位置調整のため */
}

.pokemon-image-link {
  display: block;
  transition: transform 0.3s ease-out;
}

.pokemon-image-link:hover {
  transform: scale(1.1);
}

.pokemon-image {
  filter: drop-shadow(0px 5px 15px rgba(0,0,0,0.2));
  /* 必要に応じて、画像をカードからはみ出させるための調整 */
  /* margin-bottom: -20px; */ 
  /* z-index: 1; */
}

.pokemon-name {
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  font-size: 1.8rem; /* 少し大きく */
}

.pokemon-description {
  font-size: 1rem;
  line-height: 1.6;
  min-height: 70px; /* 説明文の高さが変動してもレイアウトが崩れにくくする */
}

.featured-pokemon-button {
  font-weight: bold;
  text-transform: none; /* ボタンテキストの大文字化を解除 */
}

.responsive-text-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.responsive-text-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
