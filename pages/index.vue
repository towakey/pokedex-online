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
  }
]
</script>
<template>
  <v-container>
    <v-row>
      <v-col
      cols="12"
      sm="6"
      v-for="item in menu" :key="item.title"
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
