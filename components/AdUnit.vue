<template>
  <div class="ad-container">
    <ins
      class="adsbygoogle"
      style="display:block"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const props = defineProps({
  adSlot: {
    type: String,
    required: true
  }
})

const adClient = computed(() => config.public.googleAdsenseId)
const adInitialized = ref(false)

onMounted(() => {
  // コンポーネントがマウントされた時に一度だけ初期化
  if (!adInitialized.value) {
    nextTick(() => {
      try {
        // 広告スロットが既に初期化されているかチェック
        const adContainer = document.querySelector(`[data-ad-slot="${props.adSlot}"]`)
        if (adContainer && !adContainer.hasAttribute('data-ad-status')) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          adInitialized.value = true
        }
      } catch (error) {
        console.error('AdSense initialization error:', error)
      }
    })
  }
})

// コンポーネントのクリーンアップ
onUnmounted(() => {
  adInitialized.value = false
})
</script>

<style scoped>
.ad-container {
  padding: 20px 0;
  text-align: center;
  overflow: hidden;
  min-width: 300px; /* 最小幅を設定 */
  width: 100%;
}
</style>
