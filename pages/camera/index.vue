<script setup lang="ts">
import * as tmImage from '@teachablemachine/image'
import * as tf from '@tensorflow/tfjs'

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

let overlayCanvas: HTMLCanvasElement | null = null
let overlayContext: CanvasRenderingContext2D | null = null

const init = (async () => {
  flag.value = 1
  const modelURL = url + "model.json"
  const metadataURL = url + "metadata.json"

  console.log("model loading...")
  model = await tmImage.load(modelURL, metadataURL)

  console.log("class loading...")
  maxPredictions = model.getTotalClasses()
  learnList.value = model.getClassLabels()

  console.log("camera starting...")
  try {
    console.log("environment")
    webcam = new tmImage.Webcam(300, 300, false)
    await webcam.setup({facingMode: { exact: facingMode.value}})
  } catch(error) {
    console.log("user")
    facingMode.value = "user"
    webcam = new tmImage.Webcam(300, 300, true)
    await webcam.setup({facingMode: facingMode.value})
    cameraFlag.value = false
  }

  await webcam.play()
  
  // Create overlay canvas
  const container = document.getElementById("webcam-container")
  if (container) {
    overlayCanvas = document.createElement('canvas')
    overlayCanvas.width = webcam.canvas.width
    overlayCanvas.height = webcam.canvas.height
    overlayCanvas.style.position = 'absolute'
    overlayCanvas.style.left = '0'
    overlayCanvas.style.top = '0'
    overlayCanvas.style.width = '100%'
    overlayCanvas.style.height = '100%'
    overlayContext = overlayCanvas.getContext('2d')
    container.appendChild(overlayCanvas)
  }

  window.requestAnimationFrame(loop)
  document.getElementById("webcam-container")?.appendChild(webcam.canvas)
  
  labelContainer = document.getElementById("label-container")
  for(let i = 0; i < maxPredictions; i++){
    labelContainer?.appendChild(document.createElement("p"))
  }
  flag.value = 2
})

const drawConfidence = (predictions: any[]) => {
  if (!overlayContext || !overlayCanvas || !webcam) return

  // Clear previous drawings
  overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)

  // Calculate scale to maintain aspect ratio
  const scaleX = webcam.canvas.clientWidth / webcam.canvas.width
  const scaleY = webcam.canvas.clientHeight / webcam.canvas.height
  const scale = Math.min(scaleX, scaleY)

  // Reset any previous transforms
  overlayContext.setTransform(1, 0, 0, 1, 0, 0)

  // Scale uniformly
  overlayContext.scale(scale, scale)

  // Get top 3 predictions
  const topPredictions = predictions
    .map((p, i) => ({ ...p, index: i }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3)

  // Draw confidence visualization
  topPredictions.forEach((pred, index) => {
    const confidence = pred.probability * 100
    if (confidence > 20) { // Only show if confidence is above 20%
      overlayContext!.strokeStyle = `rgba(0, 255, 0, ${pred.probability})`
      overlayContext!.lineWidth = 3
      
      // Draw expanding circles
      const centerX = overlayCanvas!.width / 2
      const centerY = overlayCanvas!.height / 2
      const maxRadius = Math.min(overlayCanvas!.width, overlayCanvas!.height) * 0.4
      const radius = maxRadius * (1 - index * 0.2)
      
      overlayContext!.beginPath()
      overlayContext!.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      overlayContext!.stroke()
      
      // Add confidence percentage
      overlayContext!.fillStyle = `rgba(0, 255, 0, ${pred.probability})`
      overlayContext!.font = '16px Arial'
      overlayContext!.textAlign = 'center'
      overlayContext!.fillText(
        `${confidence.toFixed(1)}%`,
        centerX,
        centerY - radius - 5
      )
    }
  })

  // Reset the scale
  overlayContext.setTransform(1, 0, 0, 1, 0, 0)
}

const loop = async () => {
  webcam.update()
  const prediction = await model.predict(webcam.canvas)
  drawConfidence(prediction)
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
  position: relative;
  aspect-ratio: 1;
}

#webcam-container canvas {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: contain;
}

/* Add styles for the overlay canvas */
#webcam-container canvas:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}

.v-list-item {
  transition: background-color 0.2s;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>