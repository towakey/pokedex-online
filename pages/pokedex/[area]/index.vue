<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const searchTerm = ref()
route.meta.title = appConfig.pokedex_view_eng2jpn[route.params.area]
definePageMeta({
  title: "Pokedex-Online"
})
const pokedex = (await useFetch('/api/v1/pokedex?mode=index&area='+route.params.area)).data.value.result
const pokelist = computed(() => {
  if(searchTerm.value === null)
  {
    return pokedex
  }
  else
  {
    if(route.params.area == 'global'){
      return pokedex.filter(item => String(item.name.jpn).match(searchTerm.value) || String(item.id).match(searchTerm.value))
    }
    else
    {
      return pokedex.filter(item => item.status.some(value => value.name.jpn.match(searchTerm.value)) || String(item.no).match(searchTerm.value))
    }
  }
})
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'ポケモン図鑑',
  href: '/pokedex',
  disabled: false
})
Object.keys(route.params).forEach((val) => {
  if(val === 'area'){
    breadcrumbs.push({
      title: appConfig.pokedex_eng2jpn[route.params[val]],
      href: '/pokedex/'+route.params[val],
      disabled: true
    })
  }
})
const metaTitle = ref(route.meta.title)
useHead({
  title: metaTitle.value,
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
      <v-col>
        <v-text-field
        v-model="searchTerm"
        label="検索(図鑑No or 名前)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
      cols="12"
      sm="4"
      v-for="pokemon in pokelist"
      :key="pokemon"
      >
        <NuxtLink
        :to="{path: `/pokedex/${route.params.area}/${pokemon.no}`}"
        class="nuxtlink"
        >
          <v-card
          elevation="0"
          variant="outlined"
          >
            <div
            class="d-flex flex-no-wrap justify-space-between"
            style="float: left;"
            >

              <v-avatar
                class="ms-2"
                size="100"
                style="/*background-color: aqua;*/"
                >
                  <v-img :src='`${"/img/" + ("0000"+pokemon.globalNo).slice(-4)+".png"}`'></v-img>
              </v-avatar>

              <v-card-title>
                No.{{ pokemon.no }} {{ pokemon.status[0].name.jpn }}
              </v-card-title>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>