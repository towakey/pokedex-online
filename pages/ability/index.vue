<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'とくせい一覧'
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
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("とくせい一覧")
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
      <template
      v-for="(item, index) in appConfig.pokedex_list" :key="index"
      >
      <v-col
      cols="12"
      sm="6"
      v-if='appConfig.region2game[item.area] != ""'
      >
        <NuxtLink
        :to="{path: `/ability${item.path}`}"
        class="nuxtlink"
        >
          <v-card
          elevation-0
          variant="outlined"
          style="background-color: white;"
          >
            <v-card-title>{{ appConfig.region_eng2jpn[item.area] }}</v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </template>
    </v-row>
  </v-container>
</template>