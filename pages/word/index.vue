<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const url = ref('https://kyosserver.sakura.ne.jp/api/word.php')
// const url = ref('http://localhost/pokedex_word/word.php')
const result = ref(null)
const selectedGames = ref<string[]>([])
const pokemonData = ref(null)
const isLoading = ref(false)

const fetchData = async () => {
    isLoading.value = true
    try {
        const response = await fetch(url.value)
        const data = await response.text()
        result.value = JSON.parse(data)
        // console.log(result.value)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching data:', error)
        isLoading.value = false
    }
}

onMounted(() => {
    fetchData()
})


route.meta.title = 'ポケモン用語の基礎知識'
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
  title: 'ポケモン用語の基礎知識',
  href: '/word',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("ポケモン用語の基礎知識")
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
    <v-row>
      <v-breadcrumbs :items="breadcrumbs" class="ml-4"></v-breadcrumbs>
    </v-row>
    <v-row v-if="result">
      <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                v-for="item in result" :key="item"
              >
                <v-card
                elevation="0"
                variant="outlined"
                style="background-color: white;"
                >
                  <v-card-title>{{ item.word }}</v-card-title>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
