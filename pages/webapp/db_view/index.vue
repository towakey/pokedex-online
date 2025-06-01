<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { createDbWorker } from 'sql.js-httpvfs';
const config = useRuntimeConfig() // Added to access adSlot
const appConfig = useAppConfig()

definePageMeta({ 
  ssr: false,
  title: "DB Viewer"
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

const metaTitle = ref("DB Viewer")
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

const query = ref(`
SELECT 
  p.*, 
  pn.name,
  pc.classification
FROM 
  pokedex as p 
INNER JOIN 
  POKEDEX_NAME as pn 
ON 
  p.id = pn.id
INNER JOIN 
  POKEDEX_CLASSIFICATION as pc 
ON 
  p.id = pc.id 
WHERE 
  pn.language = 'jpn' 
  AND pc.language = 'jpn'
LIMIT 10
`);
const descriptionSearchTerm = ref('');
const currentTab = ref('descriptionSearch');
const showSharedQueryInputArea = ref(false);

// プリセットクエリ実行
function runPreset(sql) {
  query.value = sql;
  showSharedQueryInputArea.value = true;
}

const dbData = ref(null);
const loading = ref(false);
const error = ref(null);
let dbWorker;

// Added from description.vue - adjust table/column names if necessary for pokedex.db
function searchDescription() {
  let generatedQuery = '';
  if (!descriptionSearchTerm.value.trim()) {
    generatedQuery = 'SELECT * FROM LOCAL_POKEDEX_DESCRIPTION LIMIT 10';
  } else {
    generatedQuery = `
SELECT 
    lp.id
    ,lp.no
    ,lp.globalNo
    ,lp.pokedex
    ,pn.name
    ,lpt.type1
    ,lpt.type2
    ,lp.version
    ,lpd.version
    ,lpd.description
FROM
    LOCAL_POKEDEX AS lp
LEFT OUTER JOIN
    POKEDEX_NAME AS pn
ON
    lp.id = pn.id
    AND pn.language = 'jpn'
LEFT OUTER JOIN
    LOCAL_POKEDEX_TYPE AS lpt
ON
    lp.id = lpt.id
    AND lp.version = lpt.version
LEFT OUTER JOIN
    LOCAL_POKEDEX_DESCRIPTION AS lpd
ON
    lp.id = lpd.id
    AND lpd.language = 'jpn'
    
    AND (
        lp.version = lpd.version
        OR EXISTS (
            SELECT 1 
            FROM (
                SELECT value 
                FROM json_each('["' || replace(lp.version, '_', '","') || '"]')
            ) AS versions
            WHERE versions.value = lpd.version
        )
    )
WHERE
    lpd.description LIKE '%${descriptionSearchTerm.value.trim()}%' 
;
`;
  }
  query.value = generatedQuery;
  executeQuery(); // Execute the query immediately
}

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

// Export formats and download function
const exportFormats = ['JSON', 'CSV'];
const exportFormat = ref('JSON');

// 表示モードの設定
const displayModes = ['JSON', 'Card'];
const displayMode = ref('Card');

function exportResults() {
  if (!dbData.value) return;
  const now = new Date();
  const pad = num => num.toString().padStart(2, '0');
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  let content = '';
  let mimeType = '';
  let fileExt = '';
  if (exportFormat.value === 'JSON') {
    content = JSON.stringify(dbData.value, null, 2);
    mimeType = 'application/json';
    fileExt = '.json';
  } else {
    const rows = Array.isArray(dbData.value) ? dbData.value : [];
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
    const csvRows = [headers.join(','), ...rows.map(row =>
      headers.map(h => {
        const cell = row[h] != null ? row[h] : '';
        return JSON.stringify(cell);
      }).join(',')
    )];
    content = csvRows.join('\r\n');
    mimeType = 'text/csv';
    fileExt = '.csv';
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ts}${fileExt}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
  if (currentTab.value === 'sqlDirect') {
    builderQuery.value = query.value;
  } else {
    builderQuery.value = query.value; 
  }
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
  showSharedQueryInputArea.value = true;
  builderDialog.value = false;
}

// Added for Weight/Height Search Tab
const searchHeightM = ref(null);
const searchWeightKg = ref(null);
const sortHeightDesc = ref(true); // true: Desc (High to Low), false: Asc (Low to High)
const sortWeightDesc = ref(true); // true: Desc (Heavy to Light), false: Asc (Light to Heavy)

async function searchByWeightHeight() {
  let sql = `
    SELECT
        p.globalNo, p.form, p.region, p.mega_evolution, p.gigantamax,
        CAST(p.height AS REAL) AS height_val,
        CAST(p.weight AS REAL) AS weight_val,
        pn.name
    FROM
        POKEDEX AS p
    INNER JOIN
        POKEDEX_NAME AS pn
    ON
        p.globalNo = pn.globalNo AND
        p.form = pn.form AND
        p.region = pn.region AND
        p.mega_evolution = pn.mega_evolution AND
        p.gigantamax = pn.gigantamax
    WHERE
        pn.language = 'jpn'
  `;

  const whereConditions = [];
  if (searchHeightM.value !== null && searchHeightM.value !== '') {
    const height = parseFloat(searchHeightM.value);
    if (!isNaN(height)) {
      whereConditions.push(`CAST(p.height AS REAL) >= ${height}`);
    }
  }
  if (searchWeightKg.value !== null && searchWeightKg.value !== '') {
    const weight = parseFloat(searchWeightKg.value);
    if (!isNaN(weight)) {
      whereConditions.push(`CAST(p.weight AS REAL) >= ${weight}`);
    }
  }

  if (whereConditions.length > 0) {
    sql += ' AND ' + whereConditions.join(' AND ');
  }

  sql += ` ORDER BY height_val ${sortHeightDesc.value ? 'DESC' : 'ASC'}, weight_val ${sortWeightDesc.value ? 'DESC' : 'ASC'}`;
  sql += ' LIMIT 100';

  query.value = sql;
  currentTab.value = 'sizeSearch'; // Ensure results are shown under the SQL direct tab or adjust as needed
  showSharedQueryInputArea.value = false; // Show the query
  await executeQuery();
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
      <v-tabs v-model="currentTab" background-color="primary" dark class="mb-4">
        <v-tab value="descriptionSearch">図鑑説明検索</v-tab>
        <v-tab value="sizeSearch">重さ・高さ検索</v-tab>
        <v-tab value="sqlDirect">SQL直接入力</v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <v-window-item value="sqlDirect">
          <!-- Query input area and buttons removed from here -->
          <!-- プリセットクエリボタン -->
          <v-row class="preset-buttons mb-4" dense>
            <v-col cols="auto" v-for="(preset, i) in presets" :key="i">
              <v-btn small variant="outlined" elevation="0" style="background-color: white;" @click="runPreset(preset.sql)">
                {{ preset.name }}
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="descriptionSearch">
          <v-row class="mb-4">
            <v-col cols="12">
              <v-textarea
                v-model="descriptionSearchTerm"
                label="図鑑説明で検索"
                outlined
                dense
                auto-grow
                rows="2"
                class="w-100"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="searchDescription">実行</v-btn> 
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="sizeSearch">
          <v-row class="mb-4 align-center" dense>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="searchHeightM"
                label="高さ (m以上)"
                type="number"
                clearable
                variant="outlined"
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-switch
                v-model="sortHeightDesc"
                :label="`高さ: ${sortHeightDesc ? '高い順' : '低い順'}`"
                color="primary"
                inset
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="searchWeightKg"
                label="重さ (kg以上)"
                type="number"
                clearable
                variant="outlined"
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-switch
                v-model="sortWeightDesc"
                :label="`重さ: ${sortWeightDesc ? '重い順' : '軽い順'}`"
                color="primary"
                inset
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="searchByWeightHeight">
                検索実行
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="showSharedQueryInputArea = !showSharedQueryInputArea" class="mb-4">
        {{ showSharedQueryInputArea ? '実行クエリ入力欄を隠す' : '実行クエリ入力欄を表示' }}
      </v-btn>

      <v-expand-transition>
        <div v-if="showSharedQueryInputArea">
          <v-row class="query-box mb-4">
            <v-col cols="12">
              <v-textarea
                v-model="query"
                label="実行するSQLクエリ"
                outlined
                dense
                auto-grow
                rows="4"
                class="w-100"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="executeQuery" :disabled="!query.trim()">実行</v-btn>
              <v-btn variant="outlined" elevation="0" style="background-color: white;" class="ml-2" @click="openBuilder">クエリビルダー</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>

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
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <v-select
                  v-model="displayMode"
                  :items="displayModes"
                  label="表示モード"
                  dense
                  outlined
                  hide-details
                  style="max-width: 120px;"
                />
              </div>
              <div class="d-flex align-center">
                <v-select
                  v-model="exportFormat"
                  :items="exportFormats"
                  label="出力形式"
                  dense
                  outlined
                  hide-details
                  style="max-width: 120px;"
                />
                <v-btn variant="outlined" elevation="0" style="background-color: white;" class="ml-2" @click="exportResults">出力する</v-btn>
                <v-icon class="ml-2" @click="copyResults" style="cursor: pointer;">mdi-content-copy</v-icon>
              </div>
            </v-card-title>
            <v-card-text>
              <!-- JSON表示モード -->
              <div v-if="displayMode === 'JSON'">
                <pre>{{ JSON.stringify(dbData, null, 2) }}</pre>
              </div>
              
              <!-- カード表示モード -->
              <div v-else-if="displayMode === 'Card'" class="card-display-mode">
                <v-row>
                  <template v-if="Array.isArray(dbData)">
                    <v-col
                      v-for="(item, index) in dbData"
                      :key="index"
                      cols="12"
                      md="12"
                      lg="12"
                    >
                      <NuxtLink class="nuxtlink" :to="`/pokedex/${appConfig.game2region[appConfig.ver2game[item.version]] || 'global'}/${item.version ? item.no : item.globalNo}`">
                        <v-card variant="outlined" class="mb-4">
                          <div class="d-flex flex-no-wrap">
                            <div class="d-flex flex-column align-center mr-4">
                              <v-avatar size="125" tile>
                                <v-img :src="`/img/${('0000' + item.globalNo).slice( -4 )}.png`" />
                              </v-avatar>
                            </div>
                            <div>
                              <v-card-title>
                                <span v-if="item.globalNo">No.{{ item.globalNo }}</span> <span v-if="item.name">{{ item.name }}</span>
                              </v-card-title>
                              <v-card-text>
                                <span v-if="item.classification">{{ item.classification }}</span> <span v-if="item.height">{{ item.height }}m</span> <span v-if="item.weight">{{ item.weight }}kg</span><br>
                                <span v-if="item.type1"><typeIcon :type="item.type1" /></span><span v-if="item.type2"><typeIcon :type="item.type2" /></span><span v-if="item.version">{{ appConfig.ver_eng2jpn[item.version] }}</span><br>
                                <span v-if="item.description">{{ item.description }}</span>
                              </v-card-text>
                            </div>
                          </div>
                        </v-card>
                      </NuxtLink>
                    </v-col>
                  </template>
                  <v-col v-else cols="12">
                    <v-alert type="info" dense>データが配列形式ではありません。表示モードをJSONに切り替えてください。</v-alert>
                  </v-col>
                </v-row>
              </div>
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
          <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="builderDialog = false">閉じる</v-btn>
          <v-btn variant="outlined" elevation="0" style="background-color: white;" @click="applyBuilder">適用</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="0" style="background-color: white;" variant="outlined">
          <v-card-text>
            <adsbygoogle
              :ad-slot="config.public.adSlot"
              :ad-format="'auto'"
              :full-width-responsive="true"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="0" style="background-color: white;" variant="outlined">
          <v-card-text>
            <adsbygoogle
              :ad-slot="config.public.adSlot"
              :ad-format="'auto'"
              :full-width-responsive="true"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>