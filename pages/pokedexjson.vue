<script setup lang="ts">
definePageMeta({
  title: "pokedex.jsonについて"
})
</script>
<template>
  <ContentList path="pokedexjson" v-slot="{ list }">
    <v-container>
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
  </ContentList>
</template>