<script setup lang="ts">
const appConfig = useAppConfig()
const props = defineProps(["pokedex", "area"])

</script>
<template>
  <div
  v-if='props.pokedex.ability1 !== ""'
  >
  <v-card
  variant="outlined"
  style="margin-top: 20px;"
  :id="`ability`"
  >
    <v-card
    elevation="0"
    v-if='props.pokedex.ability1 !== ""'>
      <v-card-title>とくせい1 : <NuxtLink class="nuxtlink" :to="{path: `/ability/${props.area}`, hash: `#${props.pokedex.ability1}`}">{{ props.pokedex.ability1 }}</NuxtLink></v-card-title>
      <v-card-text>{{ props.pokedex.ability1_description["jpn"] }}</v-card-text>
    </v-card>
    <v-card 
    elevation="0"
    v-if='props.pokedex.ability2 !== ""'>
      <v-card-title>とくせい2 : <NuxtLink class="nuxtlink" :to="{path: `/ability/${props.area}`, hash: `#${props.pokedex.ability2}`}">{{ props.pokedex.ability2 }}</NuxtLink></v-card-title>
      <v-card-text>{{ props.pokedex.ability2_description["jpn"] }}</v-card-text>
    </v-card>
    <v-card 
    elevation="0"
    v-if='props.pokedex.dream_ability !== ""'>
      <v-card-title>かくれとくせい : <NuxtLink class="nuxtlink" :to="{path: `/ability/${props.area}`, hash: `#${props.pokedex.dream_ability}`}">{{ props.pokedex.dream_ability }}</NuxtLink></v-card-title>
      <v-card-text>{{ props.pokedex.dream_ability_description["jpn"] }}</v-card-text>
    </v-card>
  </v-card>
  </div>
</template>
