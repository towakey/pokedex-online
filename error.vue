<template>
  <div class="error-page">
    <div class="error-content">
      <h1 v-if="error.statusCode === 404">
        ページが見つかりません
      </h1>
      <h1 v-else>
        エラーが発生しました
      </h1>
      <div class="error-details">
        <p>{{ error.message }}</p>
      </div>
      <button class="retry-button" @click="handleError">
        ホームに戻る
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const handleError = () => {
  // エラーをクリアしてホームページにリダイレクト
  clearError()
  navigateTo('/')
}
</script>

<style scoped lang="scss">
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;

  .error-content {
    max-width: 600px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 2rem;
    }

    .error-details {
      margin: 20px 0;
      color: #666;
    }

    .retry-button {
      padding: 12px 24px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #2980b9;
      }
    }
  }
}
</style>
