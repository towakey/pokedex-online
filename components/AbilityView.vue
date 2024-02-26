<script setup lang="ts">
const appConfig = useAppConfig()
const props = defineProps(["pokedex"])

</script>
<template>
  <v-card
  elevation="0"
  v-if='props.pokedex.ability1 !== ""'>
    <v-card-title>とくせい1 : {{ props.pokedex.ability1 }}</v-card-title>
    <v-card-text>{{ props.pokedex.ability1_description }}</v-card-text>
  </v-card>
  <v-card 
  elevation="0"
  v-if='props.pokedex.ability2 !== ""'>
    <v-card-title>とくせい2 : {{ props.pokedex.ability2 }}</v-card-title>
    <v-card-text>{{ props.pokedex.ability2_description }}</v-card-text>
  </v-card>
  <v-card 
  elevation="0"
  v-if='props.pokedex.dream_ability !== ""'>
    <v-card-title>かくれとくせい : {{ props.pokedex.dream_ability }}</v-card-title>
    <v-card-text>{{ props.pokedex.dream_ability_description }}</v-card-text>
  </v-card>
</template>
