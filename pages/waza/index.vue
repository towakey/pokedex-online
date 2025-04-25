<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'わざ'
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
  title: 'わざ',
  href: '/waza',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("わざ")
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

// ゲームバージョンの型をキーとして使用できるよう定義
type GameVersion = keyof typeof appConfig.game_eng2jpn;

// ゲームバージョンごとのリスト作成（重複なし）
const uniqueGameList = computed(() => {
  const result: { gameVersion: GameVersion; area: string }[] = []
  const seen = new Set<string>()

  for (const item of appConfig.pokedex_list) {
    const gameVersion = appConfig.region2game[item.area]
    if (gameVersion && !seen.has(gameVersion)) {
      seen.add(gameVersion)
      result.push({ gameVersion: gameVersion as GameVersion, area: item.area })
    }
  }

  return result
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
      <template v-for="(item, index) in uniqueGameList" :key="index">
        <v-col cols="12" sm="6">
          <NuxtLink :to="{ path: `/waza/${item.gameVersion}` }" class="nuxtlink">
            <v-card elevation="0" variant="outlined" style="background-color: white;">
              <v-card-title>{{ appConfig.game_eng2jpn[item.gameVersion] }}</v-card-title>
            </v-card>
          </NuxtLink>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>