<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()
route.meta.title = 'わざマシン一覧'

definePageMeta({
  title: "Pokedex-Online"
})
// const ability = (await useFetch('/api/v1/ability?mode=index&area='+route.params.area)).data.value.result
let waza:any
let waza_machine:any
let waza_machine_row:any

// route.params.areaを安全に文字列として扱う
const areaParam = Array.isArray(route.params.area) ? route.params.area[0] : route.params.area;

// 地方名からゲームバージョンへのマッピングを取得
type RegionKey = keyof typeof appConfig.region2game;
const gameVersion = (areaParam as RegionKey in appConfig.region2game) 
  ? appConfig.region2game[areaParam as RegionKey] 
  : areaParam;

let area = gameVersion;

// パルデア地方関連のサブエリアの処理
if(['paldea', 'kitakami', 'blueberry'].includes(areaParam)){
  area = 'Scarlet_Violet'
}

try {
  // Import the files directly based on the game version
  if (area === 'Scarlet_Violet') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_machine.json')).waza_machine
  } else if (area === 'Sword_Shield') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/waza_machine.json')).waza_machine
  // } else if (area === 'LegendsArceus') {
  //   waza = (await import('~/assets/v1/pokedex/pokedex/LegendsArceus/waza_list.json')).waza_list
  //   waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/LegendsArceus/waza_machine.json')).waza_machine
  } else if (area === 'UltraSun_UltraMoon') {
    waza = (await import('~/assets/v1/pokedex/pokedex/UltraSun_UltraMoon/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/UltraSun_UltraMoon/waza_machine.json')).waza_machine
  } else if (area === 'Sun_Moon') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Sun_Moon/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Sun_Moon/waza_machine.json')).waza_machine
  } else if (area === 'X_Y') {
    waza = (await import('~/assets/v1/pokedex/pokedex/X_Y/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/X_Y/waza_machine.json')).waza_machine
  } else if (area === 'Black2_White2') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Black2_White2/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Black2_White2/waza_machine.json')).waza_machine
  } else if (area === 'Black_White') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Black_White/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Black_White/waza_machine.json')).waza_machine
  } else if (area === 'Diamond_Pearl_Platinum') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/waza_machine.json')).waza_machine
  } else if (area === 'Ruby_Sapphire_Emerald') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/waza_machine.json')).waza_machine
  } else if (area === 'Gold_Silver_Crystal') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/waza_machine.json')).waza_machine
  } else if (area === 'Red_Green_Blue_Yellow') {
    waza = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Yellow/waza_list.json')).waza_list
    waza_machine_row = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Yellow/waza_machine.json')).waza_machine
  } else {
    console.error(`No waza data available for game version: ${area}`)
    waza = { [area]: {} }
    waza_machine_row = {}
  }

  waza_machine = {}
  
  for (const key in waza_machine_row) {
    waza_machine[key] = {
      "name": waza_machine_row[key],
      "type": waza[area]?.[waza_machine_row[key]]?.["type"] || '',
      "category": waza[area]?.[waza_machine_row[key]]?.["category"] || '',
      "power": waza[area]?.[waza_machine_row[key]]?.["power"] || '',
      "accuracy": waza[area]?.[waza_machine_row[key]]?.["accuracy"] || '',
      "pp": waza[area]?.[waza_machine_row[key]]?.["pp"] || '',
      "description": waza[area]?.[waza_machine_row[key]]?.["description"] || ''
    }
  }
} catch (error) {
  console.error(`Error loading waza data for ${area}:`, error)
  waza = { [area]: {} }
  waza_machine = {}
}

const shareOptions = [
  { title: 'Twitter', icon: 'mdi-twitter', network: 'twitter' },
  { title: 'Mastodon', icon: 'mdi-mastodon', network: 'mastodon' },
  { title: 'Bluesky', icon: 'mdi-web', network: 'bluesky' },
  // 他のSNSオプションを追加できます
];

// ゲームバージョンの型をappConfig.game_eng2jpnのキーとして扱えるように型を定義
type GameVersion = keyof typeof appConfig.game_eng2jpn;

// ゲームバージョン名を表示用に変換
const gameVersionTitle = (() => {
  // 有効なゲームバージョンならその日本語名を返す
  if (area in appConfig.game_eng2jpn) {
    return appConfig.game_eng2jpn[area as GameVersion];
  }
  // 無効な場合はデフォルト値を返す
  return 'わざマシン一覧';
})();

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'わざマシン一覧',
  href: '/waza_machine',
  disabled: false
})
breadcrumbs.push({
  title: gameVersionTitle,
  href: '/waza_machine/'+area,
  disabled: true
})
const metaTitle = ref("わざマシン一覧")
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

const shareOn = (network, key, desc) => {
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
    v-for="(items, key) in waza_machine"
    :key="item"
    >
    <v-card
    elevation-0
    variant="outlined"
    style="background-color: white; margin-top: 20px;"
    :id="key"
    >
      <v-card-title>
        {{ key }} : {{ items.name }}
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
        :headers="[
          {title: 'タイプ', key: 'type', width: '20%'},
          {title: '分類', key: 'category', width: '20%'},
          {title: 'いりょく', key: 'power', width: '20%'},
          {title: 'めいちゅう', key: 'accuracy', width: '20%'},
          {title: 'PP', key: 'pp', width: '20%'}
        ]"
        :items="[items]"
        hide-default-footer
        >
        </v-data-table>
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
</style>