<script setup lang="ts">
const route = useRoute()

const url = ref('https://kyosserver.sakura.ne.jp/api/pokedex.php')
const result = ref(null)
const selectedGames = ref<string[]>([])
const pokemonData = ref(null)
const isLoading = ref(false)

const fetchPokemonByTags = async () => {
  try {
    const selectedTags = selectedGames.value.join(',')
    const apiUrl = `${url.value}?mode=tag&select=${encodeURIComponent(selectedTags)}`
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    const data = await response.text()
    pokemonData.value = JSON.parse(data)
  } catch (error) {
    console.error('Error fetching pokemon data:', error)
    pokemonData.value = null
  }
}

const toggleGame = async (game: string) => {
  const index = selectedGames.value.indexOf(game)
  if (index === -1) {
    selectedGames.value.push(game)
  } else {
    selectedGames.value.splice(index, 1)
  }
  pokemonData.value = null
  if (selectedGames.value.length > 0) {
    isLoading.value = true
    try {
      await fetchPokemonByTags()
    } finally {
      isLoading.value = false
    }
  } else {
    pokemonData.value = null
  }
}

const fetchData = async () => {
  try {
    const response = await fetch(`${url.value}?mode=taglist`)  // 直接APIエンドポイントにアクセス
    const data = await response.text()
    result.value = JSON.parse(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    result.value = null
  }
}

onMounted(() => {
  fetchData()
})

definePageMeta({
  title: "検索"
})

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: '検索',
  href: '/pokedex',
  disabled: false
})
Object.keys(route.params).forEach((val) => {
  if(val === 'area'){
    breadcrumbs.push({
      title: appConfig.pokedex_eng2jpn[route.params[val]],
      href: '/pokedex/'+route.params[val],
      disabled: true
    })
  }
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref(route.meta.title)
updateMetadata(metaTitle.value)

useHead({
  title: metaTitle.value,
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
    <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
<!--
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="url"
          label="URL"
          placeholder="https://kyosserver.sakura.ne.jp/api/pokedex.php"
          @keyup.enter="fetchData"
        ></v-text-field>
      </v-col>
    </v-row>
-->
    <v-row v-if="result">
      <v-col cols="12">
        <v-card
        elevation="0"
        variant="outlined"
        style="background-color: white;"
        >
          <v-card-title>タグ</v-card-title>
          <v-card-text>
            <v-row>
              <v-col 
                v-for="item in result" 
                :key="item" 
                cols="auto"
                class="pa-2"
              >
                <v-btn
                  color="primary"
                  :variant="selectedGames.includes(item) ? 'flat' : 'outlined'"
                  @click="toggleGame(item)"
                >
                  {{ item }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="pokemonData">
      <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                v-for="pokemon in pokemonData"
                :key="pokemon.id"
              >
                <NuxtLink
                :to="{path: `/pokedex/global/${pokemon.id}`}"
                class="nuxtlink"
                >
                  <v-card
                  elevation="0"
                  variant="outlined"
                  style="background-color: white;"
                  >
                    <div
                    class="d-flex flex-no-wrap justify-space-between"
                    style="float: left;"
                    >
                      <v-avatar
                        class="ms-2"
                        size="100"
                      >
                        <v-img :src='`${"/img/" + pokemon.img+".png"}`'></v-img>
                      </v-avatar>

                      <v-card-title>
                        No.{{ ("0000"+pokemon.id).slice(-4) }}<br>
                        {{ pokemon.name }}
                        <div v-if="pokemon.form" class="text-subtitle-1">
                          {{ pokemon.form }}
                        </div>
                      </v-card-title>
                    </div>
                  </v-card>
                </NuxtLink>
              </v-col>
            </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>