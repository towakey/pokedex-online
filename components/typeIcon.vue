<script setup lang="ts">
const props = defineProps(["type"])
const appConfig = useAppConfig()
const typeConfig = appConfig.type[props.type as keyof typeof appConfig.type] ?? null
</script>
<template>
  <div v-if="typeConfig" :class="`type_${typeConfig.eng} type_icon`">
    <div>{{ typeConfig.jpn }}</div>
  </div>
  <div v-else class="type_icon" style="background-color: white; color: black;">
    <div>{{ props.type }}</div>
  </div>
</template>
