<script setup lang="ts">
// import { ref } from 'vue'

const route = useRoute()
route.meta.title = 'ギャラリー'

definePageMeta({
  title: 'ギャラリー'
})

const pic = ref([
  '/gallery/gallery-1.jpg',
  '/gallery/gallery-2.jpg',
  '/gallery/gallery-3.jpg',
  '/gallery/gallery-4.jpg',
  '/gallery/gallery-5.jpg',
  '/gallery/gallery-6.jpg',
  '/gallery/gallery-7.jpg',
  '/gallery/gallery-8.jpg',
  '/gallery/gallery-9.jpg',
  '/gallery/gallery-10.jpg',
  '/gallery/gallery-11.jpg',
  '/gallery/gallery-12.jpg',
  '/gallery/gallery-13.jpg',
  '/gallery/gallery-14.jpg',
  '/gallery/gallery-15.jpg',
  '/gallery/gallery-16.jpg',
  '/gallery/gallery-17.jpg',
  '/gallery/gallery-18.jpg',
  '/gallery/gallery-19.jpg',
  '/gallery/gallery-20.jpg',
  '/gallery/gallery-21.jpg',
  '/gallery/gallery-22.jpg',
  '/gallery/gallery-23.jpg',
  '/gallery/gallery-24.jpg',
  '/gallery/gallery-25.jpg',
  '/gallery/gallery-26.jpg',
  '/gallery/gallery-27.jpg',
  '/gallery/gallery-28.jpg',
  '/gallery/gallery-29.jpg',
  '/gallery/gallery-30.jpg',
  '/gallery/gallery-31.jpg',
  '/gallery/gallery-32.jpg',
  '/gallery/gallery-33.jpg',
  '/gallery/gallery-34.jpg',
  '/gallery/gallery-35.jpg',
  '/gallery/gallery-36.jpg',
  '/gallery/gallery-37.jpg',
  '/gallery/gallery-38.jpg',
  '/gallery/gallery-39.jpg',
  '/gallery/gallery-40.jpg',
  '/gallery/gallery-41.jpg',
  '/gallery/gallery-42.jpg',
  '/gallery/gallery-43.jpg',
  '/gallery/gallery-44.jpg',
  '/gallery/gallery-45.jpg',
  '/gallery/gallery-46.jpg',
  '/gallery/gallery-47.jpg',
  '/gallery/gallery-48.jpg',
  '/gallery/gallery-49.jpg',
  '/gallery/gallery-50.jpg',
  '/gallery/gallery-51.jpg',
  '/gallery/gallery-52.jpg',
  '/gallery/gallery-53.jpg',
  '/gallery/gallery-54.jpg',
  '/gallery/gallery-55.jpg',
  '/gallery/gallery-56.jpg',
  '/gallery/gallery-57.jpg',
  '/gallery/gallery-58.jpg',
  '/gallery/gallery-59.jpg',
  '/gallery/gallery-60.jpg',
  '/gallery/gallery-61.jpg',
  '/gallery/gallery-62.jpg',
])

const dialog = ref(false)
const selectedImage = ref('')

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
  href: '/gallery',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("ギャラリー")
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

    <v-row>
      <v-col v-for="(image, index) in pic" :key="index" cols="12" sm="4">
        <v-img
          :src="image"
          aspect-ratio="1"
          cover
          class="image-thumbnail"
          @click="openImage(image)"
        ></v-img>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="90vw" max-height="90vh">
      <v-card class="pa-0 image-card">
        <v-img
          :src="selectedImage"
          max-height="90vh"
          contain
          class="enlarged-image"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-btn icon @click="dialog = false" class="close-btn">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.image-thumbnail {
  cursor: pointer;
  transition: transform 0.3s;
}

.image-thumbnail:hover {
  transform: scale(1.05);
}

.image-card {
  position: relative;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.enlarged-image {
  width: 100%;
  height: 100%;
}

:deep(.v-dialog) {
  overflow: hidden;
}
</style>
