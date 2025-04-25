<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()
route.meta.title = 'わざ'

definePageMeta({
  title: "Pokedex-Online"
})
// const ability = (await useFetch('/api/v1/ability?mode=index&area='+route.params.area)).data.value.result
let waza:any
// route.params.areaを安全に文字列として扱う
const areaParam = Array.isArray(route.params.area) ? route.params.area[0] : route.params.area;

// 型定義
type RegionKey = keyof typeof appConfig.region2game;
type RegionEngJpnKey = keyof typeof appConfig.region_eng2jpn;

// 型安全なアクセス
const gameVersion = (areaParam as RegionKey in appConfig.region2game) ? 
  appConfig.region2game[areaParam as RegionKey] : '';
const area = ref(gameVersion);

if(areaParam === 'Scarlet_Violet'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_list.json')).waza_list
  area.value = 'Scarlet_Violet'
} else if(areaParam === 'LegendsArceus'){
  waza = (await import('~/assets/v1/pokedex/pokedex/LegendsArceus/waza_list.json')).waza_list
  area.value = 'LegendsArceus'
} else if(areaParam === 'Sword_Shield'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/waza_list.json')).waza_list
  area.value = 'Sword_Shield'
} else if(areaParam === 'UltraSun_UltraMoon'){
  waza = (await import('~/assets/v1/pokedex/pokedex/UltraSun_UltraMoon/waza_list.json')).waza_list
  area.value = 'UltraSun_UltraMoon'
} else if(areaParam === 'Sun_Moon'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Sun_Moon/waza_list.json')).waza_list
  area.value = 'Sun_Moon'
} else if(areaParam === 'X_Y'){
  waza = (await import('~/assets/v1/pokedex/pokedex/X_Y/waza_list.json')).waza_list
  area.value = 'X_Y'
} else if(areaParam === 'Black2_White2'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Black2_White2/waza_list.json')).waza_list
  area.value = 'Black2_White2'
} else if(areaParam === 'Black_White'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Black_White/waza_list.json')).waza_list
  area.value = 'Black_White'
} else if(areaParam === 'Diamond_Pearl_Platinum'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/waza_list.json')).waza_list
  area.value = 'Diamond_Pearl_Platinum'
} else if(areaParam === 'Ruby_Sapphire_Emerald'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/waza_list.json')).waza_list
  area.value = 'Ruby_Sapphire_Emerald'
} else if(areaParam === 'Gold_Silver_Crystal'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/waza_list.json')).waza_list
  area.value = 'Gold_Silver_Crystal'
} else if(areaParam === 'Red_Green_Blue_Yellow'){
  waza = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Yellow/waza_list.json')).waza_list
  area.value = 'Red_Green_Blue_Yellow'
}

if(['paldea', 'kitakami', 'blueberry'].includes(areaParam)){
  waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_list.json')).waza_list
  area.value = 'Scarlet_Violet'
}
const shareOptions = [
  { title: 'Twitter', icon: 'mdi-twitter', network: 'twitter' },
  { title: 'Mastodon', icon: 'mdi-mastodon', network: 'mastodon' },
  { title: 'Bluesky', icon: 'mdi-web', network: 'bluesky' },
  // 他のSNSオプションを追加できます
];

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'わざ',
  href: '/waza',
  disabled: false
})

// 型安全な参照
const regionTitle = (areaParam as RegionEngJpnKey in appConfig.region_eng2jpn) ? 
  appConfig.region_eng2jpn[areaParam as RegionEngJpnKey] : 'わざ';

breadcrumbs.push({
  title: regionTitle,
  href: '/waza/'+ areaParam,
  disabled: true
})
const metaTitle = ref("わざ")
const updateMetadata = inject('updateMetadata') as (title: string) => void
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

const shareOn = (network: string, key: string, desc: string): void => {
  const urlObject = new URL(`${config.public.siteUrl}${route.fullPath}`)
  // const currentUrl = `${config.public.siteUrl}${route.fullPath.slice(0, -1)}#${key}`
  urlObject.hash = ''
  const currentUrl = `${urlObject.toString()}#${key}`
  const text = encodeURIComponent(key+"\n"+desc+"\n");
  const url = encodeURIComponent(currentUrl);
  
  let shareUrl;
  switch (network) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'mastodon':
      // マストドンの場合、ユーザーにインスタンスURLを入力してもらう必要があります
      const instance = prompt('マストドンのインスタンスURLを入力してください');
      if (instance) {
        shareUrl = `${instance}/share?text=${text} ${url}`;
      }
      break;
      case 'bluesky': // Blueskyの処理を追加
      shareUrl = `https://bsky.app/intent/compose?text=${text}%20${url}`;
      break;
    // 他のSNSの場合分けをここに追加
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=550,height=420');
  }
};

// アクセス用の計算プロパティを作成
const wazaData = computed(() => {
  // 存在チェック
  if (waza && waza[area.value]) {
    return waza[area.value];
  }
  return {};
});

function getCategoryColor(category: string) {
  switch (category) {
    case '物理':
      return 'blue';
    case '特殊':
      return 'red';
    case '変化':
      return 'green';
    default:
      return 'gray';
  }
}
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
    <template
    v-for="(items, key, idx) in wazaData"
    :key="String(idx)"
    >
    <v-card
    elevation-0
    variant="outlined"
    :style="{ backgroundColor: 'white', marginTop: '20px' }"
    :id="key"
    >
      <v-card-title>
        {{ key }}
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
            variant="plain"
            icon="mdi-share-variant"
            size="small"
            class="share-btn"
            v-bind="props"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in shareOptions"
              :key="index"
              @click="shareOn(item.network, key, items.description)"
            >
              <v-list-item-title>
                <v-icon :icon="item.icon" size="small" class="mr-2" />
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <h4>{{ items.description }}</h4>
        <v-data-table
        density="compact"
        :headers="[
          {title: 'タイプ', key: 'type', width: '15%', align: 'center'},
          {title: '分類', key: 'category', width: '15%', align: 'center'},
          {title: 'いりょく', key: 'power', width: '15%', align: 'center'},
          {title: 'めいちゅう', key: 'accuracy', width: '15%', align: 'center'},
          {title: 'PP', key: 'pp', width: '15%', align: 'center'},
        ]"
        :items="[items]"
        class="move-table"
        :class="`${items.type}-move-table`"
        hide-default-footer
        hover
        >
        <template #item.type="{ item }">
          <div class="d-flex justify-center">
            <typeIcon v-if="item.type" :type="item.type" />
          </div>
        </template>
        <template #item.category="{ item }">
          <v-chip
            size="small"
            :color="getCategoryColor(item.category)"
            :class="['category-chip', 'text-subtitle-2', 'font-weight-medium']"
          >
            {{ item.category }}
          </v-chip>
        </template>
        <template #item.power="{ item }">
          <span :class="item.power === '—' ? 'text-disabled' : 'text-primary'">
            {{ item.power }}
          </span>
        </template>
        <template #item.accuracy="{ item }">
          <span :class="item.accuracy === '—' ? 'text-disabled' : 'text-primary'">
            {{ item.accuracy }}
          </span>
        </template>
        <template #item.pp="{ item }">
          <v-badge
            :content="item.pp"
            color="primary"
            inline
            text-color="white"
          ></v-badge>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card
      v-if="(idx + 1) % 10 === 0"
      elevation="0"
      variant="outlined"
      :style="{ backgroundColor: 'white', marginTop: '20px' }"
    >
      <v-card-text>
        <adsbygoogle
          :ad-slot="config.public.adSlot"
          :ad-format="'auto'"
          :full-width-responsive="true"
        />
      </v-card-text>
    </v-card>
    </template>
  </v-container>
</template>
<style>
[id] {
  scroll-margin-top: 80px;
}
</style>
<style scoped>
.share-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.move-table {
  border-radius: 8px;
  overflow: hidden;
}

.move-table :deep(th) {
  background-color: #f5f5f5 !important;
  color: #424242 !important;
  font-weight: bold !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
}

.move-table :deep(tr:hover) {
  background-color: #f9f9f9 !important;
}

.category-chip {
  min-width: 70px;
  justify-content: center;
}
</style>