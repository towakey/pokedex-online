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
      <div style="" v-if='pokedex.type1 === "ノーマル"' class="type_Normal type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ほのお"' class="type_Fire type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "みず"' class="type_Water type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "でんき"' class="type_Electric type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "くさ"' class="type_Grass type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "こおり"' class="type_Ice type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "かくとう"' class="type_Fighting type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "どく"' class="type_Poison type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "じめん"' class="type_Ground type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ひこう"' class="type_Flying type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "エスパー"' class="type_Psychic type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "むし"' class="type_Bug type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "いわ"' class="type_Rock type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ゴースト"' class="type_Ghost type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "ドラゴン"' class="type_Dragon type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "あく"' class="type_Dark type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "はがね"' class="type_Steel type_view">{{ pokedex.type1 }}</div>
      <div style="" v-else-if='pokedex.type1 === "フェアリー"' class="type_Fairy type_view">{{ pokedex.type1 }}</div>
      <div style="" v-if='pokedex.type2 !== "" && pokedex.type2 === "ノーマル"' class="type_Normal type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ほのお"' class="type_Fire type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "みず"' class="type_Water type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "でんき"' class="type_Electric type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "くさ"' class="type_Grass type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "こおり"' class="type_Ice type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "かくとう"' class="type_Fighting type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "どく"' class="type_Poison type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "じめん"' class="type_Ground type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ひこう"' class="type_Flying type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "エスパー"' class="type_Psychic type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "むし"' class="type_Bug type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "いわ"' class="type_Rock type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ゴースト"' class="type_Ghost type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "ドラゴン"' class="type_Dragon type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "あく"' class="type_Dark type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "はがね"' class="type_Steel type_view">{{ pokedex.type2 }}</div>
      <div style="" v-else-if='pokedex.type2 !== "" && pokedex.type2 === "フェアリー"' class="type_Fairy type_view">{{ pokedex.type2 }}</div>
    </v-card-title>
  </v-card>
  <ClientOnly>
    <v-dialog
    v-model="typeDialog"
    style="width: 90%;"
    >
      <v-container>
        <v-card>
          <v-card-item>
            <h3>こうかはばつぐんだ(4倍)</h3>
            <div
            v-for="val in damage4"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h3>こうかはばつぐんだ(2倍)</h3>
            <div
            v-for="val in damage2"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>
            <h3>こうかはふつうのようだ</h3>
            <div
            v-for="val in damage1"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h3>こうかはいまひとつのようだ(0.5倍)</h3>
            <div
            v-for="val in damage05"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h3>こうかはいまひとつのようだ(0.25倍)</h3>
            <div
            v-for="val in damage025"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
            </div>

            <h3>こうかはないようだ</h3>
            <div
            v-for="val in damage0"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val.value === "ノーマル"' style="" class="type_Normal type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ほのお"' style="" class="type_Fire type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "みず"' style="" class="type_Water type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "でんき"' style="" class="type_Electric type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "くさ"' style="" class="type_Grass type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "こおり"' style="" class="type_Ice type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "かくとう"' style="" class="type_Fighting type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "どく"' style="" class="type_Poison type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "じめん"' style="" class="type_Ground type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ひこう"' style="" class="type_Flying type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "エスパー"' style="" class="type_Psychic type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "むし"' style="" class="type_Bug type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "いわ"' style="" class="type_Rock type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ゴースト"' style="" class="type_Ghost type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "あく"' style="" class="type_Dark type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "はがね"' style="" class="type_Steel type_icon">{{ val.value }}</div>
              <div v-else-if='val.value === "フェアリー"' style="" class="type_Fairy type_icon">{{ val.value }}</div>
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