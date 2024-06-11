<script setup lang="ts">
const appConfig = useAppConfig()
defineProps(["description"])
</script>
<template>
  <v-card
  variant="outlined"
  style="margin-top: 20px;"
  >
    <v-list
    lines="two"
    >
      <v-list-item
        v-for="(ver, index) in description" :key="index"
      >
        <v-list-item-title>{{ appConfig.ver_eng2jpn[index] }}</v-list-item-title>
        <v-list-item-subtitle class="wrap-text" v-if="ver !== ''">{{ ver }}</v-list-item-subtitle>
        <v-list-item-subtitle class="wrap-text" v-else>じょうほう なし</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
