<script setup lang="ts">
definePageMeta({
  title: "blog"
})

const { data: article } = useAsyncData('blog', () => 
  queryContent(useRoute().path).findOne()
)
</script>
<template>
  <v-row no-gutters>
    <v-col
    cols="8"
    >
      <v-container>
        <ContentDoc />
      </v-container>
    </v-col>
    <v-col
    cols="4"
    >
      <ContentList v-slot="{ list }" path="/blog">
        <v-list>
          <v-list-item
          v-for="article in list" :key="article._path"
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
          </v-list-item>
        </v-list>
      </ContentList>
    </v-col>
  </v-row>
</template>