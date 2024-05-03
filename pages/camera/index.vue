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
    <v-card
    variant="text"
    >
      <v-card-title>
        <!-- <v-btn
        block
        @click="init()"
        v-if="flag == 0"
        variant="outlined"
        >カメラ起動</v-btn>
        <div
        class="mx-auto text-center"
        v-if="flag == 1"
        >
          <p>Loading...</p>
          <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          ></v-progress-circular>
        </div> -->
      </v-card-title>
      <v-card-text>
        <h3
        v-if="flag == 0"
        >カメラを起動し、映した対象がどのポケモンに近いかを表示します。</h3>
        <div id="webcam-container"></div>
        <div
        v-if="flag == 2"
        >
          <!-- <v-btn
          block
          @click="facingChange()"
          >カメラ切り替え</v-btn> -->
          <!-- <div id="label-container"></div> -->
          <!-- <v-list
          :items="labelList"
          item-title="name"
          ></v-list> -->
          <v-list
          v-if="labelList.length > 0"
          >
            <!-- <v-list-item v-for="item in labelList.slice(0, 3)" :key="item.name">
              <v-list-item-title>
                <NuxtLink
                :to="{path: `/pokedex/global/${item.id}`}"
                class="link-decoration"
                >
                  {{ item.name }}
                </NuxtLink>
              </v-list-item-title>
            </v-list-item> -->
            <v-list-item
            variant="tonal"
            >
              <NuxtLink
              :to="{path: `/pokedex/global/${labelList[0].id}`}"
              class="link-decoration"
              >
                <v-list-item-title>
                    {{ labelList[0].name }}
                </v-list-item-title>
              </NuxtLink>
            </v-list-item>
            <v-list-item
            variant="tonal"
            >
              <NuxtLink
              :to="{path: `/pokedex/global/${labelList[1].id}`}"
              class="link-decoration"
              >
                <v-list-item-title>
                    {{ labelList[1].name }}
                </v-list-item-title>
              </NuxtLink>
            </v-list-item>
            <v-list-item
            variant="tonal"
            >
              <NuxtLink
              :to="{path: `/pokedex/global/${labelList[2].id}`}"
              class="link-decoration"
              >
                <v-list-item-title>
                    {{ labelList[2].name }}
                </v-list-item-title>
              </NuxtLink>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn
        v-if="cameraFlag"
        @click="facingChange()"
        block
        >
        切り替え
        </v-btn> -->
        <v-btn
        block
        @click="init()"
        v-if="flag == 0"
        variant="outlined"
        >カメラ起動</v-btn>
        <div
        class="mx-auto text-center"
        v-if="flag == 1"
        >
          <p>Loading...</p>
          <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          ></v-progress-circular>
        </div>

      </v-card-actions>
    </v-card>
    <v-card
    variant="text"
    v-if="flag == 2"
    >
      <v-card-title>
        <v-btn
        block
        variant="text"
        @click="learnListFlag = !learnListFlag"
        >対応しているポケモン</v-btn>
      </v-card-title>
      <v-expand-transition>
        <v-list v-if="learnListFlag">
          <v-list-item
          v-for="learn in learnList"
          :key = "learn"
          >
            <v-list-item-title>
              {{ appConfig.name2id[learn.slice(0, 1).toUpperCase()+learn.slice(1)].name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<style scoped>
#webcam-container {
  display: grid;
  place-items: center;
}

#webcam-container canvas {
  display: block;
}

</style>