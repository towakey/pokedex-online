<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/types'
definePageMeta({
  title: "blog"
})
const query: QueryBuilderParams = { path: '/blog' }

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'ブログ',
  href: '/blog',
  disabled: true
})

const metaTitle = ref("blog")
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
    <ContentList v-slot="{ list }" :query="query">
      <v-row>
        <v-col v-for="article in list" :key="article._path"
        cols="12"
        sm="6"
        >
          <NuxtLink
          :to="{path: article._path}"
          class="nuxtlink"
          >
            <v-card
              :title="article.title"
              :text="article.category"
              elevation="0"
              color="#e3e1e1"
              height="100"
            />
          </NuxtLink>
        </v-col>
      </v-row>
    </ContentList>
  </v-container>
</template>