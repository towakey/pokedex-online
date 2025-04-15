<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()
route.meta.title = 'わざ一覧'

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
  title: 'わざ一覧',
  href: '/waza',
  disabled: false
})

// 型安全な参照
const regionTitle = (areaParam as RegionEngJpnKey in appConfig.region_eng2jpn) ? 
  appConfig.region_eng2jpn[areaParam as RegionEngJpnKey] : 'わざ一覧';

breadcrumbs.push({
  title: regionTitle,
  href: '/waza/'+ areaParam,
  disabled: true
})
const metaTitle = ref("わざ一覧")
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
        <template #item.type="{ item }">
          <typeIcon v-if="item.type" :type="item.type" />
        </template>
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