<script setup lang="ts">
const config = useRuntimeConfig()
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = appConfig.pokedex_eng2jpn[route.params.area]
definePageMeta({
  title: "Pokedex-Online"
})
let nameDialog = ref(false)
let model = ref(0)
const pokedex = (await useFetch('/api/v1/pokedex?mode=details&area='+route.params.area+'&id='+route.params.id)).data.value.result
const prev = (await useFetch('/api/v1/pokedex?mode=details&area='+route.params.area+'&id='+(Number(route.params.id) - 1))).data.value.result
const next = (await useFetch('/api/v1/pokedex?mode=details&area='+route.params.area+'&id='+(Number(route.params.id) + 1))).data.value.result
const src = "/img/" + ('0000' + pokedex.globalNo).slice( -4 ) + ".png"

// console.log(pokedex)
// console.log(prev)
// console.log(next)

let existsPokedex = {}
let pdx
// appConfig.pokedex_list.filter(item => item.title !== '全国図鑑').forEach(async pokedex => {
for(pdx in appConfig.pokedex_list.filter(item => !item.area.includes('global'))){
  // for(pdx in appConfig.pokedex_list){
  const {data, pending, error, refresh} = (await useFetch('/api/v1/pokedex?mode=exists&area='+appConfig.pokedex_list[Number(pdx)+1].area+'&id='+String(route.params.id)))
  existsPokedex[appConfig.pokedex_list[Number(pdx)+1].area] = data.value.result
}

let pokedex_status
let normal = 0
let alora = 1
let galar = 1
let hisui = 1
let paldea = 1
let region_name = ''
let mega = 1
let giga = 1
let mugen = 1
if(route.params.area !== 'global'){
  for(pokedex_status in pokedex.status){
    if(pokedex.status[pokedex_status].form == 'メガシンカ'){
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-mega' + mega + ".png"
      mega++
    }else if(pokedex.status[pokedex_status].form.includes('キョダイマックス')){
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-gigantmax' + giga + ".png"
      giga++
    }else if(pokedex.status[pokedex_status].form.includes('ムゲンダイマックス')){
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-mugen' + mugen + ".png"
      mugen++
    }else if(pokedex.status[pokedex_status].form.includes('アローラのすがた')){
      region_name = 'alora'
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-' + region_name + alora + ".png"
      alora++
    }else if(pokedex.status[pokedex_status].form.includes('ガラルのすがた')){
      region_name = 'galar'
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-' + region_name + galar + ".png"
      galar++
    }else if(pokedex.status[pokedex_status].form.includes('ヒスイのすがた')){
      region_name = 'hisui'
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-' + region_name + hisui + ".png"
      hisui++
    }else if(pokedex.status[pokedex_status].form.includes('パルデアのすがた')){
      region_name = 'paldea'
      pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-' + region_name + paldea + ".png"
      paldea++
    }else{
      if(normal == 0){
        pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + ".png"
      }else{
        pokedex.status[pokedex_status]["src"]='/img/'+('0000' + pokedex.globalNo).slice( -4 ) + '-' + normal + ".png"
      }
      normal++
    }
  }
}
const metaImage = ref("https://pokedex-online.jp/img/" + ('0000' + pokedex.globalNo).slice( -4 ) + ".png")

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'ポケモン図鑑',
  href: '/pokedex',
  disabled: false
})
Object.keys(route.params).forEach((val) => {
  if(val === 'area'){
    breadcrumbs.push({
      title: appConfig.pokedex_eng2jpn[route.params[val]],
      href: '/pokedex/'+route.params[val],
      disabled: false
    })
  }else if(val === 'id'){
    breadcrumbs.push({
      title: pokedex.name.jpn,
      href: '/pokedex/'+route.params['area']+'/'+route.params['id'],
      disabled: true
    })
  }
})



const nextModel = () => {
  if((pokedex.status.length - 1) <= model.value)
  {
    model.value = 0
  }
  else
  {
    model.value++
  }
}
const prevModel = () => {
  if(model.value == 0)
  {
    model.value = pokedex.status.length - 1
  }
  else
  {
    model.value--
  }
}

// const existsPokedex: boolean = async (area: any, id: any): Promise<boolean> => {
// const existsPokedex = async (area: any, id: any): Promise<boolean> => {
//   // const result = (await useFetch('/api/v1/pokedex?mode=exists&area='+area+'&id='+String(id))).data.value.result
//   const {data, pending, error, refresh} = await useFetch('/api/v1/pokedex?mode=exists&area='+area+'&id='+String(id))

  
//   console.log(data.value.result)
//   return data
// }

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref(pokedex.name.jpn+" - "+route.meta.title+"\n#"+pokedex.name.jpn)
updateMetadata(metaTitle.value)
useHead({
  title: metaTitle,
  meta: [
  {
      hid: 'og:title',
      name: 'og:title',
      content: metaTitle
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: metaTitle
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: metaImage
    }
  ]
})

const onSwipeLeft = () => {
  // console.log("left")
  // console.log(`/pokedex/${route.params.area}/${(Number(route.params.id) - 1)}`)
  // console.log(prev)
  if(prev != false){
    navigateTo(`/pokedex/${route.params.area}/${(Number(route.params.id) - 1)}`, {
      replace: false // trueにすると、履歴に新しいエントリを追加せずに現在のエントリを置き換えます
    })
  }
}
const onSwipeRight = () => {
  // console.log("right")
  // console.log(`/pokedex/${route.params.area}/${(Number(route.params.id) + 1)}`)
  // console.log(next)
  if(next != false){
    navigateTo(`/pokedex/${route.params.area}/${(Number(route.params.id) + 1)}`, {
      replace: false // trueにすると、履歴に新しいエントリを追加せずに現在のエントリを置き換えます
    })
  }
}
const onTap = () => {
  console.log("tap")
}

const navigate = async (to) => {
  // console.log(`${to} へ移動します`)
  
  // オプション1: useRouterを使用
  // await router.push(to)
  
  // オプション2: navigateToを使用（推奨）
  await navigateTo(to, {
    replace: false // trueにすると、履歴に新しいエントリを追加せずに現在のエントリを置き換えます
  })
  
  // console.log('ナビゲーション完了')
}

const container = ref(null)
const touchStartX = ref(0)
const touchStartY = ref(0)

const onTouchStart = (e) => {
  // console.log('Touch Start:', e.touches[0].clientX, e.touches[0].clientY)
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
}

const onTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const diffX = touchEndX - touchStartX.value
  const diffY = touchEndY - touchStartY.value

  // console.log('Touch End:', e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  

  // 水平方向のスワイプが垂直方向より大きい場合のみナビゲーションを行う
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      onSwipeLeft()
      // navigateToPreviousPage()
    } else {
      onSwipeRight()
      // navigateToNextPage()
    }
  }
}
// const onTouchMove = (e) => {
//   console.log('Touch Move:', e.touches[0].clientX, e.touches[0].clientY)
// }

const navigateToNextPage = () => {
  // 現在のルートに基づいて次のページを決定
  const nextRoute = getNextRoute()
  if (nextRoute) {
    router.push(nextRoute)
  }
}

const navigateToPreviousPage = () => {
  // 現在のルートに基づいて前のページを決定
  const previousRoute = getPreviousRoute()
  if (previousRoute) {
    router.push(previousRoute)
  }
}

const getNextRoute = () => {
  // ここでルートに基づいて次のページを決定するロジックを実装
  // 例: return '/next-page'
}

const getPreviousRoute = () => {
  // ここでルートに基づいて前のページを決定するロジックを実装
  // 例: return '/previous-page'
}

// イベントリスナーを直接追加
onMounted(() => {
  const container = document.querySelector('.v-container')
  if (container) {
    container.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
    container.addEventListener('touchend', onTouchEnd, { capture: true })
  }
})

// コンポーネントのアンマウント時にイベントリスナーを削除
onUnmounted(() => {
  const container = document.querySelector('.v-container')
  if (container) {
    container.removeEventListener('touchstart', onTouchStart, { capture: true })
    container.removeEventListener('touchend', onTouchEnd, { capture: true })
  }
})

const statusIndex = ref()
</script>
<template>
  <div
  v-if="route.params.area == 'global'">
  <ClientOnly>
    <v-dialog
    v-model="nameDialog"
    >
      <v-container>
        <v-card>
          <v-card-title>
            {{ pokedex.name.jpn }}
          </v-card-title>
          <v-card-text>
            <v-row
            v-for='(name, key) in pokedex.name'
            :key='name'
            >
              <v-col>
                {{ appConfig.lang_eng2jpn[key] }}
              </v-col>
              <v-col>
                {{ name }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>
  </ClientOnly>

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
      <div style="display: flex; justify-content: space-between;padding: 0px;">
        <div style="flex: 1; display: flex; justify-content: flex-start;">
          <v-btn
            v-if='"name" in prev'
            :to='{path: `/pokedex/${route.params.area}/${prev.no}`}'
            style="background-color: white; width: 120px;"
            variant="outlined"
            >{{ prev.name.jpn }}</v-btn>
        </div>
        <div style="flex: 1; display: flex; justify-content: center;">
          <v-btn
            :to='{path: `/pokedex/${route.params.area}`}'
            style="background-color: white; width: 70px;"
            variant="outlined"
            >TOP</v-btn>
        </div>
        <div style="flex: 1; display: flex; justify-content: flex-end;">
          <v-btn
            v-if='"name" in next'
            :to='{path: `/pokedex/${route.params.area}/${next.no}`}'
            style="background-color: white; width: 120px;"
            variant="outlined"
            >{{ next.name.jpn }}</v-btn>
        </div>
      </div>

          <v-row
          style="margin-top: 10px;"
          >
            <v-col
            cols="7"
            >
              <v-card
              @click="nameDialog = true"
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <h2 class="responsive-text-name">{{ pokedex["status"][0].name.jpn }}</h2>
                </v-card-title>
              </v-card>

              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <div class="responsive-text">全国図鑑番号 No.{{ ('0000' + pokedex.globalNo).slice(-4) }}</div>
                </v-card-title>
              </v-card>

            </v-col>
            <v-col
            cols="5"
            >
              <v-card
              elevation="0"
              variant="outlined"
              style="background-color: white;"
              >
                <v-img
                width="100%"
                height="100%"
                :aspect-ratio="1/1"
                :src="`${src}`"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        <!-- </v-carousel-item>
      </v-carousel> -->
      <v-carousel :show-arrows="false" hide-delimiters v-model="model" height="auto">
        <v-carousel-item
          v-for="(item, index) in pokedex.status" :key="index"
        >
        </v-carousel-item>
      </v-carousel>
      <v-row
      style="margin-top: 20px;"
      >
        <v-col
        cols="12"
        sm="6"
        v-for="item in appConfig.pokedex_list.filter(item => item.title !== '全国図鑑')" :key="item.title"
        >
          <NuxtLink
          :to="{path: `/pokedex${item.path}/${existsPokedex[item.area]}`}"
          class="nuxtlink"
          v-if="existsPokedex[item.area] > -1"
          >
            <v-card
            elevation-0
            variant="outlined"
            style="background-color: white;"
            >
              <v-card-title>{{ item.title }}</v-card-title>
            </v-card>
          </NuxtLink>
          <v-card
          elevation-0
          disabled
          variant="outlined"
          style="background-color: #f2f2f2;"
          v-if="existsPokedex[item.area] <= -1"
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>



  <!-- global以外 -->
  <div
  style="background-color: #f2f2f2;"
  v-else>
  <ClientOnly>
    <v-dialog
    v-model="nameDialog"
    >
      <v-container>
        <v-card>
          <v-card-title>
            {{ pokedex["status"][0].name.jpn }}
          </v-card-title>
          <v-card-text>
            <v-row
            v-for='(name, key) in pokedex["status"][0].name'
            :key='name'
            >
              <v-col>
                {{ appConfig.lang_eng2jpn[key] }}
              </v-col>
              <v-col>
                {{ name }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>
  </ClientOnly>
  <v-container>
  <v-row>
    <v-col
    cols="12"
    md="9"
    >


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
      <div style="display: flex; justify-content: space-between;padding: 0px;">
        <div style="flex: 1; display: flex; justify-content: flex-start;">
          <v-btn
            v-if='prev'
            :to='{path: `/pokedex/${route.params.area}/${prev.no}`}'
            style="background-color: white; width: 120px;"
            variant="outlined"
            >{{ prev.name.jpn }}</v-btn>
        </div>
        <div style="flex: 1; display: flex; justify-content: center;">
          <v-btn
            :to='{path: `/pokedex/${route.params.area}`}'
            style="background-color: white; width: 70px;"
            variant="outlined"
            >TOP</v-btn>
        </div>
        <div style="flex: 1; display: flex; justify-content: flex-end;">
          <v-btn
            v-if='next'
            :to='{path: `/pokedex/${route.params.area}/${next.no}`}'
            style="background-color: white; width: 120px;"
            variant="outlined"
            >{{ next.name.jpn }}</v-btn>
        </div>
      </div>
      <v-carousel
      :show-arrows="false"
      hide-delimiters
      v-model="model"
      height="auto"
      style="margin-top: 20px;"
      >
        <v-carousel-item
          v-for="(item, index) in pokedex.status" :key="index"
        >
          <v-row>
            <!-- <v-col
            lg6
            sm6
            xs6
            > -->
            <v-col
            :cols="7"
            >
              <v-card
              @click="nameDialog = true"
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <h2 class="responsive-text-name">{{ pokedex["status"][index].name.jpn }}</h2>
                </v-card-title>
              </v-card>
              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <div class="responsive-text">分類　　　　　{{ pokedex["status"][index].classification }}</div>
                </v-card-title>
              </v-card>
              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <div class="responsive-text">図鑑番号　　　No.{{ ('0000' + pokedex.no).slice(-4) }}</div>
                </v-card-title>
              </v-card>
              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <NuxtLink class="nuxtlink" :to="{path: `/pokedex/global/${pokedex.globalNo}`}">
                  <div class="responsive-text">全国図鑑番号　No.{{ ('0000' + pokedex.globalNo).slice(-4) }}</div>
                  </NuxtLink>
                </v-card-title>
              </v-card>
              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <div class="responsive-text">たかさ<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5 1.586L22.914 6L21.5 7.414l-2-2v13.172l2-2L22.914 18L18.5 22.414L14.086 18l1.414-1.414l2 2V5.414l-2 2L14.086 6zM2 2h10v20H2zm2 2v16h6V4z"/></svg>　　　{{ pokedex["status"][index].height }} m</div>
                </v-card-title>
              </v-card>
              <v-card
              elevation="0"
              width="100%"
              variant="outlined"
              style="background-color: white;margin-top: 5px;"
              >
                <v-card-title
                width="auto"
                class=""
                >
                  <div class="responsive-text">おもさ<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 46c-45.074 0-82 36.926-82 82c0 25.812 12.123 48.936 30.938 64H128L32 480h448l-96-288h-76.938C325.877 176.936 338 153.812 338 128c0-45.074-36.926-82-82-82m0 36c25.618 0 46 20.382 46 46s-20.382 46-46 46s-46-20.382-46-46s20.382-46 46-46m-82.215 202.95h23.5v33.263l33.873-33.264h27.283l-43.883 43.15l48.4 47.974H233.54l-36.255-35.888v35.888h-23.5zm119.934 21.24c4.76 0 8.952.934 12.573 2.806c3.62 1.872 6.938 4.82 9.95 8.85v-10.13h21.972v61.462c0 10.986-3.48 19.368-10.438 25.146c-6.917 5.82-16.968 8.727-30.152 8.727c-4.272 0-8.4-.325-12.39-.976a77.367 77.367 0 0 1-12.024-2.99v-17.03c3.826 2.198 7.57 3.826 11.23 4.884c3.664 1.098 7.347 1.648 11.05 1.648c7.162 0 12.41-1.566 15.746-4.7c3.337-3.132 5.006-8.035 5.006-14.708v-4.7c-3.01 3.986-6.328 6.916-9.95 8.788c-3.62 1.87-7.813 2.808-12.573 2.808c-8.343 0-15.238-3.275-20.69-9.826c-5.453-6.592-8.18-14.974-8.18-25.146c0-10.214 2.727-18.576 8.18-25.086c5.452-6.55 12.347-9.827 20.69-9.827m8.118 15.746c-4.517 0-8.038 1.67-10.56 5.005c-2.523 3.338-3.784 8.058-3.784 14.162c0 6.266 1.22 11.026 3.662 14.28c2.442 3.215 6.003 4.823 10.682 4.823c4.557 0 8.096-1.67 10.62-5.006c2.522-3.337 3.784-8.036 3.784-14.098c0-6.104-1.262-10.824-3.785-14.16c-2.523-3.337-6.062-5.006-10.62-5.006z"/></svg>　　　{{ pokedex["status"][index].weight }} kg</div>
                </v-card-title>
              </v-card>


            </v-col>
            <!-- <v-col
            lg6
            sm6
            xs6
            > -->
            <v-col
            :cols="5"
            >
              <v-card
              elevation="0"
              style="background-color: white;"
              variant="outlined"
              >
              <!-- <v-img
              :src="`${src}`"
              ></v-img> -->
              <v-img
              width="100%"
              height="100%"
              :aspect-ratio="1/1"
              :src="`${pokedex['status'][index].src}`"
              ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <v-card
      v-if="pokedex.status.length > 1"
      elevation="0"
      style="margin-top: 20px;background-color: white;"
      variant="outlined"
      >
        <v-card-actions>
          <v-btn
          @click="prevModel()"
          >＜</v-btn>
          <v-spacer />
          <h2>{{ pokedex.status[model].form }}</h2>
          <v-spacer />
          <v-btn
          @click="nextModel()"
          >＞</v-btn>
        </v-card-actions>
      </v-card>
      <v-carousel
      :show-arrows="false" 
      hide-delimiters 
      v-model="model" 
      height="auto"
      >
        <v-carousel-item
          v-for="(item, index) in pokedex.status" :key="index" refs="statusIndex"
        >
          <TypeView :pokedex="pokedex.status[index]" :area="route.params.area" />
          <StatusChart :statusData="pokedex.status[index]" />
          <AbilityView :pokedex="pokedex.status[index]" :area="route.params.area" />
          <DescriptionView :description="pokedex.status[index].description" :title="metaTitle" />
          <wazaView :wazaData="pokedex.status[index]" :area="route.params.area" />
          <evolveView :evolveData="pokedex.status[index]" :area="route.params.area" />
          <v-card
          elevation="0"
          style="margin-top: 20px;background-color: white;"
          variant="outlined"
          >
            <v-card-text>
              <adsbygoogle
                :ad-slot="config.public.adSlot"
                :ad-format="'auto'"
                :full-width-responsive="true"
              />
            </v-card-text>
          </v-card>    
        </v-carousel-item>
      </v-carousel>
    </v-container>
    </v-col>
    <v-col
    cols="12"
    md="3"
    v-if="$vuetify.display.lgAndUp"
    >
      <v-card
      elevation="0"
      style="margin-top: 20px;background-color: white;"
      variant="outlined"
      class="menu-card"
      >
        <v-card-text>
          <v-list>
            <NuxtLink
            :to="{hash: `#type`}"
            class="nuxtlink"
            >
              <v-list-item>
                <v-list-item-title>タイプ</v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <NuxtLink
            :to="{hash: `#status`}"
            class="nuxtlink"
            >
              <v-list-item>
                <v-list-item-title>ステータス</v-list-item-title>
              </v-list-item>
            </NuxtLink>

            <div
            v-if="'ability1' in pokedex.status[0]"
            >
              <NuxtLink
              :to="{hash: `#ability`}"
              class="nuxtlink"
              >
                <v-list-item>
                  <v-list-item-title>とくせい</v-list-item-title>
                </v-list-item>
              </NuxtLink>
            </div>
            <NuxtLink
            :to="{hash: `#description`}"
            class="nuxtlink"
            >
              <v-list-item>
                <v-list-item-title>図鑑説明</v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <div
            v-if="'waza' in pokedex.status[0]"
            >
              <NuxtLink
              :to="{hash: `#waza`}"
              class="nuxtlink"
              >
                <v-list-item>
                  <v-list-item-title>覚える技</v-list-item-title>
                </v-list-item>
              </NuxtLink>
            </div>
            <div
            v-if="Array.isArray(pokedex.status[0].evolve)"
            >
              <NuxtLink
              :to="{hash: `#evolve`}"
              class="nuxtlink"
              >
                <v-list-item>
                  <v-list-item-title>進化先</v-list-item-title>
                </v-list-item>
              </NuxtLink>
            </div>
          </v-list>
        </v-card-text>
        <v-card-text>
          <adsbygoogle
            :ad-slot="config.public.adSlot"
            :ad-format="'auto'"
            :full-width-responsive="true"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>

</div>
</template>
<style scoped>
.responsive-text-name {
  font-size: clamp(0.75rem, 2vw, 1.5rem);
}
.responsive-text {
  font-size: clamp(0.75rem, 2vw, 1.3rem);
}
.narrow-list-item {
  height: auto;
  padding: 0px;
  margin: 0px;
}
.narrow-list-item .v-list-item__title {
  padding: 0px;
  margin: 0px;
}
.menu-card {
  position: sticky;
  top: 100px; /* 上からの距離を調整 */  
}
.sticky-ad {
  position: sticky !important;
  top: 20px !important;
  z-index: 1;
}
</style>
