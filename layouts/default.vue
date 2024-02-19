<script setup lang="ts">
const drawer = ref(false)
const menu = [
  {
    title: 'TOP',
    path: ''
  }
]
</script>
<template>
  <v-layout>
    <v-app-bar
    primary
    prominent
    >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        Pokedex-Online
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