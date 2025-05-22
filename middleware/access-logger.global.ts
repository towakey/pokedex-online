export default defineNuxtRouteMiddleware(async (to, from) => {
  // クライアントサイドでのみ実行 (サーバーサイドレンダリング時は不要)
  if (process.server) {
    return;
  }

  // PHPスクリプトのURL
  const logApiUrl = '/php_api/log_access.php'; // デプロイ環境に応じて調整

  const payload: { pagePath: string; pokemonId?: string; area?: string } = {
    pagePath: to.fullPath,
  };

  // ポケモン詳細ページの判定 (例: /pokedex/kanto/1)
  // ルート名はプロジェクトのルーティング設定によって変わる可能性があります。
  // Nuxt DevToolsなどで確認してください。一般的には 'pokedex-area-id' のような形式です。
  // Nuxtのルート名は通常、ファイルパスに基づいて生成されます。
  // pages/pokedex/[area]/[id].vue は 'pokedex-area-id' になることが多いです。
  if (to.name === 'pokedex-area-id' && to.params.id && to.params.area) {
    payload.pokemonId = Array.isArray(to.params.id) ? to.params.id[0] : String(to.params.id);
    payload.area = Array.isArray(to.params.area) ? to.params.area[0] : String(to.params.area);
  }

  try {
    await $fetch(logApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (process.dev) { // 開発モード時のみコンソールに出力
        console.log(`[Analytics] Logged access for page: ${payload.pagePath}`, payload.pokemonId ? `(Pokemon ID: ${payload.pokemonId}, Area: ${payload.area})` : '');
    }
  } catch (error) {
    console.error('[Analytics] Error logging page access:', error, 'Payload:', payload);
  }
});
