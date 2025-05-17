<script setup>
import { ref, onMounted } from 'vue';
import { createDbWorker } from 'sql.js-httpvfs';

definePageMeta({ ssr: false });

const query = ref('SELECT * FROM pokedex LIMIT 10');
const dbData = ref(null);
const loading = ref(false);
const error = ref(null);
let dbWorker;

async function executeQuery() {
  loading.value = true;
  error.value = null;
  try {
    const res = await dbWorker.db.query(query.value);
    dbData.value = res;
  } catch (e) {
    error.value = e.message || e.toString();
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  loading.value = true;
  error.value = null;
  const base = window.location.origin;
  const workerUrl = `${base}/sqlite.worker.js`;
  const wasmUrl   = `${base}/sql-wasm.wasm`;
  const config = {
    from: 'inline',
    config: {
      serverMode: 'full',
      url: `${base}/pokedex.db`,
      requestChunkSize: 4096,
    },
  };
  try {
    dbWorker = await createDbWorker([config], workerUrl, wasmUrl);
    await executeQuery();
  } catch (e) {
    error.value = e.message || e.toString();
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>SQLite Data Viewer</h1>
    <ClientOnly>
      <div class='query-box'>
        <input v-model='query' type='text' placeholder='SQLクエリを入力' />
        <button @click='executeQuery'>実行</button>
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else-if="dbData">
        <pre>{{ JSON.stringify(dbData, null, 2) }}</pre>
      </div>
    </ClientOnly>
  </div>
</template>