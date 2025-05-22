<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { useAppConfig } from '#app';
import { createDbWorker } from 'sql.js-httpvfs'; 

let dbWorker: any = null; 
const isDbWorkerLoading = ref(true);

async function initializeDbWorker() {
  try {
    const base = window.location.origin;
    const ts = Date.now();
    const workerUrl = `${base}/sqlite.worker.js?ts=${ts}`;
    const wasmUrl   = `${base}/sql-wasm.wasm?ts=${ts}`;

    const workerConfig = [
      {
        from: 'inline',
        config: {
          serverMode: 'full',
          url: '/pokedex.db', 
          requestChunkSize: 4096,
        },
      },
    ];
    dbWorker = await createDbWorker(workerConfig, workerUrl, wasmUrl);
    console.log('Pokedex DB Worker initialized for index page.');
    isDbWorkerLoading.value = false;
  } catch (e) {
    console.error('Failed to initialize Pokedex DB Worker for index page:', e);
    isDbWorkerLoading.value = false; 
  }
}

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
interface FeaturedPokemon {
  id: string; // 全国図鑑番号 (globalNo相当) またはフォールバック時のID
  no?: string; // 地方図鑑番号 (area !== 'global' の時に使用)
  globalNo?: number; // 既存のglobalNoも残す場合 (getPokemonLinkでは直接使用しない)
  name: string;
  description: string;
  area: string; 
  image: string;
}

interface PopularPokemonEntry {
  pokemon_id: string;
  area: string;
  access_count: number;
}

interface PokemonDetails {
  no: string;
  globalNo: number;
  name: { jpn: string };
  description: string;
}

interface PokemonDetailsApiResponse {
  result: PokemonDetails[];
}

interface RankingPokemon {
  pokemon_id: string; // 全国図鑑番号 (globalNo)
  no?: string; // 地方図鑑番号 (area !== 'global' の時に使用)
  name: string;
  area: string;
  image: string;
  access_count: number;
}

interface CarouselItem {
  type: 'featured' | 'daily' | 'weekly' | 'monthly';
  title: string;
  content: FeaturedPokemon | RankingPokemon[] | null;
  isLoading: boolean;
  error: string | null;
  id: string; // Unique id for v-for key
}

const FEATURED_POKEMON_API_URL = '/php_api/get_featured_pokemon.php';
const RANKING_API_URL = '/php_api/get_pokemon_rankings.php';

const featuredPokemonInternal = ref<FeaturedPokemon | null>(null);
const carouselItems = ref<CarouselItem[]>([]);
const carouselCycleTime = 8000; // 8 seconds per slide
let itemIdCounter = 0;

async function fetchFeaturedPokemonForCarousel() { 
  try {
    const response = await fetch(FEATURED_POKEMON_API_URL); 
    if (!response.ok) {
      throw new Error('Failed to fetch featured Pokémon');
    }
    const data = await response.json();
    // APIレスポンスのキーが 'id' であり、'no' も含まれることを期待
    if (data && data.id) { 
      featuredPokemonInternal.value = {
        id: String(data.id),
        no: data.no ? String(data.no) : undefined, // 地方図鑑番号をセット
        // globalNo: data.id ? parseInt(data.id, 10) : undefined, // 必要に応じて
        name: data.name,
        description: data.description,
        image: data.image_path, 
        area: String(data.area)
      };
    } else {
      setFallbackFeaturedPokemonForCarousel();
    }
  } catch (error) {
    console.error('Error fetching featured Pokémon:', error);
    setFallbackFeaturedPokemonForCarousel();
  }
}

function setFallbackFeaturedPokemonForCarousel() { 
  const candidates = appConfig.featured_pokemon_candidates || [];
  if (candidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const fallback = candidates[randomIndex];
    const paddedId = String(fallback.id).padStart(4, '0'); // 画像パス用のID
    featuredPokemonInternal.value = {
      id: fallback.id, // 全国図鑑番号
      no: fallback.no ? String(fallback.no) : undefined, // 地方図鑑番号をセット (appConfigから)
      // globalNo: fallback.id ? parseInt(fallback.id, 10) : undefined, // 必要に応じて
      name: fallback.name,
      description: fallback.description,
      image: `/img/${paddedId}.png`, 
      area: fallback.area || 'kanto' 
    };
  }
}

async function fetchRankings(period: 'daily' | 'weekly' | 'monthly', title: string) {
  const uniqueId = `ranking-${period}-${++itemIdCounter}`;
  const itemIndex = carouselItems.value.push({
    id: uniqueId,
    type: period,
    title: title,
    content: null,
    isLoading: true,
    error: null,
  }) - 1;

  try {
    const response = await fetch(`${RANKING_API_URL}?period=${period}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch rankings and parse error' }));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }
    const data: RankingPokemon[] = await response.json();
    console.log(`Fetched ${period} rankings:`, JSON.stringify(data)); // デバッグログ追加
    carouselItems.value[itemIndex].content = data.length > 0 ? data : null; 
  } catch (e: any) {
    console.error(`Error fetching ${period} rankings:`, e);
    carouselItems.value[itemIndex].error = e.message || 'Unknown error';
  } finally {
    carouselItems.value[itemIndex].isLoading = false;
  }
}

onMounted(async () => {
  const initialItems: CarouselItem[] = [];

  await fetchFeaturedPokemonForCarousel(); 
  if (featuredPokemonInternal.value) {
    initialItems.push({
      id: `featured-${++itemIdCounter}`,
      type: 'featured',
      title: '今日の注目ポケモン！',
      content: featuredPokemonInternal.value,
      isLoading: false,
      error: null,
    });
  }

  initialItems.push({
    id: `ranking-daily-${++itemIdCounter}`,
    type: 'daily',
    title: '昨日のアクセスTOP3',
    content: null,
    isLoading: true, 
    error: null,
  });
  initialItems.push({
    id: `ranking-weekly-${++itemIdCounter}`,
    type: 'weekly',
    title: '週間アクセスTOP3',
    content: null,
    isLoading: true,
    error: null,
  });
  initialItems.push({
    id: `ranking-monthly-${++itemIdCounter}`,
    type: 'monthly',
    title: '月間アクセスTOP3',
    content: null,
    isLoading: true,
    error: null,
  });
  
  carouselItems.value = initialItems;

  await Promise.all([
    fetchRankings('daily', '昨日のアクセスTOP3'), 
    fetchRankings('weekly', '週間アクセスTOP3'),
    fetchRankings('monthly', '月間アクセスTOP3')
  ]);
});

const filteredCarouselItems = computed(() => {
  return carouselItems.value.filter(item => {
    if (item.isLoading && item.type !== 'featured') return false; 
    if (item.error && item.type !== 'featured') return false; 
    if (item.type === 'featured') return item.content !== null; 
    return !item.isLoading && !item.error && item.content !== null && (item.content as RankingPokemon[]).length > 0;
  }).sort((a,b) => { 
    if (a.type === 'featured') return -1;
    if (b.type === 'featured') return 1;
    const order = ['daily', 'weekly', 'monthly'];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });
});

const getPokemonLink = (pokemon: FeaturedPokemon | RankingPokemon): string => {
  console.log('getPokemonLink received:', JSON.parse(JSON.stringify(pokemon))); // Proxyを展開してログ出力

  // pokemon.area が undefined や空文字の場合のフォールバックを追加
  const area = pokemon.area || 'global'; // areaが空なら 'global' として扱う

  if (!pokemon || !area) { // area もチェック対象に
    console.warn(`Pokemon data or area is missing for link generation:`, JSON.parse(JSON.stringify(pokemon)));
    return '/';
  }

  let idForPath: string | undefined;

  if (area === 'global') {
    // 'global' の場合は既存の 'id' または 'pokemon_id' (globalNo相当) を使用
    idForPath = 'pokemon_id' in pokemon ? pokemon.pokemon_id : pokemon.id;
  } else {
    // それ以外のエリアの場合は 'no' (地方図鑑番号) を使用
    idForPath = pokemon.no;
  }

  if (idForPath === undefined) {
    // 適切なIDが見つからない場合 (例: 'no' が未定義で 'global' でもない)
    // フォールバックとして 'id' または 'pokemon_id' を試みる
    console.warn(`Pokemon (area: ${area}, id: ${pokemon.id || ('pokemon_id' in pokemon ? pokemon.pokemon_id : '')}) is missing 'no' property for non-global link or idForPath is undefined. Falling back to primary id.`);
    idForPath = 'pokemon_id' in pokemon ? pokemon.pokemon_id : pokemon.id;
    if (idForPath === undefined) {
      console.error('Failed to determine idForPath even after fallback.');
      return '/'; // それでもIDがなければ終了
    }
  }

  // IDの先頭のゼロを削除
  let idForLinkStr = String(idForPath);
  if (idForLinkStr.length > 1 && idForLinkStr.startsWith('0')) {
    idForLinkStr = String(parseInt(idForLinkStr, 10));
  }

  return `/pokedex/${area}/${idForLinkStr}`;
};

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
  <v-container fluid class="pa-0">
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

    <!-- カルーセル セクション -->
    <v-row class="mb-8" v-if="filteredCarouselItems.length > 0">
      <v-col cols="12">
        <v-carousel
          :cycle="filteredCarouselItems.length > 1"
          :interval="carouselCycleTime"
          height="auto" 
          show-arrows="hover"
          hide-delimiters
          class="featured-pokemon-carousel"
        >
          <v-carousel-item
            v-for="item in filteredCarouselItems"
            :key="item.id"
          >
            <v-card 
              variant="tonal"
              class="fill-height pa-0 ma-0"
            >
              <v-card-title class="text-h5 pt-4 ps-4">
                {{ item.title }}
              </v-card-title>
              <v-card-text class="pb-4">
                <!-- 今日の注目ポケモン表示 -->
                <template v-if="item.type === 'featured' && item.content">
                  <v-row align="center" class="fill-height">
                    <v-col cols="12" md="5" class="d-flex justify-center align-center pa-0 pokemon-image-col">
                      <NuxtLink :to="getPokemonLink(item.content as FeaturedPokemon)" class="pokemon-image-link">
                        <v-img
                          :src="(item.content as FeaturedPokemon).image"
                          :alt="(item.content as FeaturedPokemon).name"
                          height="200"
                          width="200"
                          contain
                          class="elevation-2 rounded-lg ma-2"
                        >
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </NuxtLink>
                    </v-col>
                    <v-col cols="12" md="7">
                      <h3 class="text-h6 mb-2">{{ (item.content as FeaturedPokemon).name }}</h3>
                      <p class="text-body-2">
                        {{ (item.content as FeaturedPokemon).description }}
                      </p>
                    </v-col>
                  </v-row>
                </template>
                
                <!-- ランキング表示 (日次/週次/月次) -->
                <template v-else-if="(item.type === 'daily' || item.type === 'weekly' || item.type === 'monthly') && item.content && (item.content as RankingPokemon[]).length > 0">
                  <v-list lines="three" density="compact" bg-color="transparent">
                    <v-list-item 
                      v-for="(pokemon, index) in (item.content as RankingPokemon[])"
                      :key="pokemon.pokemon_id + '-' + pokemon.area"
                      :to="getPokemonLink(pokemon)"
                      class="mb-2"
                    >
                      <template v-slot:prepend>
                        <span class="text-h6 font-weight-bold me-3">{{ index + 1 }}.</span>
                        <v-avatar rounded="lg" size="64" class="elevation-1 me-3">
                          <v-img :src="pokemon.image" :alt="pokemon.name">
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey-lighten-5" size="20"></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-avatar>
                      </template>
                      <v-list-item-title class="font-weight-bold">{{ pokemon.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        エリア: {{ pokemon.area }} | {{ pokemon.access_count }} アクセス
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </template>

                <!-- ローディング表示 -->
                <template v-else-if="item.isLoading">
                  <v-row align="center" justify="center" class="fill-height" style="min-height: 200px;">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                  </v-row>
                </template>

                <!-- データなし/エラー表示 (ランキング用) -->
                 <template v-else-if="(item.type !== 'featured' && (!item.content || (item.content as RankingPokemon[]).length === 0)) || item.error">
                  <v-row align="center" justify="center" class="fill-height" style="min-height: 150px;">
                    <p class="text-grey">
                      {{ item.error ? '情報の取得に失敗しました。' : 'ランキング情報はありません。' }}
                    </p>
                  </v-row>
                </template>

              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- ポケモン図鑑本体へのリンクボタン -->
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
.featured-pokemon-carousel {
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
