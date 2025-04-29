<script setup>
import { ref, onMounted, nextTick } from 'vue';
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

// プリセットクエリ一覧（runtime fetch）
const presets = ref([]);
onMounted(async () => {
  try {
    const res = await fetch('/db-view-presets.json');
    presets.value = await res.json();
  } catch (err) {
    console.error('Failed to load presets:', err);
  }
});

const query = ref('SELECT * FROM pokedex LIMIT 10');
// プリセットクエリ実行
function runPreset(sql) {
  query.value = sql;
  executeQuery();
}

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

// クエリビルダーダイアログ
const builderDialog = ref(false);
const builderQuery = ref('');
const builderButtons = [
  { label: 'SELECT', text: 'SELECT ' },
  { label: 'FROM', text: 'FROM ' },
  { label: 'WHERE', text: 'WHERE ' },
  { label: 'AND', text: 'AND ' },
  { label: 'OR', text: 'OR ' },
  { label: 'LIMIT', text: 'LIMIT ' }
];
const builderTextarea = ref(null);

function openBuilder() {
  builderQuery.value = query.value;
  builderDialog.value = true;
  nextTick(() => builderTextarea.value.focus());
}

function insertBuilderText(text) {
  const textarea = builderTextarea.value;
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const val = builderQuery.value;
  builderQuery.value = val.slice(0, start) + text + val.slice(end);
  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
  });
}

function applyBuilder() {
  query.value = builderQuery.value;
  builderDialog.value = false;
}

onMounted(async () => {
  loading.value = true;
  error.value = null;
  const base = window.location.origin;
  const ts = Date.now();
  const workerUrl = `${base}/sqlite.worker.js?ts=${ts}`;
  const wasmUrl   = `${base}/sql-wasm.wasm?ts=${ts}`;
  const config = {
    from: 'inline',
    config: {
      serverMode: 'full',
      url: `${base}/pokedex.db?ts=${ts}`,
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
          <v-btn color="secondary" class="ml-2" @click="openBuilder">クエリビルダー</v-btn>
        </v-col>
      </v-row>
      <!-- プリセットクエリボタン -->
      <v-row class="preset-buttons" dense>
        <v-col cols="auto" v-for="(preset, i) in presets" :key="i">
          <v-btn small outlined @click="runPreset(preset.sql)">
            {{ preset.name }}
          </v-btn>
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
    <!-- Query Builder Modal -->
    <v-dialog v-model="builderDialog" max-width="600">
      <v-card>
        <v-card-title>クエリビルダー</v-card-title>
        <v-card-text>
          <textarea ref="builderTextarea" v-model="builderQuery" style="width:100%; height:200px; font-family:monospace;"></textarea>
          <div class="mt-4 d-flex flex-wrap">
            <v-btn small class="ma-1" v-for="(btn, i) in builderButtons" :key="i" @click="insertBuilderText(btn.text)">
              {{ btn.label }}
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="builderDialog = false">閉じる</v-btn>
          <v-btn color="primary" @click="applyBuilder">適用</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>