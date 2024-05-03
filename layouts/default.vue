<script setup lang="ts">
const title = ref('')
const pageTitle = ref('')
const drawer = ref(false)
const route = useRoute()
pageTitle.value = route.meta.title

const menu = [
{
    title: 'TOP',
    path: ''
  },
  {
    title: 'ポケモン図鑑',
    path: 'pokedex'
  },
  {
    title: 'ブログ',
    path: 'blog'
  },
  {
    title: '図鑑カメラ',
    path: 'camera'
  },
  {
    title: 'pokedex.jsonについて',
    path: 'pokedexjson'
  }
]

const onTitleChanged = (newTitle: string) => {
  pageTitle.value = newTitle
  title.value = newTitle
}

watchEffect(() => {
  route.meta.title && onTitleChanged(route.meta.title as string)
})
</script>
<template>
  <v-layout>
    <v-app-bar
    color="primary"
    prominent
    >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      class="btn-fix"
      >
        <!-- <v-img src="/public/icon.png"></v-img> -->
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <NuxtLink
        :to="{path: `/`}"
        class="nuxtlink"
        style="color: white;"
        >
        {{ pageTitle }}
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    >
      <NuxtLink
      v-for="item in menu" :key="item.title"
      :to="{path: `/${item.path}`}"
      class="nuxtlink"
      >
        <v-list nav>
          <v-list-item
          prepenf-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>
      </NuxtLink>
    </v-navigation-drawer>
    <v-main
    style="height: 100%;"
    >
      <slot></slot>
    </v-main>
  </v-layout>
</template>