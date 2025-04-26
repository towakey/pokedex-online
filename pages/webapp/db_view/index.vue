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

// 結果をクリップボードにコピーする関数
function copyResults() {
  if (!dbData.value) return;
  const text = JSON.stringify(dbData.value, null, 2);
  navigator.clipboard.writeText(text);
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
      <v-row class="query-box">
        <v-col cols="12">
          <v-textarea
            v-model="query"
            label="SQLクエリを入力"
            outlined
            dense
            auto-grow
            rows="4"
            class="w-100"
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" @click="executeQuery">実行</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          />
          <v-alert
            v-else-if="error"
            type="error"
            dense
          >
            Error: {{ error }}
          </v-alert>
          <v-card v-else-if="dbData" flat>
            <v-card-title class="d-flex justify-end">
              <v-btn icon @click="copyResults">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <pre>{{ JSON.stringify(dbData, null, 2) }}</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>