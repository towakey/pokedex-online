<script setup lang="ts">
definePageMeta({
  title: "Pokedex-Online"
})

// const version = (await useFetch('/api/v1/pokedex?mode=version')).data.value.result
const version = (await useFetch('/api/v1/pokedex?mode=version')).data.value
// console.log(version)

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'version',
  href: '/version',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("Pokedex-Online")
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
      sm="12"
      v-for="item in version.result" :key="item"
      >
        <v-card
        elevation-0
        variant="outlined"
        style="background-color: white;"
        >
          <v-card-title>{{ item.file }}</v-card-title>
          <v-card-text>
            <p>update: {{ item.update }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>