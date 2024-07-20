<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'ポケモン図鑑'
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
  title: 'ポケモン図鑑',
  href: '/pokedex',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("ポケモン図鑑")
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
      <v-col
      cols="12"
      sm="6"
      v-for="item in appConfig.pokedex_list" :key="item.title"
      >
        <NuxtLink
        :to="{path: `/pokedex${item.path}`}"
        class="nuxtlink"
        >
          <v-card
          elevation-0
          variant="outlined"
          style="background-color: white;"
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>