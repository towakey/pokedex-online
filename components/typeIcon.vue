<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: string
  mode?: 'text' | 'icon'
}>(), {
  mode: 'text'
})

const appConfig = useAppConfig()
const typeConfig = appConfig.type[props.type as keyof typeof appConfig.type] ?? null

// アイコンファイルのパスを取得
const iconPath = computed(() => {
  if (!typeConfig) return ''
  return `/img/type/typeicon_${typeConfig.eng.toLowerCase()}.png`
})
</script>
<template>
  <div v-if="typeConfig" :class="`type_${typeConfig.eng} type_icon` + (mode === 'icon' ? ' mode-icon' : '')">
    <img 
      v-if="mode === 'icon'"
      :src="iconPath" 
      :alt="typeConfig.jpn" 
      :title="typeConfig.jpn"
      class="type-icon-img"
      @error="$event.target.style.display='none'"
    >
    <div v-else>
      {{ typeConfig.jpn }}
    </div>
  </div>
  <div v-else class="type_icon" style="background-color: white; color: black;">
    <div>{{ props.type }}</div>
  </div>
</template>

<style scoped>
.type_icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3em;
  height: 1.5em;
  border-radius: 4px;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  padding: 0.5em;
  box-sizing: content-box;
  overflow: hidden;
}

.type_icon.mode-icon {
  min-width: auto;
  height: auto;
  padding: 0;
}

.type_icon[class*="type_"] {
  background-color: var(--type-color);
}

.type-icon-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* タイプ別の色を設定 */
.type_normal { --type-color: #A8A77A; }
.type_fire { --type-color: #EE8130; }
.type_water { --type-color: #6390F0; }
.type_electric { --type-color: #F7D02C; }
.type_grass { --type-color: #7AC74C; }
.type_ice { --type-color: #96D9D6; }
.type_fighting { --type-color: #C22E28; }
.type_poison { --type-color: #A33EA1; }
.type_ground { --type-color: #E2BF65; }
.type_flying { --type-color: #A98FF3; }
.type_psychic { --type-color: #F95587; }
.type_bug { --type-color: #A6B91A; }
.type_rock { --type-color: #B6A136; }
.type_ghost { --type-color: #735797; }
.type_dragon { --type-color: #6F35FC; }
.type_dark { --type-color: #705746; }
.type_steel { --type-color: #B7B7CE; }
.type_fairy { --type-color: #D685AD; }
</style>
