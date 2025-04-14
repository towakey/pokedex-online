<script setup lang="ts">
const props = defineProps(["type"])
const appConfig = useAppConfig()
const type = appConfig.type[props.type as keyof typeof appConfig.type]
</script>
<template>
  <div :class="`type_${type.eng} type_icon`">
    <div>{{ type.jpn }}</div>
  </div>
</template>
