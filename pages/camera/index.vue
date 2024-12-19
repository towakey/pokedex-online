<script setup lang="ts">
// import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

const appConfig = useAppConfig()

onBeforeRouteLeave((to, from, next) => {
  if(webcam != ""){
    webcam.stop()
  }
  next()
})

definePageMeta({
  title: "カメラ"
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("図鑑カメラ")
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

const url = "https://teachablemachine.withgoogle.com/models/m_0GwUGGX/"
let model, webcam = "", labelContainer, maxPredictions
const flag = ref(0)
const learnListFlag = ref(false)
const learnList = ref(<string[]>[])
const labelList = ref<{
  'name': string,
  'probability': number,
  'id': number,
}[]>([])

const facingMode = ref('environment')
const cameraFlag = ref(true)

const breadcrumbs = ref([
  {
    title: 'Home',
    disabled: false,
    to: '/',
  },
  {
    title: '図鑑カメラ',
    disabled: true,
  },
])

const init = (async () => {
  flag.value = 1
  const modelURL = url + "model.json"
  const metadataURL = url + "metadata.json"

  // モデル
  console.log("model loading...")
  model = await tmImage.load(modelURL, metadataURL)

  // クラス数
  console.log("class loading...")
  maxPredictions = model.getTotalClasses()
  learnList.value = model.getClassLabels()

  console.log("camera starting...")

  // const flip = true

  try{
    console.log("environment")
    // リアカメラをデフォルトにする
    webcam = new tmImage.Webcam(300, 300, false)
    await webcam.setup({facingMode: { exact: facingMode.value}})
  }catch(error){
    console.log("user")
    // 失敗したらフロントカメラをデフォルトにする
    facingMode.value = "user"
    webcam = new tmImage.Webcam(300, 300, true)
    await webcam.setup({facingMode: facingMode.value})
    cameraFlag.value = false
  }

  await webcam.play()
  window.requestAnimationFrame(loop)

  document.getElementById("webcam-container")?.appendChild(webcam.canvas)
  labelContainer = document.getElementById("label-container")
  for(let i = 0; i < maxPredictions; i++){
    labelContainer?.appendChild(document.createElement("p"))
  }
  flag.value = 2
})
const loop = async () => {
  webcam.update()
  await predict()
  window.requestAnimationFrame(loop)
}
const predict = async () => {
  const prediction = await model.predict(webcam.canvas)

  labelList.value = []
  for(let i = 0; i < maxPredictions; i++){
    // const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2)
    // labelList.value.push(String(classPrediction))
    // if(prediction[i].probability.toFixed(2) > 0){
      // labelContainer.childNodes[i].innerHTML = classPrediction
      // labelList.value.push(classPrediction)
      // console.log(appConfig.name2id[prediction[i].className.slice(0, 1).toUpperCase()+prediction[i].className.slice(1)])
      
      // console.log(prediction[i].className)
      if(prediction[i].className.slice(0, 1).toUpperCase()+prediction[i].className.slice(1) in appConfig.name2id){
        labelList.value.push({
          'name': appConfig.name2id[prediction[i].className.slice(0, 1).toUpperCase()+prediction[i].className.slice(1)].name, 
          'probability': prediction[i].probability.toFixed(2), 
          'id': Number(appConfig.name2id[prediction[i].className.slice(0, 1).toUpperCase()+prediction[i].className.slice(1)].id)
        })
      }
    // }
  }
  labelList.value = labelList.value.sort((a, b) => a.probability < b.probability ? 1 : -1)
}

const facingChange = async () => {
  // cameraList.value = (await navigator.mediaDevices.enumerateDevices()).filter((value) => {
  //   return value.kind === "videoinput"
  // })
  // console.log(cameraList)
  webcam.stop()
  if(facingMode.value == "user")
  {
    facingMode.value = "environment"
  }else{
    facingMode.value = "user"
  }
  await webcam.setup({facingMode: facingMode.value})
}
</script>
<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="props">
        <v-breadcrumbs-item
          :to="props.item.to"
          :disabled="props.item.disabled"
        >
          {{ props.item.title }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col cols="12">
        <v-card
          class="mb-4"
          variant="outlined"
        >
          <v-card-title class="text-h6">
            図鑑カメラ
          </v-card-title>
          <v-card-text>
            <h3 v-if="flag == 0" class="mb-4">
              カメラを起動し、映した対象がどのポケモンに近いかを表示します。
            </h3>
            <div id="webcam-container" class="mb-4"></div>
            <div v-if="flag == 2">
              <v-list v-if="labelList.length > 0" class="mb-4">
                <v-list-item
                  v-for="(item, index) in labelList.slice(0, 3)"
                  :key="index"
                  :to="{path: `/pokedex/global/${item.id}`}"
                  variant="tonal"
                  class="mb-2"
                >
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="primary"
              @click="init()"
              v-if="flag == 0"
              variant="outlined"
            >
              カメラ起動
            </v-btn>
            <div
              class="mx-auto text-center py-4"
              v-if="flag == 1"
            >
              <p class="mb-2">Loading...</p>
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#webcam-container {
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

#webcam-container canvas {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.v-list-item {
  transition: background-color 0.2s;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>