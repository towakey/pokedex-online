<script setup lang="ts">
const title = ref('')
const pageTitle = ref('')
const drawer = ref(false)
const route = useRoute()
const menu = [
  {
    title: 'TOP',
    path: ''
  }
]
pageTitle.value = route.meta.title

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
    primary
    prominent
    >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      >
        <v-img src="/icon.png"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <NuxtLink
        :to="{path: `/`}"
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