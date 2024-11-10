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
  ],
  huramu: [
    {
      src: '/leaf/huramu1.png'
    }
  ]
}

const episodes = [
{
    title: "アイドルの隠れ家にて その1",
    url: "/leaf/episode/episode1"
  },
  {
    title: "アイドルの隠れ家にて その2",
    url: "/leaf/episode/episode2"
  },
  {
    title: "底力",
    url: "/leaf/episode/episode3"
  },
  {
    title: "お守り",
    url: "/leaf/episode/episode4"
  }
]

// const temoti = {
//   huramu: [
//   {
//       src: '/leaf/huramu1.png'
//     }
//   ]
// }

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
        リーフ(仮)※
      </v-card-title>
      <v-card-subtitle>
        <p>オリキャラを考えています。</p>
        <p>※しっくりくる名前が未だに思いつかないので（仮）をつけています。</p>
      </v-card-subtitle>
      <v-card-text>
        <p></p>
        <p>マサラタウン出身。</p>
        <p>背中には野生のポケモンにひっかかれた傷跡が残る。</p>
        <p>メガストーンは鍵の持ち手に埋め込み、ネックレスとして首から下げている。</p>
        <p></p>
        <p></p>
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
        <v-card
        elevation-0
        variant="outlined"
        style="background-color: white;"
        >
          <v-card-title>フラム / リザードン(色違い)</v-card-title>
          <v-card-text>
            <p>色違いゆえに目立ちやすく他の野生のポケモンに襲われていたところをリーフに助けられる。</p>
            <p>しかしその際にリーフが野生のポケモンの攻撃で怪我を負い動けなくなったところを渾身のひのこで追い払い、</p>
            <p>その火を見たジュンサ―さんにともに保護される。</p>
            <v-slide-group show-arrows>
              <v-slide-group-item v-for="(image, index) in article.huramu" :key="index">
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
          </v-card-text>
        </v-card>
        <div
        v-for="episode in episodes"
        :key="episode.title"
        >
          <NuxtLink
          :to="{path: `${episode.url}`}"
          class="nuxtlink"
          >
            <v-card
            elevation-0
            variant="outlined"
            style="background-color: white;"
            >
              <v-card-text>{{ episode.title }}</v-card-text>
            </v-card>
          </NuxtLink>
        </div>
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
