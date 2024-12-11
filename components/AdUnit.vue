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

onMounted(() => {
  // DOMが完全に描画された後に広告を初期化
  nextTick(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  })
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
