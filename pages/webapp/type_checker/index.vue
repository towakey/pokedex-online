<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = 'タイプチェッカー'

const typeData = (await import('~/assets/v1/pokedex/type/type.json')).type


const selectedGameVersion = ref(appConfig.gameVersion[appConfig.gameVersion.length-1].eng)
const attackType = ref('')
const defenseType1 = ref('')
const defenseType2 = ref('')
const result = ref('')

// console.log(typeData[0].geme_version.includes(selectedGameVersion.value))

const currentTypeData = computed(() => {
  return typeData.find(item => item.geme_version.includes(selectedGameVersion.value))?.type || null
})
const types = computed(() => {
  return currentTypeData.value ? Object.keys(currentTypeData.value) : []
})

const calculateEffectiveness = () => {
  if (!currentTypeData.value) {
    result.value = 'このゲームバージョンのデータが見つかりません。'
    return
  }

  if (!attackType.value) {
    // 攻撃タイプが選択されていない場合は全タイプの相性表を表示
    // result.value = JSON.stringify(currentTypeData.value, null, 2)
    result.value = ""
    return
  }

  if(defenseType1.value || defenseType2.value) {
    let effectiveness = 1
    let text = "こうかはふつうのようだ"
    if (defenseType1.value && currentTypeData.value[attackType.value]) {
      effectiveness *= currentTypeData.value[attackType.value][defenseType1.value]
    }
    if (defenseType2.value && defenseType2.value !== defenseType1.value && currentTypeData.value[attackType.value]) {
      effectiveness *= currentTypeData.value[attackType.value][defenseType2.value]
    }
    
    if(effectiveness == 0) {
      text = "こうかはないようだ"
    }else if(effectiveness >= 2) {
      text = "こうかはばつぐんだ"
    }else if(effectiveness <= 0.5) {
      text = "こうかはいまひとつのようだ"
    }

    result.value = `×${effectiveness}(${text})`
  } else {
    result.value = ""
  }
}

watch([selectedGameVersion, attackType, defenseType1, defenseType2], calculateEffectiveness, { immediate: true })

definePageMeta({
  title: "タイプチェッカー"
})
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'webapp',
  href: '/webapp',
  disabled: false
})
breadcrumbs.push({
  title: route.meta.title,
  href: '/webapp/type_checker',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref(route.meta.title)
updateMetadata(metaTitle.value)
useHead({
  title: metaTitle,
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
      <v-col cols="12">
        <v-card
        elevation-0
        variant="outlined"
        style="background-color: white;"
        >
          <v-card-title><pre>効果：{{ result }}</pre></v-card-title>
          <!-- <v-card-text> -->
            <!-- <pre>{{ result }}</pre> -->
          <!-- </v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      cols="12"
      sm="6"
      md="6"
      >
        <v-select
        v-model="attackType"
        :items="types"
        label="攻撃タイプ"
        elevation-0
        variant="outlined"
        >
        <template v-slot:prepend-item>
          <v-list-item title="タイプを選択してください" value=""></v-list-item>
        </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-select
        v-model="defenseType1"
        :items="types"
        label="防御タイプ1"
        elevation-0
        variant="outlined"
        >
          <template v-slot:prepend-item>
            <v-list-item title="タイプを選択してください" value=""></v-list-item>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
        v-model="defenseType2"
        :items="types"
        label="防御タイプ2"
        elevation-0
        variant="outlined"
        >
          <template v-slot:prepend-item>
            <v-list-item title="タイプを選択してください" value=""></v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      cols="12"
      sm="12"
      md="12"
      >
        <v-select
        v-model="selectedGameVersion"
        :items="appConfig.gameVersion"
        item-title="jpn"
        item-value="eng"
        label="バージョン"
        elevation-0
        variant="outlined"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>