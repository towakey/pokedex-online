<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'ポケモン図鑑'
definePageMeta({
  title: "Pokedex-Online"
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      sm="6"
      v-for="item in appConfig.pokedex_list" :key="item.title"
      >
        <NuxtLink
        :to="{path: `${item.path}`}"
        >
          <v-card
          elevation-0
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>