<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/types'

definePageMeta({
  title: "cheatsheet"
})
// const query: QueryBuilderParams = { path: '/blog' }


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

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("cheatsheet")
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

// カテゴリーフィルタリング用の状態
const selectedCategories = ref<Set<string>>(new Set())
const allCategories = ref<string[]>([])

// カテゴリーの切り替え
const toggleCategory = (category: string) => {
  if (selectedCategories.value.has(category)) {
    selectedCategories.value.delete(category)
  } else {
    selectedCategories.value.add(category)
  }
  // Set の変更を検知させるため、新しい Set オブジェクトを代入
  selectedCategories.value = new Set(selectedCategories.value)
}

// フィルタリングされた記事リスト
const filteredArticles = computed(() => {
  return (list: any[]) => {
    if (selectedCategories.value.size === 0) return list
    return list.filter(article => selectedCategories.value.has(article.category))
  }
})

// すべてのカテゴリーを取得
const fetchAllCategories = (list: any[]) => {
  const categories = new Set(list.map(article => article.category))
  allCategories.value = Array.from(categories)
}

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

    <!-- カテゴリーフィルター -->
    <v-chip-group multiple>
      <v-chip
        v-for="category in allCategories"
        :key="category"
        :value="category"
        :selected="selectedCategories.has(category)"
        @click="toggleCategory(category)"
        color="primary"
        :class="{ 'on-primary-variant': selectedCategories.has(category) }"
      >
        {{ category }}
      </v-chip>
    </v-chip-group>

    <!-- デバッグ用：選択されているカテゴリーを表示 -->
    <div>選択されているカテゴリー: {{ Array.from(selectedCategories).join(', ') }}</div>

    <ContentList
      v-slot="{ list }"
      :query="{
        path: '/cheatsheet',
        only: ['title', 'description', 'category', '_path', '_file', 'date']
      }"
    >
      <template v-if="list.length > 0">
        {{ fetchAllCategories(list) }}
        <v-row>
          <v-col
            v-for="article in filteredArticles(list)"
            :key="article._path"
            cols="12"
            sm="6"
          >
            <NuxtLink :to="{ path: article._path }" class="nuxtlink">
              <v-card
                :title="article.title"
                :text="article.category"
                elevation="0"
                style="background-color: white;"
                height="100"
                variant="outlined"
              />
            </NuxtLink>
          </v-col>
        </v-row>
      </template>
    </ContentList>
  </v-container>
</template>
<style scoped>
/* .nuxtlink {
  text-decoration: none;
  color: inherit;
} */

.v-chip.on-primary-variant {
  color: blue !important;
}
</style>