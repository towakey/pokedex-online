<script setup lang="ts">
const route = useRoute()

route.meta.title = 'リーフ -Episode-'
definePageMeta({
  title: 'リーフ -Episode-'
})

const { data: article } = useAsyncData('/leaf/episode', () => 
  queryContent(useRoute().path).findOne()
)
// すべての記事を取得し、ソートする
const { data: allArticles } = await useAsyncData('allArticles', () => 
  queryContent('/leaf/episode')
    .sort({ date: -1 }) // 日付の降順でソート
    .find()
)

// 現在の記事のインデックスを見つける
const currentIndex = computed(() => 
  allArticles.value?.findIndex(a => a._path === route.path) ?? -1
)

// 前の記事と次の記事を取得
const prevArticle = computed(() => 
  currentIndex.value > 0 ? allArticles.value?.[currentIndex.value - 1] : null
)
const nextArticle = computed(() => 
  currentIndex.value < (allArticles.value?.length ?? 0) - 1 
    ? allArticles.value?.[currentIndex.value + 1] 
    : null
)

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'リーフ',
  href: '/leaf',
  disabled: false
})
breadcrumbs.push({
  title: route.meta.title,
  href: '/leaf',
  disabled: true
})


const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("リーフ -Episode-")
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
  <div class="full-height">
    <v-container class="full-height-container pa-0">
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

      <v-row class="fill-height ma-0">
        <v-col cols="12" class="pa-4" style="background-color: white;">
          <ContentDoc v-if="article">
            <template #default="{ doc }">
              <!-- 前後のリンクボタン -->
              <v-row>
                <v-col v-if="prevArticle">
                  <v-btn
                    :to="prevArticle._path"
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    <v-icon start icon="mdi-chevron-left"></v-icon>
                    前のエピソード
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col v-if="nextArticle" class="text-right">
                  <v-btn
                    :to="nextArticle._path"
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    次のエピソード
                    <v-icon end icon="mdi-chevron-right"></v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <h1>{{ doc.title }}</h1>
              <ContentRenderer :value="doc" />
            </template>
            <template #empty>
              <h1>Document not found</h1>
            </template>
          </ContentDoc>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>