<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/types'
definePageMeta({
  title: "blog"
})
const query: QueryBuilderParams = { path: '/blog' }

</script>
<template>
  <v-container>
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