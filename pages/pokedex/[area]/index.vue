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
    type1?: string;
    type2?: string;
  }>;
}

interface RawPokedexResponse {
  success: boolean;
  data: Record<string, any[]>;
  region: string | null;
}

const fetchPokedexIndex = async (area: string): Promise<Pokemon[]> => {
  const { data } = await useFetch<RawPokedexResponse>(
    `http://localhost/pokedex/pokedex.php?region=${area}`,
    { key: `pokedex-index-${area}` }
  )
  if (!data.value || !data.value.success) return []

  const pokedexArray: Pokemon[] = []
  Object.values(data.value.data).forEach((statusArray: any) => {
    if (!Array.isArray(statusArray) || statusArray.length === 0) return
    const first = statusArray[0]
    const statuses = statusArray.map((s: any) => ({
      weight: s.weight,
      height: s.height,
      name: s.name ? { jpn: s.name.jpn } : undefined,
      type1: s.type1,
      type2: s.type2
    }))
    pokedexArray.push({
      no: first.no,
      id: first.id,
      globalNo: first.globalNo,
      name: area === 'global' ? (first.name?.jpn ?? '') : first.name,
      status: statuses
    })
  })
  // 図鑑番号順に並べ替え
  pokedexArray.sort((a, b) => Number(a.no) - Number(b.no))
  return pokedexArray
}

const fetchedPokedex: Pokemon[] = await fetchPokedexIndex(route.params.area as string)
// 図鑑番号が空のポケモンを除外
const pokedex = route.params.area === 'global' 
  ? fetchedPokedex 
  : fetchedPokedex.filter(pokemon => pokemon.no && pokemon.no !== "")

// 検索モーダル関連の状態
const searchModalOpen = ref(false)
const searchText = ref('')
const selectedTypes = ref<string[]>([])

// 全ポケモンタイプを取得
const allTypes = Object.keys(appConfig.type)

// タイプ選択の切り替え
function toggleType(type: string) {
  const index = selectedTypes.value.indexOf(type)
  if (index === -1) {
    selectedTypes.value.push(type)
  } else {
    selectedTypes.value.splice(index, 1)
  }
}

// タイプの色の定義
const typeColors: Record<string, string> = {
  'ノーマル': '#dcdcdc',  // ノーマル
  'ほのお': '#ff0000',  // ほのお
  'みず': '#0000ff',  // みず
  'でんき': '#f5c842',  // でんき
  'くさ': '#008000',  // くさ
  'こおり': '#00bfff',  // こおり
  'かくとう': '#ff8c00',  // かくとう
  'どく': '#8b008b',  // どく
  'じめん': '#d2691e',  // じめん
  'ひこう': '#1e90ff',  // ひこう
  'エスパー': '#ff1493',  // エスパー
  'むし': '#32cd32',  // むし
  'いわ': '#8b4513',  // いわ
  'ゴースト': '#6a5acd',  // ゴースト
  'ドラゴン': '#4169e1',  // ドラゴン
  'あく': '#4b0082',  // あく
  'はがね': '#b0c4de',  // はがね
  'フェアリー': '#ee82ee'  // フェアリー
}

// タイプに応じた色を取得する関数
function getTypeColor(type: string): string {
  return typeColors[type] || '#dcdcdc'
}

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
  // 基本の検索テキストフィルタリング
  let filteredList = pokedex
  
  // 通常の検索ボックスからの検索
  if(searchTerm.value !== null && searchTerm.value !== undefined)
  {
    if(route.params.area == 'global'){
      filteredList = filteredList.filter(item => {
        const name = typeof item.name === 'string' ? item.name : item.name.jpn
        return String(name).match(searchTerm.value) || String(item.id).match(searchTerm.value)
      })
    }
    else
    {
      filteredList = filteredList.filter(item => 
        item.status.some(value => value.name.jpn.match(searchTerm.value)) || 
        String(item.no).match(searchTerm.value))
    }
  }
  
  // モーダル内での検索テキストフィルタリング
  if (searchText.value) {
    const searchRegex = new RegExp(searchText.value, 'i')
    filteredList = filteredList.filter(pokemon => {
      // 番号で検索
      if (pokemon.no && searchRegex.test(pokemon.no)) return true
      
      // 名前で検索
      if (route.params.area == 'global') {
        const name = typeof pokemon.name === 'string' ? pokemon.name : pokemon.name.jpn
        return searchRegex.test(String(name))
      } else {
        return pokemon.status.some(status => 
          status.name && searchRegex.test(String(status.name.jpn)))
      }
      return false
    })
  }
  
  // タイプでフィルタリング
  if (selectedTypes.value.length > 0) {
    filteredList = filteredList.filter(pokemon => {
      return pokemon.status.some(status => {
        return selectedTypes.value.some(selectedType => 
          status.type1 === selectedType || status.type2 === selectedType
        )
      })
    })
  }
  
  return filteredList
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
    <!-- <v-row>
      <v-col>
        <v-text-field
        v-model="searchTerm"
        label="検索(図鑑No or 名前)"
        variant="outlined"
        bg-color="white"
        />
      </v-col>
    </v-row> -->
    <!-- <v-row
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
    </v-row> -->
    
    <!-- 検索ボタン -->
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          @click="searchModalOpen = true"
          prepend-icon="mdi-magnify"
          variant="outlined"
          block
        >
          詳細検索
        </v-btn>
      </v-col>
    </v-row>
    
    <!-- 検索モーダル -->
    <v-dialog
      v-model="searchModalOpen"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="text-h5">
          詳細検索
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="searchModalOpen = false"></v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <!-- テキスト検索 -->
            <v-row>
              <v-col>
                <v-text-field
                  v-model="searchText"
                  label="図鑑No・名前で検索"
                  variant="outlined"
                  bg-color="white"
                  clearable
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <!-- タイプフィルター -->
            <v-row>
              <v-col
              v-if="route.params.area != 'global'"
              >
                <div class="text-subtitle-1 mb-2">タイプで絞り込み</div>
                <div class="d-flex flex-wrap gap-1">
                  <v-btn
                    v-for="type in allTypes"
                    :key="type"
                    :style="{
                      backgroundColor: selectedTypes.includes(type) ? '#dcdcdc' : getTypeColor(type),
                      color: selectedTypes.includes(type) ? 'black' : 'white'
                    }"
                    class="ma-1"
                    variant="elevated"
                    size="small"
                    @click="toggleType(type)"
                  >
                    {{ appConfig.type[type]?.jpn || type }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            
            <!-- 選択されているタイプ表示 -->
            <v-row v-if="selectedTypes.length > 0">
              <v-col>
                <v-chip-group>
                  <v-chip
                    v-for="type in selectedTypes"
                    :key="type"
                    closable
                    color="#dcdcdc"
                    text-color="black"
                    @click:close="toggleType(type)"
                  >
                    {{ appConfig.type[type]?.jpn || type }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="searchText = ''; selectedTypes = []"
          >
            クリア
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="searchModalOpen = false"
          >
            完了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            class="d-flex flex-no-wrap justify-space-between w-100"
            >

              <v-avatar
                class="ms-2"
                size="100"
                tile
                >
                  <NuxtImg
                    :src='`/img/pokedex/${pokemon.id}.png`'
                    alt=""
                    width="100"
                    height="100"
                    fit="cover"
                  />
              </v-avatar>

              <v-card-title
              class="pa-0 w-100"
              >
                <v-row
                class="ma-0"
                >
                  <v-col
                  cols="5"
                  style="min-width: 120px; max-width: 300px;"
                  >
                    <div class="text-truncate">No.{{ ("0000"+pokemon.no).slice(-4) }}</div>
                    <div class="text-truncate">{{ pokemon.status[0].name.jpn }}</div>
                  </v-col>
                  <v-col 
                  cols=""
                  class="text-left d-flex"
                  >
                    <div class="d-flex">
                      <typeIcon v-if="pokemon.status[0].type1" :type="pokemon.status[0].type1" :mode="'icon'" />
                      <typeIcon v-if="pokemon.status[0].type2" :type="pokemon.status[0].type2" :mode="'icon'" />
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>