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
const area = ref()
if(['paldea', 'kitakami', 'blueberry'].includes(route.params.area)){
  waza = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/waza_list.json')).waza_list
  area.value = 'paldea'
}
const shareOptions = [
  { title: 'Twitter', icon: 'mdi-twitter', network: 'twitter' },
  { title: 'Mastodon', icon: 'mdi-mastodon', network: 'mastodon' },
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
breadcrumbs.push({
  title: appConfig.region_eng2jpn[route.params.area],
  href: '/waza/'+route.params.area,
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
    v-for="(items, key) in waza[area]"
    :key="item"
    >
    <v-card
    elevation-0
    variant="outlined"
    style="background-color: white; margin-top: 20px;"
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