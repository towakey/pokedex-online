<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()
route.meta.title = 'とくせい'

definePageMeta({
  title: "Pokedex-Online"
})
// const ability = (await useFetch('/api/v1/ability?mode=index&area='+route.params.area)).data.value.result
const ability = (await import('~/assets/v1/pokedex/ability/ability.json')).ability

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
  title: 'とくせい',
  href: '/ability',
  disabled: false
})
breadcrumbs.push({
  title: appConfig.region_eng2jpn[route.params.area],
  href: '/ability/'+route.params.area,
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("とくせい")
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

const shareOn = (network, key) => {
  const urlObject = new URL(`${config.public.siteUrl}${route.fullPath}`)
  // const currentUrl = `${config.public.siteUrl}${route.fullPath.slice(0, -1)}#${key}`
  urlObject.hash = ''
  const currentUrl = `${urlObject.toString()}#${key}`
  const text = encodeURIComponent(key+"\n"+ability[key][appConfig.region2game[route.params.area]]+"\n");
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
    v-for="(item, key, idx) in ability"
    :key="String(idx)"
    >
    <v-card
    elevation-0
    variant="outlined"
    style="background-color: white; margin-top: 20px;"
    :id="key"
    v-if='item[appConfig.region2game[route.params.area]]!=null'
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
              @click="shareOn(item.network, key)"
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
        {{ item[appConfig.region2game[route.params.area]] }}
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
</style>
