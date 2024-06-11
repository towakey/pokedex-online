<script setup lang="ts">
const appConfig = useAppConfig()
const props = defineProps(["pokedex", "area"])
const typeDialog = ref(false)
// const typeList: string[] = [
//   "ノーマル",
//   "ほのお",
//   "みず",
//   "でんき",
//   "くさ",
//   "こおり",
//   "かくとう",
//   "どく",
//   "じめん",
//   "ひこう",
//   "エスパー",
//   "むし",
//   "いわ",
//   "ゴースト",
//   "ドラゴン",
// ]
// if( props.area == 'johto' || props.area == 'hoenn' || props.area == 'sinnoh' || props.area == 'unova_bw' || props.area == 'unova_b2w2' ){
//   typeList.push('あく')
//   typeList.push('はがね')
// }else if( props.area == 'central_kalos' || props.area == 'coast_kalos' || props.area == 'mountain_kalos' || props.area == 'alola_sm' || props.area == 'alola_usum' || props.area == 'galar' || props.area == 'isle_of_armor' || props.area == 'crown_tundra' || props.area == 'hisui'  || props.area == 'paldea' ){
//   typeList.push('あく')
//   typeList.push('はがね')
//   typeList.push('フェアリー')
// }

let typeList: string[]
if( props.area == 'johto' || props.area == 'hoenn' || props.area == 'sinnoh' || props.area == 'unova_bw' || props.area == 'unova_b2w2' )
{
  typeList = appConfig.type_list['2']
}
else if( props.area == 'central_kalos' || props.area == 'coast_kalos' || props.area == 'mountain_kalos' || props.area == 'alola_sm' || props.area == 'alola_usum' || props.area == 'galar' || props.area == 'isle_of_armor' || props.area == 'crown_tundra' || props.area == 'hisui'  || props.area == 'paldea' )
{
  typeList = appConfig.type_list['3']
}
else
{
  typeList = appConfig.type_list['1']
}

let damage0 = ref([])
let damage025 = ref([])
let damage05 = ref([])
let damage1 = ref([])
let damage2 = ref([])
let damage4 = ref([])

const types = props.pokedex.type_compatibility
for(let val in typeList)
{
  if(types[typeList[val]] == "0"){
    damage0.value[damage0.value.length]=ref(typeList[val])
  }else if(types[typeList[val]] == "0.25"){
    damage025.value[damage025.value.length]=ref(typeList[val])
  }else if(types[typeList[val]] == "0.5"){
    damage05.value[damage05.value.length]=ref(typeList[val])
  }else if(types[typeList[val]] == "1"){
    damage1.value[damage1.value.length]=ref(typeList[val])
  }else if(types[typeList[val]] == "2"){
    damage2.value[damage2.value.length]=ref(typeList[val])
  }else if(types[typeList[val]] == "4"){
    damage4.value[damage4.value.length]=ref(typeList[val])
  }
}

</script>
<template>
  <v-card
  @click="typeDialog = true"
  style="margin-top: 20px"
  variant="outlined"
  >
    <v-card-title style="display: flex;padding: 0px;">
      <div style="" v-if='pokedex.type1 === "ノーマル"' class="type_Normal">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ほのお"' class="type_Fire">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "みず"' class="type_Water">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "でんき"' class="type_Electric">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "くさ"' class="type_Grass">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "こおり"' class="type_Ice">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "かくとう"' class="type_Fighting">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "どく"' class="type_Poison">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "じめん"' class="type_Ground">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ひこう"' class="type_Flying">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "エスパー"' class="type_Psychic">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "むし"' class="type_Bug">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "いわ"' class="type_Rock">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ゴースト"' class="type_Ghost">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ドラゴン"' class="type_Dragon">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "あく"' class="type_Dark">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "はがね"' class="type_Steel">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "フェアリー"' class="type_Fairy">{{ pokedex.type1 }}</div>
      <div style="" v-if='pokedex.type2 !== "" && pokedex.type2 === "ノーマル"' class="type_Normal">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ほのお"' class="type_Fire">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "みず"' class="type_Water">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "でんき"' class="type_Electric">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "くさ"' class="type_Grass">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "こおり"' class="type_Ice">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "かくとう"' class="type_Fighting">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "どく"' class="type_Poison">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "じめん"' class="type_Ground">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ひこう"' class="type_Flying">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "エスパー"' class="type_Psychic">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "むし"' class="type_Bug">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "いわ"' class="type_Rock">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ゴースト"' class="type_Ghost">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ドラゴン"' class="type_Dragon">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "あく"' class="type_Dark">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "はがね"' class="type_Steel">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "フェアリー"' class="type_Fairy">{{ pokedex.type2 }}</div>
    </v-card-title>
  </v-card>
  <ClientOnly>
    <v-dialog
    v-model="typeDialog"
    >
      <v-container>
        <v-card>
          <v-card-item>
            <h2>こうかはばつぐんだ(4倍)</h2>
            <div
            v-for="val in damage4"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h2>こうかはばつぐんだ(2倍)</h2>
            <div
            v-for="val in damage2"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>
            <h2>こうかはふつうのようだ</h2>
            <div
            v-for="val in damage1"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h2>こうかはいまひとつのようだ(0.5倍)</h2>
            <div
            v-for="val in damage05"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h2>こうかはいまひとつのようだ(0.25倍)</h2>
            <div
            v-for="val in damage025"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h2>こうかはないようだ</h2>
            <div
            v-for="val in damage0"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="margin: 5px;padding: 5px;border-radius: 10px;" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

          </v-card-item>
          <v-card-actions>
            <v-btn block @click="typeDialog = false">とじる</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </ClientOnly>
</template>