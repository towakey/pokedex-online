<template>
  <v-card
    elevation="0"
    class="pokemon-card"
  >
    <div class="d-flex gap-10">
      <v-avatar size="120" tile class="flex-shrink-0">
        <NuxtImg
          :src="imgSrc"
          alt=""
          width="120"
          height="120"
          fit="cover"
        />
      </v-avatar>
      <div class="flex-grow-1 overflow-hidden ms-2">
        <div class="no-label">{{ noLabel }}</div>
        <div class="main-name text-truncate">{{ mainName }}</div>
        <div v-if="subName" class="sub-name text-truncate">{{ subName }}</div>
        <div class="d-flex mt-1">
          <typeIcon
            v-if="pokemon.status[0].type1"
            :type="pokemon.status[0].type1"
            :mode="'icon'"
            class="me-1"
          />
          <typeIcon
            v-if="pokemon.status[0].type2"
            :type="pokemon.status[0].type2"
            :mode="'icon'"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import typeIcon from '~/components/typeIcon.vue'

interface PokemonStatus {
  weight: string
  height: string
  name?: { jpn: string }
  type1?: string
  type2?: string
  form?: string | string[]
  region?: string | string[]
  mega_evolution?: string | string[]
  gigantamax?: string | string[]
}
interface Pokemon {
  no: string
  id?: string
  globalNo: string
  name: string | { jpn: string }
  status: PokemonStatus[]
}

const props = defineProps({
  pokemon: {
    type: Object as PropType<Pokemon>,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
})

const appConfig = useAppConfig()

const imgSrc = computed(() => {
  // 画像パスの仕様は既存コードと合わせる
  return `/img/pokedex/${props.pokemon.id}.png`
})

const noLabel = computed(() => {
  const serial = `0000${props.pokemon.no}`.slice(-4)
  if (props.area === 'global') {
    return `全国図鑑No.${serial}`
  }
  const region = appConfig.pokedex_eng2jpn[props.area] || ''
  return `${region}No.${serial}`
})

const mainName = computed(() => {
  if (props.area === 'global') {
    return typeof props.pokemon.name === 'string' ? props.pokemon.name : (props.pokemon.name as any).jpn
  }
  return props.pokemon.status[0].name?.jpn ?? ''
})

const subName = computed(() => {
  const status = props.pokemon.status[0] || {}
  const fields = ['region', 'form', 'mega_evolution', 'gigantamax'] as const
  const parts: string[] = []
  fields.forEach((key) => {
    const val = (status as any)[key]
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val)) {
        parts.push(...val.filter(v => v))
      } else {
        parts.push(String(val))
      }
    }
  })
  if (parts.length === 0 && (status as any).name?.jpn) {
    // return (status as any).name.jpn
    return '　'
  }
  return parts.join('・')
})
</script>

<style scoped>
.pokemon-card {
  border: 4px solid #bcd9ff;
  border-radius: 16px;
  padding: 8px;
  background-color: white;
}
.no-label {
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
}
.main-name {
  font-size: 1.2rem;
  font-weight: 700;
}
.sub-name {
  font-size: 0.9rem;
  color: #555;
}
</style>
