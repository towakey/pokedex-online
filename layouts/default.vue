<script setup lang="ts">
const appConfig = useAppConfig()
const title = ref('')
const pageTitle = ref()
const drawer = ref(false)
const route = useRoute()
const config = useRuntimeConfig()
pageTitle.value = route.meta.title

// 読み込み状態を追跡するための ref
const isLoading = ref(false)

// Nuxt アプリケーションインスタンスを取得
const nuxtApp = useNuxtApp()

// const menu = [
// {
//     title: 'HOME',
//     path: ''
//   },
//   {
//     title: 'ポケモン図鑑',
//     path: 'pokedex'
//   },
//   {
//     title: 'ブログ',
//     path: 'blog'
//   },
//   {
//     title: '図鑑カメラ',
//     path: 'camera'
//   },
//   {
//     title: 'pokedex.jsonについて',
//     path: 'pokedexjson'
//   }
// ]

// フッターのリンク項目を定義
const footerLinks = [
  // { title: 'プライバシーポリシー', path: '/privacy' },
  // { title: '利用規約', path: '/terms' },
  // { title: 'お問い合わせ', path: '/contact' },
  { title: 'version', path: '/version' },
  ]

const metaTitle = ref()
// メタデータ更新関数
const updateMetadata = (newTitle: string) => {
  metaTitle.value = newTitle
}

// provide を使用して子コンポーネントに関数を提供
provide('updateMetadata', updateMetadata)

const onTitleChanged = (newTitle: string) => {
  pageTitle.value = newTitle
  title.value = newTitle
}

watchEffect(() => {
  route.meta.title && onTitleChanged(route.meta.title as string)
})


const shareOptions = [
  { title: 'Twitter', icon: 'mdi-twitter', network: 'twitter' },
  { title: 'Mastodon', icon: 'mdi-mastodon', network: 'mastodon' },
  // 他のSNSオプションを追加できます
];

const shareOn = (network: any) => {
  const urlObject = new URL(`${config.public.siteUrl}${route.fullPath}`)
  // const currentUrl = `${config.public.siteUrl}${route.fullPath.slice(0, -1)}#${key}`
  // urlObject.hash = ''
  const currentUrl = `${urlObject.toString()}`
  const text = encodeURIComponent(`${metaTitle.value}\n`);
  const url = encodeURIComponent(currentUrl);
  
  let shareUrl;
  switch (network) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'mastodon':
      // マストドンの場合、ユーザーにインスタンスURLを入力してもらう必要があります
      const instance = prompt('マストドンのインスタンスURLを入力してください');
      if (instance) {
        shareUrl = `${instance}/share?text=${text} ${url}`;
      }
      break;
    // 他のSNSの場合分けをここに追加
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=550,height=420');
  }
};

// ページ遷移時のフックを設定
onMounted(() => {
  nuxtApp.hook('page:start', () => {
    // console.log('Page loading started')
    isLoading.value = true
  })
  nuxtApp.hook('page:finish', () => {
    // console.log('Page loading finished')
    isLoading.value = false
  })
})

</script>
<template>
  <v-layout>
    <v-app-bar
    color="primary"
    prominent
    >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      class="btn-fix"
      >
        <!-- <v-img src="/public/icon.png"></v-img> -->
        <!-- <v-img src="/public/icon.png" alt="icon" max-width="40"></v-img> -->
        <!-- <v-icon> -->
          <img src="/public/icon.png"
          alt="Nav icon"
          :width="50"
          :height="50"
          contain
          />
        <!-- </v-icon> -->
        <!-- <v-icon>mdi-menu</v-icon> -->
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <NuxtLink
        :to="{path: `/`}"
        class="nuxtlink"
        style="color: white;"
        >
        {{ pageTitle }}
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer />

      <!-- ローディングインジケーターを追加 -->
      <!-- <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="white"
        size="24"
        class="mr-4"
      >Loading</v-progress-circular> -->
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="white"
        size="24"
        class="mr-4"
      ></v-progress-circular>

      <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
            variant="plain"
            icon="mdi-share-variant"
            size="small"
            class="share-btn"
            v-bind="props"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in shareOptions"
              :key="index"
              @click="shareOn(item.network)"
            >
              <v-list-item-title>
                <v-icon :icon="item.icon" size="small" class="mr-2" />
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>      
    </v-app-bar>

    <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    >
      <NuxtLink
      v-for="item in appConfig.main_menu" :key="item.title"
      :to="{path: `${item.path}`}"
      class="nuxtlink"
      >
        <v-list nav>
          <v-list-item
          prepenf-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>
      </NuxtLink>
    </v-navigation-drawer>
    <v-main
    style="height: 100%;background-color: #f2f2f2;"
    >
      <slot></slot>
    </v-main>
    <v-footer
      app
      color="primary"
      class="px-4 py-3"
    >
      <v-row no-gutters justify="space-between" align="center">
        <v-col cols="12" sm="auto" class="text-center text-sm-left mb-2 mb-sm-0">
          <span class="text-body-2 text-white">&copy; {{ new Date().getFullYear() }} Pokedex-Online</span>
        </v-col>
        <v-col cols="12" sm="auto">
          <v-row justify="center" justify-sm="end">
            <v-col v-for="link in footerLinks" :key="link.title" cols="auto">
              <NuxtLink :to="link.path" class="text-white text-decoration-none text-body-2">
                {{ link.title }}
              </NuxtLink>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
  </v-layout>
</template>
<style scoped>
/* フッターのスタイルを追加 */
.v-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.v-app-bar-nav-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* ローディングインジケーターのスタイル調整（必要に応じて） */
.v-progress-circular {
  transition: opacity 0.3s ease;
}
</style>