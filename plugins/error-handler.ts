export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // 開発環境での詳細なエラーログ
    if (process.dev) {
      console.group('Vue Error Handler')
      console.error('Error:', error)
      console.error('Component:', instance)
      console.error('Info:', info)
      console.groupEnd()
    } else {
      // 本番環境では最小限のエラー情報のみを表示
      console.error('アプリケーションエラー:', error)
      
      // ここに本番環境用のエラートラッキングサービスの呼び出しを追加できます
      // 例: Sentry, LogRocket など
    }

    // エラーの種類に応じて適切なエラーページを表示
    if (error instanceof Error) {
      const statusCode = (error as any).statusCode || 500
      const message = process.dev ? error.message : 'エラーが発生しました'
      
      showError({ statusCode, message })
    }
  }

  // グローバルなエラーハンドリング
  nuxtApp.hook('vue:error', (error) => {
    console.error('Nuxt Error:', error)
  })

  // APIエラーハンドリング
  nuxtApp.hook('app:error', (error) => {
    console.error('App Error:', error)
  })
})
