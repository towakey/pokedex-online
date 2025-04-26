<script setup lang="ts">
definePageMeta({
  title: "webapp"
})

const menu = [
  // {
  //   title: 'コミュニティカード',
  //   path: '/webapp/communitycard',
  //   img: '/icon.png'
  // },
  {
    title: 'リーグカードジェネレーター',
    path: '/webapp/leaguecard_generator',
    img: '/icon.png'
  },
  {
    title: 'タイプチェッカー',
    path: '/webapp/type_checker',
    img: '/icon.png'
  },
  {
    title: 'DB Viewer',
    path: '/webapp/db_view',
    img: '/icon.png'
  },
]

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'webapp',
  href: '/webapp',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("webapp")
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
      v-for="item in menu" :key="item.title"
      >
        <NuxtLink
        :to="{path: `${item.path}`}"
        class="nuxtlink"
        >
          <v-card
          elevation-0
          variant="outlined"
          style="background-color: white;"
          >
            <div
            class="d-flex align-center"
            style="float: left;"
            >
              <v-avatar
              class="ms-2"
              size="100"
              tile
              >
                <v-img :src="`${item.img}`"></v-img>
              </v-avatar>
              <v-card-title>{{ item.title }}</v-card-title>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>
