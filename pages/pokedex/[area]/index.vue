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
  if(searchTerm.value === '')
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
      return pokedex
      // return pokedex.filter(item => String(item.status.name.jpn).match(searchTerm.value) || String(item.id).match(searchTerm.value))
    }
  }
})
</script>
<template>
  <v-container>
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
        >
          <v-card
          elevation="0"
          >
            <v-card-title>
              No.{{ pokemon.no }} {{ pokemon.status[0].name.jpn }}
            </v-card-title>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>