<script setup>
import { ref, onMounted } from 'vue';
import { createDbWorker } from 'sql.js-httpvfs';

definePageMeta({ 
  ssr: false,
  title: "DB Viewer β"
});

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: 'webapp',
  href: '/webapp',
  disabled: false
})
breadcrumbs.push({
  title: 'DB Viewer',
  href: '/webapp/db_view',
  disabled: true
})

// const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("DB Viewer β")
// updateMetadata(metaTitle.value)
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
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" #item="{ item }">
      <v-breadcrumbs-item :disabled="item.disabled" :to="item.href" nuxt>
        {{ item.title }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
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
  </v-container>
</template>