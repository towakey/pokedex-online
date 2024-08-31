<script setup lang="ts">
const route = useRoute()
route.meta.title = 'リーフ'

definePageMeta({
  title: 'リーフ'
})

const dialog = ref(false)
const selectedImage = ref(null)

const article = {
  images: [
  {
      src: '/leaf/1.png'
    },
    {
      src: '/leaf/2.png'
    },
    {
      src: '/leaf/3.png'
    },
    {
      src: '/leaf/4.png'
    }
  ]
}

const openImage = (image) => {
  selectedImage.value = image
  dialog.value = true
}

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: route.meta.title,
  href: '/leaf',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("リーフ")
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
    <v-card
    elevation-0
    variant="outlined"
    style="background-color: white;"
    >
      <v-card-title>
        リーフ(仮)
      </v-card-title>
      <v-card-text>
        <p>オリキャラを考えています。</p>
        <p>しっくりくる名前が未だに思いつかないので（仮）をつけています。</p>
        <p>背中には野生のポケモンにひっかかれた傷跡が残る。</p>
        <p>出身地：マサラタウン</p>
        <hr>
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="(image, index) in article.images" :key="index">
            <v-img
              :src="image.src"
              :alt="image.alt"
              @click="openImage(image)"
              class="clickable-image ma-2"
              width="200"
              height="200"
              cover
            ></v-img>
          </v-slide-group-item>
        </v-slide-group>
        <p>手持ち：ヒトカゲ(色違い)</p>
        <p>色違いゆえに目立ちやすく他の野生のポケモンに襲われていたところをリーフに助けられる。</p>
        <p>しかしその際にリーフが野生のポケモンの攻撃で怪我を負い動けなくなったところを渾身のひのこで追い払い、</p>
        <p>その火を見たジュンサ―さんにともに保護される。</p>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card v-if="selectedImage">
        <v-img :src="selectedImage.src" :alt="selectedImage.alt"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-container>
</template>
<style scoped>
.clickable-image {
  cursor: pointer;
  transition: opacity 0.3s;
}

.clickable-image:hover {
  opacity: 0.8;
}
</style>
