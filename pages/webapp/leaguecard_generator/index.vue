<script setup lang="ts">
definePageMeta({
  title: "リーグカードジェネレーター"
})

// ユーザーネーム
// フレコ(Switch)
// フレコ(PokemonGO)
// 手持ち6匹
// アイコン


// import ImageCropper from './ImageCropper.vue'

const player_number = ref('001')
const username = ref('')
// const passcode = ref('')
const contents = ref('')
// const iconImage = ref(null)
const color1 = ref('#f00')
const color2 = ref('#ff0')
const f_color = ref('#000')

const canvas = ref(null)
const imageUrl = ref('')
const showCropper = ref(false)
const croppedImageUrl = ref('')

const isFormValid = computed(() => {
  // return username.value && switchCode.value && pokemonGoCode.value
  return true
})

// const onFileChange = (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     imageUrl.value = URL.createObjectURL(file)
//     showCropper.value = true
//   }
// }

// 今日の日付を YYYY-MM-DD 形式で取得する関数
const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 今日の日付を初期値として設定
const now_date = ref(getTodayDate())

const onCropped = (url) => {
  croppedImageUrl.value = url
  updateCanvas()
}

const updateCanvas = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  canvas.value.width = 595 // A4サイズ (72dpi)
  canvas.value.height = 842

  // 背景を描画
  ctx.fillStyle = color1.value
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 斜線
  ctx.fillStyle = color2.value
  ctx.rotate(20 * Math.PI / 180)
  ctx.fillRect(210, -300, 500, Number(canvas.value.height) * 2)

  // 斜線を戻す
  ctx.rotate(-20 * Math.PI / 180)

  // 左端の黒線
  ctx.fillStyle = 'rgba(77, 77, 77)'
  ctx.fillRect(0, 0, 100, Number(canvas.value.height) * 2)

  // 日付を描画
  ctx.fillStyle = f_color.value
  ctx.font = '20pt Arial'
  ctx.fillText(`${now_date.value}`, 150, 70)

  // 背番号を描画
  ctx.fillStyle = f_color.value
  ctx.font = '120px Arial'
  ctx.fillText(`${player_number.value}`, 20, canvas.value.height - 50)

  // ユーザーネームを描画
  ctx.fillStyle = f_color.value
  ctx.font = '50pt Arial'
  ctx.fillText(`${username.value}`, 300, canvas.value.height - 50)

  // 自己紹介を描画
  ctx.fillStyle = f_color.value
  ctx.font = '20pt Arial'

  var textlist = contents.value.split('\n')
  var x = 150
  var y = 200
  ctx.font = '20pt Arial'
  ctx.fillStyle = f_color.value
  var lineHeight = ctx.measureText("あ").width + 15
  for(var i=0; i < textlist.length; i++){
    ctx.fillText(textlist[i], x, y + lineHeight * i)
  }

  ctx.font = '10pt Arial'
  ctx.fillStyle = f_color.value
  ctx.fillText("Created by https://pokedex-online.jp/webapp/leaguecard_generator", 20, canvas.value.height - 10)


  // // アイコン画像を描画
  // if (croppedImageUrl.value) {
  //   const img = new Image()
  //   img.onload = () => {
  //     ctx.drawImage(img, 50, 250, 200, 200)
  //   }
  //   img.src = croppedImageUrl.value
  // }
}
const exportImage = () => {
  if (!canvas.value) return

  const link = document.createElement('a')
  link.download = 'leaguecard.png'
  link.href = canvas.value.toDataURL()
  link.click()
}

// 入力値の変更を監視し、canvasをリアルタイムで更新
watch([player_number, username, contents, color1, color2, f_color], () => {
  updateCanvas()
})

onMounted(() => {
  updateCanvas()
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
  title: 'リーグカードジェネレーター',
  href: '/webapp/leaguecard_generator',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("リーグカードジェネレーター")
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
  <v-container fluid>
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
      <v-col cols="12" md="6">
        <v-form @submit.prevent>
          <div>
            <DatePicker v-model="now_date" />
            <!-- <p>選択された日付: {{ now_date }}</p> -->
          </div>
          <v-text-field
            v-model="player_number"
            label="背番号"
            required
          ></v-text-field>
          <v-text-field
            v-model="username"
            label="ユーザーネーム"
            required
          ></v-text-field>
          <v-textarea
          v-model="contents"
          label="自己紹介文"
          ></v-textarea>
          <!-- <div>
            <ColorPickerWithTextField v-model="color1" />
          </div> -->
          <label for="color1">色1を選択:</label>
          <v-color-picker
          v-model="color1"
          dot-size="25"
          swatches-max-height="100"
          hide-inputs
          />
          <label for="color2">色2を選択:</label>
          <v-color-picker
          v-model="color2"
          dot-size="25"
          swatches-max-height="100"
          hide-inputs
          />
          <label for="f_color">文字色を選択:</label>
          <v-color-picker
          v-model="f_color"
          dot-size="25"
          swatches-max-height="100"
          hide-inputs
          />

        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <canvas ref="canvas" style="width: 100%; height: auto;"></canvas>
        <v-btn
          color="secondary"
          class="mt-4"
          @click="exportImage"
          :disabled="!isFormValid"
        >
          アウトポート
        </v-btn>
      </v-col>
    </v-row>
    <image-cropper
      v-model:show="showCropper"
      :image-url="imageUrl"
      @cropped="onCropped"
    ></image-cropper>
  </v-container>
</template>