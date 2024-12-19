<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

definePageMeta({
  title: "cheatsheet"
})

const { data: article } = useAsyncData('cheatsheet', () => 
  queryContent(useRoute().path).findOne()
)

const copyCode = (button: HTMLButtonElement, code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      button.textContent = 'Copied!'
      button.classList.add('copied')
      setTimeout(() => {
        button.textContent = 'Copy'
        button.classList.remove('copied')
      }, 2000) // 2秒後に元に戻す
    })
    .catch(err => {
      console.error('Failed to copy code: ', err)
      button.textContent = 'Error'
      setTimeout(() => {
        button.textContent = 'Copy'
      }, 2000)
    })
}

onMounted(() => {
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach((block) => {
    const copyButton = document.createElement('button')
    copyButton.textContent = 'Copy'
    copyButton.className = 'copy-button'
    copyButton.addEventListener('click', () => copyCode(copyButton, block.textContent || ''))
    block.parentNode?.insertBefore(copyButton, block)
  })
})

// すべての記事を取得し、ソートする
const { data: allArticles } = await useAsyncData('allArticles', () => 
  queryContent('/cheatsheet')
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

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref(article.value?.title)
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
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'チートシート',
  href: '/cheatsheet',
  disabled: true
})

</script>
<template>
  <!-- <div class="full-height"> -->
    <!-- <v-container class="full-height-container pa-0"> -->
    <v-container class="">
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
        <v-col
        cols="12"
        md="9"
        >
          <div style="display: flex; justify-content: space-between;padding: 0px;">
            <div style="flex: 1; display: flex; justify-content: flex-start;">
              <v-btn
                v-if='prevArticle'
                :to='{path: `${prevArticle._path}`}'
                style="background-color: white; width: 120px;"
                variant="outlined"
                ><<<</v-btn>
            </div>
            <div style="flex: 1; display: flex; justify-content: center;">
              <v-btn
                :to='{path: `/cheatsheet`}'
                style="background-color: white; width: 70px;"
                variant="outlined"
                >TOP</v-btn>
            </div>
            <div style="flex: 1; display: flex; justify-content: flex-end;">
              <v-btn
                v-if='nextArticle'
                :to='{path: `${nextArticle._path}`}'
                style="background-color: white; width: 120px;"
                variant="outlined"
                >>>></v-btn>
            </div>
          </div>

          <ContentDoc v-if="article">
            <template #default="{ doc }">
              <v-card
              elevation="0"
              style="margin-top: 20px;background-color: white;"
              variant="outlined"
              >
                <v-card-title>
                  {{ article.title }}
                </v-card-title>
                <v-card-text>
                  <ContentRenderer :value="doc" />
                </v-card-text>
              </v-card>
            </template>
          </ContentDoc>
          <!-- 記事下の広告 -->
          <v-card
          elevation="0"
          style="margin-top: 20px; margin-bottom: 20px; background-color: white;"
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
            <v-card-title>
              記事一覧
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="article in allArticles"
                  :key="article._path"
                  :to="article._path"
                  :active="article._path === route.path"
                >
                  <v-list-item-title>{{ article.title }}</v-list-item-title>
                </v-list-item>
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
  <!-- </div> -->
</template>

<style scoped>
.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.full-height-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.fill-height {
  min-height: 100%;
}

.navigation-links {
  margin-bottom: 8px;
}

.copy-button {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 10px;
  background-color: #b81111;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.copy-button.copied {
  background-color: #4CAF50;
  color: white;
}

.menu-card {
  position: sticky;
  top: 100px;
}

.copy-button {
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  padding: 0.5em 1em;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

.copy-button:hover {
  background-color: #e0e0e0;
}

.copy-button.copied {
  background-color: #4CAF50;
  color: white;
}

pre {
  position: relative;
  padding: 2em 1em 1em;
}

/* ダークテーマのコードブロックスタイル */
:deep(.prose pre) {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

:deep(.prose pre code) {
  background-color: transparent;
  color: inherit;
  padding: 0;
  font-size: 0.875em;
}

/* コピーボタンのスタイル */
.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #2d2d2d;
  color: #d4d4d4;
  border: 1px solid #404040;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.copy-button:hover {
  background-color: #404040;
}

.copy-button.copied {
  background-color: #4caf50;
  color: white;
}
</style>