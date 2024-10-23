<script setup lang="ts">
const props = defineProps(["evolveData", "area"])
// console.log(props.evolveData.evolve)
let flag: any
flag = false

if(Array.isArray(props.evolveData.evolve)){
  flag = true
  // console.log(props.evolveData.evolve)
}

</script>
<template>
  <v-row
  v-if="flag"
  style="margin-top: 20px;"
  :id="`evolve`"
  >
    <v-col
    cols="12"
    sm="6"
    v-for="(evolve, idx) in props.evolveData.evolve"
    :key="evolve"
    >
      <NuxtLink
      :to="{path: `/pokedex/${area}/${Object.keys(evolve)[0]}`}"
      class="nuxtlink">
        <v-card
        variant="outlined"
        style="background-color: white;"
        >
          <div
          class="d-flex flex-no-wrap justify-space-between"
          style="float: left;"
          >
            <v-avatar
            class="ms-2"
            size="100"
            >
              <v-img :src="`/img/${('0000'+evolve.globalNo).slice(-4)}.png`"></v-img>
            </v-avatar>
            <div>
              <v-card-title>{{ evolve.name.jpn }}</v-card-title>
              <v-card-subtitle class="text-wrap">{{ Object.values(evolve)[0] }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </NuxtLink>
    </v-col>
  </v-row>
  <!-- <v-card
  variant="outlined"
  style="margin-top: 20px;"
  v-for="evolve in props.evolveData.evolve"
  v-if="flag">
    <v-card
    >
      <v-avatar
      >
        <v-img src=""></v-img>
      </v-avatar>
      <v-card-title>{{ evolve }}</v-card-title>
    </v-card>
  </v-card> -->
</template>
