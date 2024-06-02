<script setup lang="ts">
definePageMeta({
  title: "Pokedex-Online"
})
const menu = [
  {
    title: 'ポケモン図鑑',
    path: '/pokedex'
  },
  {
    title: 'ブログ',
    path: '/blog'
  },
  {
    title: '図鑑カメラ',
    path: '/camera'
  },
  {
    title: 'pokedex.jsonについて',
    path: '/pokedexjson'
  }
]
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: true
})
const metaTitle = ref("Pokedex-Online")
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
      v-for="item in menu" :key="item.title"
      >
        <NuxtLink
        :to="{path: `${item.path}`}"
        class="nuxtlink"
        >
          <v-card
          elevation-0
          variant="outlined"
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>
