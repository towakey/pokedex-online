<script setup lang="ts">
const route = useRoute()
route.meta.title = 'pokedex.jsonについて'
definePageMeta({
  title: "pokedex.jsonについて"
})

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'pokedex.jsonについて',
  href: '/pokedexjson',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("pokedex.jsonについて")
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
  <v-container
  style="background-color: white;"
  >
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
    <ContentDoc />
  </v-container>
  <!-- <v-col v-for="article in list" :key="article._path"
  cols="12"
  sm="6"
  >
    <NuxtLink
    :to="{path: article._path}"
    >
      <v-card
        :title="article.title"
        :text="article.description"
        elevation="0"
        color="#e3e1e1"
        height="150"
      />
    </NuxtLink>
  </v-col> -->
</template>