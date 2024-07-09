<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'とくせい一覧'

const ability = (await useFetch('/api/v1/ability?mode=index&area='+route.params.area)).data.value.result

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
  title: 'とくせい一覧',
  href: '/ability',
  disabled: false
})
breadcrumbs.push({
  title: appConfig.region_eng2jpn[route.params.area],
  href: '/ability/'+route.params.area,
  disabled: true
})
const metaTitle = ref("とくせい一覧")
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

onMounted(() => {
const hash = route.hash;
if (hash) {
  const element = document.querySelector(hash);
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 100, // 固定ヘッダーの高さを引く
      behavior: 'smooth'
    });
  }
}
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
    <div
    v-for="(item, key) in ability"
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
      </v-card-title>
      <v-card-text>
        {{ item[appConfig.region2game[route.params.area]] }}
      </v-card-text>
    </v-card>
    </div>
  </v-container>
</template>
<style>
[id] {
  scroll-margin-top: 80px;
}
</style>