<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const searchTerm = ref()
route.meta.title = appConfig.pokedex_view_eng2jpn[route.params.area]
definePageMeta({
  title: "Pokedex-Online"
})

// ポケモンデータの型を定義
interface Pokemon {
  no: string;
  id?: string;  // グローバルエリアで使用
  globalNo: string;  // 画像表示用のグローバル図鑑No
  name: string | { jpn: string };  // グローバルエリアではstring、その他ではオブジェクト
  status: Array<{
    weight: string;
    height: string;
    name?: { jpn: string };  // 地域別エリアで使用
  }>;
}

const fetchedPokedex = (await useFetch<{result: Pokemon[]}>('/api/v1/pokedex?mode=index&area='+route.params.area)).data.value.result
// 図鑑番号が空のポケモンを除外
const pokedex = route.params.area === 'global' 
  ? fetchedPokedex 
  : fetchedPokedex.filter(pokemon => pokemon.no && pokemon.no !== "")

const sort_type = ref("番号順")
watch(sort_type, () => {
  if(sort_type.value == "番号順")
  {
    // console.log("番号順")
    pokedex.sort((a, b) => {
      if(Number(a.no) < Number(b.no)) return -1
      if(Number(a.no) > Number(b.no)) return 1
      return 0
    })
  }
  else if(sort_type.value == "軽い順")
  {
    // console.log("軽い順")
    pokedex.sort((a, b) => {
      if(Number(a.status[0].weight) < Number(b.status[0].weight)) return -1
      if(Number(a.status[0].weight) > Number(b.status[0].weight)) return 1
      return 0
    })
  }
  else if(sort_type.value == "重い順")
  {
    // console.log("重い順")
    pokedex.sort((a, b) => {
      if(Number(a.status[0].weight) > Number(b.status[0].weight)) return -1
      if(Number(a.status[0].weight) < Number(b.status[0].weight)) return 1
      return 0
    })
  }
  else if(sort_type.value == "低い順")
  {
    // console.log("低い順")
    pokedex.sort((a, b) => {
      if(Number(a.status[0].height) < Number(b.status[0].height)) return -1
      if(Number(a.status[0].height) > Number(b.status[0].height)) return 1
      return 0
    })
  }
  else if(sort_type.value == "高い順")
  {
    // console.log("高い順")
    pokedex.sort((a, b) => {
      if(Number(a.status[0].height) > Number(b.status[0].height)) return -1
      if(Number(a.status[0].height) < Number(b.status[0].height)) return 1
      return 0
    })
  }
})
const pokelist = computed(() => {
  if(searchTerm.value === null)
  {
    return pokedex
  }
  else
  {
    if(route.params.area == 'global'){
      return pokedex.filter(item => String(item.name.jpn).match(searchTerm.value) || String(item.id).match(searchTerm.value))
    }
    else
    {
      return pokedex.filter(item => item.status.some(value => value.name.jpn.match(searchTerm.value)) || String(item.no).match(searchTerm.value))
    }
  }
})

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'ポケモン図鑑',
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
      <v-col>
        <v-text-field
        v-model="searchTerm"
        label="検索(図鑑No or 名前)"
        variant="outlined"
        bg-color="white"
        />
      </v-col>
    </v-row>
    <v-row
    v-if="route.params.area != 'global'"
    >
      <v-col>
        <v-combobox
        v-model="sort_type"
        label="並び順"
        :items="['番号順','軽い順','重い順','低い順','高い順']"
        variant="outlined"
        bg-color="white"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      cols="12"
      sm="4"
      v-for="pokemon in pokelist"
      :key="pokemon"
      >
        <NuxtLink
        :to="{path: `/pokedex/${route.params.area}/${pokemon.no}`}"
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
                style="/*background-color: aqua;*/"
                >
                  <v-img :src='`${"/img/" + ("0000"+pokemon.globalNo).slice(-4)+".png"}`'></v-img>
              </v-avatar>

              <v-card-title>
                No.{{ ("0000"+pokemon.no).slice(-4) }}<br>{{ pokemon.status[0].name.jpn }}
              </v-card-title>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>