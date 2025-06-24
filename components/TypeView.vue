<script setup lang="ts">
import { ref, computed } from 'vue'
const appConfig = useAppConfig()
const props = defineProps(["pokedex", "area"])
const typeDialog = ref(false)


let typeList: string[]
if( props.area == 'johto' 
      || props.area == 'hoenn' 
      || props.area == 'kanto_frlg' 
      || props.area == 'sinnoh' 
      || props.area == 'johto_hgss' 
      || props.area == 'unova_bw' 
      || props.area == 'unova_b2w2' )
{
  typeList = appConfig.type_list['2']
}
else if( props.area == 'central_kalos' 
      || props.area == 'coast_kalos' 
      || props.area == 'mountain_kalos' 
      || props.area == 'alola_sm' 
      || props.area == 'alola_usum' 
      || props.area == 'galar' 
      || props.area == 'isle_of_armor' 
      || props.area == 'crown_tundra' 
      || props.area == 'hisui' 
      || props.area == 'paldea' 
      || props.area == 'kitakami' 
      || props.area == 'blueberry' )
{
  typeList = appConfig.type_list['3']
}
else
{
  typeList = appConfig.type_list['1']
}

// 旧ロジック用の配列は廃止。computed で動的生成するため不要。

// type_compatibility が無い場合は空オブジェクトでフォールバック
const typeRates = computed(() => props.pokedex?.type_compatibility ?? {})
// 各倍率ごとのタイプ一覧を動的に計算
// 指定が無いタイプは 1 倍とみなす
const getRate = (type: string): number => {
  const r = typeRates.value[type]
  return r !== undefined ? Number(r) : 1
}

const damage0   = computed(() => typeList.filter(t => getRate(t) === 0))
const damage025 = computed(() => typeList.filter(t => getRate(t) === 0.25))
const damage05  = computed(() => typeList.filter(t => getRate(t) === 0.5))
const damage1   = computed(() => typeList.filter(t => getRate(t) === 1))
const damage2   = computed(() => typeList.filter(t => getRate(t) === 2))
const damage4   = computed(() => typeList.filter(t => getRate(t) === 4))


</script>
<template>
  <v-card
  @click="typeDialog = true"
  style="margin-top: 20px"
  variant="outlined"
  :id="`type`"
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
        <v-card
        variant="outlined"
        style="background-color: rgba(255,255,255,0.9);"
        >
          <v-card-item>
            <h3>こうかはばつぐんだ(4倍)</h3>
            <div v-if="damage4.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage4"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
            </div>

            <h3>こうかはばつぐんだ(2倍)</h3>
            <div v-if="damage2.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage2"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
            </div>
            <h3>こうかはふつうのようだ</h3>

            <div v-if="damage1.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage1"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
            </div>

            <h3>こうかはいまひとつのようだ(0.5倍)</h3>
            <div v-if="damage05.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage05"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
            </div>

            <h3>こうかはいまひとつのようだ(0.25倍)</h3>
            <div v-if="damage025.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage025"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
            </div>

            <h3>こうかはないようだ</h3>
            <div v-if="damage0.length === 0" class="no-type">なし</div>
            <div v-else>
            <div
            v-for="val in damage0"
            :key="val"
            style="display: inline-block;"
            >
            <div v-if='val === "ノーマル"' style="" class="type_Normal type_icon">{{ val }}</div>
              <div v-else-if='val === "ほのお"' style="" class="type_Fire type_icon">{{ val }}</div>
              <div v-else-if='val === "みず"' style="" class="type_Water type_icon">{{ val }}</div>
              <div v-else-if='val === "でんき"' style="" class="type_Electric type_icon">{{ val }}</div>
              <div v-else-if='val === "くさ"' style="" class="type_Grass type_icon">{{ val }}</div>
              <div v-else-if='val === "こおり"' style="" class="type_Ice type_icon">{{ val }}</div>
              <div v-else-if='val === "かくとう"' style="" class="type_Fighting type_icon">{{ val }}</div>
              <div v-else-if='val === "どく"' style="" class="type_Poison type_icon">{{ val }}</div>
              <div v-else-if='val === "じめん"' style="" class="type_Ground type_icon">{{ val }}</div>
              <div v-else-if='val === "ひこう"' style="" class="type_Flying type_icon">{{ val }}</div>
              <div v-else-if='val === "エスパー"' style="" class="type_Psychic type_icon">{{ val }}</div>
              <div v-else-if='val === "むし"' style="" class="type_Bug type_icon">{{ val }}</div>
              <div v-else-if='val === "いわ"' style="" class="type_Rock type_icon">{{ val }}</div>
              <div v-else-if='val === "ゴースト"' style="" class="type_Ghost type_icon">{{ val }}</div>
              <div v-else-if='val === "ドラゴン"' style="" class="type_Dragon type_icon">{{ val }}</div>
              <div v-else-if='val === "あく"' style="" class="type_Dark type_icon">{{ val }}</div>
              <div v-else-if='val === "はがね"' style="" class="type_Steel type_icon">{{ val }}</div>
              <div v-else-if='val === "フェアリー"' style="" class="type_Fairy type_icon">{{ val }}</div>
            </div>
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
