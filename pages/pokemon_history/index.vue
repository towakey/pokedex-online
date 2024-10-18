<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
route.meta.title = '年表'

definePageMeta({
  title: "年表"
})
let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: '年表',
  href: '/pokemon_history',
  disabled: true
})
const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("年表")
updateMetadata(metaTitle.value)
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

const years = [
  {
    color: 'black',
    year: '1996年',
    game: '',
    text: ''
  },
  {
    color: 'cyan',
    year: '1996年2月27日',
    game: 'ポケットモンスター赤・緑',
    text: ''
  },
  {
    color: 'cyan',
    year: '1996年10月15日',
    game: 'ポケットモンスター青',
    text: ''
  },
  {
    color: 'black',
    year: '1997年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '1997年4月1日',
    game: 'アニメ「ポケットモンスター」放映開始',
    text: ''
  },
  {
    color: 'black',
    year: '1998年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '1998年8月1日',
    game: 'ポケモンスタジアム',
    text: ''
  },
  {
    color: 'cyan',
    year: '1998年9月12日',
    game: 'ポケットモンスターピカチュウ',
    text: ''
  },
  {
    color: 'green',
    year: '1998年12月12日',
    game: 'ピカチュウげんきでちゅう',
    text: ''
  },
  {
    color: 'green',
    year: '1998年12月18日',
    game: 'ポケモンカードGB',
    text: ''
  },
  {
    color: 'black',
    year: '1999年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '1999年1月28日',
    game: 'アニメ「ポケットモンスター」オレンジ諸島編放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '1999年3月21日',
    game: 'ポケモンスナップ',
    text: ''
  },
  {
    color: 'green',
    year: '1999年4月14日',
    game: 'ポケモンピンボール',
    text: ''
  },
  {
    color: 'cyan',
    year: '1999年4月30日',
    game: 'ポケモンスタジアム2',
    text: ''
  },
  {
    color: 'blue',
    year: '1999年10月14日',
    game: 'アニメ「ポケットモンスター」ジョウト地方編放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '1999年11月21日',
    game: 'ポケットモンスター金・銀',
    text: ''
  },
  {
    color: 'black',
    year: '2000年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2000年9月21日',
    game: 'ポケモンでパネポン',
    text: ''
  },
  {
    color: 'cyan',
    year: '2000年12月14日',
    game: 'ポケットモンスタークリスタル',
    text: ''
  },
  {
    color: 'green',
    year: '2000年12月14日',
    game: 'ポケモンスタジアム 金銀',
    text: ''
  },
  {
    color: 'black',
    year: '2001年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2001年3月28日',
    game: 'ポケモンカードGB2 GR団参上！',
    text: ''
  },
  {
    color: 'black',
    year: '2002年',
    game: '',
    text: ''
  },
  {
    color: 'cyan',
    year: '2002年11月21日',
    game: 'ポケットモンスタールビー・サファイア',
    text: ''
  },
  {
    color: 'blue',
    year: '2002年11月21日',
    game: 'アニメ「ポケットモンスターアドバンスジェネレーション」放映開始',
    text: ''
  },
  {
    color: 'black',
    year: '2003年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2003年5月30日',
    game: 'ポケモンボックス ルビー＆サファイア',
    text: ''
  },
  {
    color: 'green',
    year: '2003年7月18日',
    game: 'ポケモンチャンネル～ピカチュウといっしょ！～',
    text: ''
  },
  {
    color: 'green',
    year: '2003年8月1日',
    game: 'ポケモンピンボール ルビー＆サファイア',
    text: ''
  },
  {
    color: 'green',
    year: '2003年11月21日',
    game: 'ポケモンコロシアム',
    text: ''
  },
  {
    color: 'black',
    year: '2004年',
    game: '',
    text: ''
  },
  {
    color: 'cyan',
    year: '2004年1月29日',
    game: 'ポケットモンスターファイアレッド・リーフグリーン',
    text: ''
  },
  {
    color: 'cyan',
    year: '2004年9月16日',
    game: 'ポケットモンスターエメラルド',
    text: ''
  },
  {
    color: 'green',
    year: '2004年12月2日',
    game: 'ポケモンダッシュ',
    text: ''
  },
  {
    color: 'black',
    year: '2005年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '2005年7月21日',
    game: 'アニメ「ポケットモンスターアドバンスジェネレーション」バトルフロンティア編放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '2005年8月4日',
    game: 'ポケモンXD 闇の旋風ダーク・ルギア',
    text: ''
  },
  {
    color: 'green',
    year: '2005年10月20日',
    game: 'ポケモントローゼ',
    text: ''
  },
  {
    color: 'green',
    year: '2005年11月17日',
    game: 'ポケモン不思議のダンジョン 青の救助隊・赤の救助隊',
    text: ''
  },
  {
    color: 'black',
    year: '2006年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2006年3月23日',
    game: 'ポケモンレンジャー',
    text: ''
  },
  {
    color: 'cyan',
    year: '2006年9月28日',
    game: 'ポケットモンスターダイヤモンド・パール',
    text: ''
  },
  {
    color: 'blue',
    year: '2006年9月28日',
    game: 'アニメ「ポケットモンスターダイヤモンド&パール」放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '2006年12月14日',
    game: 'ポケモンバトルレボリューション',
    text: ''
  },
  {
    color: 'black',
    year: '2007年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2007年9月13日',
    game: 'ポケモン不思議のダンジョン 時の探検隊・闇の探検隊',
    text: ''
  },
  {
    color: 'black',
    year: '2008年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2008年3月25日',
    game: 'みんなのポケモン牧場',
    text: ''
  },
  {
    color: 'green',
    year: '2008年3月20日',
    game: 'ポケモンレンジャーバトナージ',
    text: ''
  },
  {
    color: 'cyan',
    year: '2008年9月13日',
    game: 'ポケットモンスタープラチナ',
    text: ''
  },
  {
    color: 'green',
    year: '2008年11月5日',
    game: 'みんなのポケモン牧場(プラチナ対応版)',
    text: ''
  },
  {
    color: 'black',
    year: '2009年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2009年4月18日',
    game: 'ポケモン不思議のダンジョン 空の探検隊',
    text: ''
  },
  {
    color: 'green',
    year: '2009年6月16日',
    game: '乱戦！ポケモンスクランブル',
    text: ''
  },
  {
    color: 'green',
    year: '2009年8月4日',
    game: 'ポケモン不思議のダンジョン すすめ！炎の冒険団・いくぞ！嵐の冒険団・めざせ！光の冒険団',
    text: ''
  },
  {
    color: 'cyan',
    year: '2009年9月12日',
    game: 'ポケットモンスターハートゴールド・ソウルシルバー',
    text: ''
  },
  {
    color: 'green',
    year: '2009年12月5日',
    game: 'ポケパークWii～ピカチュウの大冒険～',
    text: ''
  },
  {
    color: 'black',
    year: '2010年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2010年3月6日',
    game: 'ポケモンレンジャー 光の軌跡',
    text: ''
  },
  {
    color: 'cyan',
    year: '2010年9月18日',
    game: 'ポケットモンスターブラック・ホワイト',
    text: ''
  },
  {
    color: 'blue',
    year: '2010年9月23日',
    game: 'アニメ「ポケットモンスター ベストウイッシュ」イッシュ編放映開始',
    text: ''
  },
  {
    color: 'black',
    year: '2011年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2011年4月21日',
    game: 'バトル＆ゲット！ポケモンタイピングDS',
    text: ''
  },
  {
    color: 'green',
    year: '2011年6月17日',
    game: 'ポケモン立体図鑑BW',
    text: ''
  },
  {
    color: 'green',
    year: '2011年8月11日',
    game: 'スーパーポケモンスクランブル',
    text: ''
  },
  {
    color: 'green',
    year: '2011年11月12日',
    game: 'ポケパーク2 ～Beyond the World～',
    text: ''
  },
  {
    color: 'black',
    year: '2012年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2012年3月17日',
    game: 'ポケモン＋ノブナガの野望',
    text: ''
  },
  {
    color: 'blue',
    year: '2012年6月21日',
    game: 'アニメ「ポケットモンスター ベストウイッシュ」イーストイッシュ編放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '2012年6月23日',
    game: 'ポケットモンスターブラック2・ホワイト2',
    text: ''
  },
  {
    color: 'green',
    year: '2012年6月23日',
    game: 'ポケモンARサーチャー',
    text: ''
  },
  {
    color: 'green',
    year: '2012年7月14日',
    game: 'ポケモン全国図鑑Pro',
    text: ''
  },
  {
    color: 'green',
    year: '2012年11月23日',
    game: 'ポケモン不思議のダンジョン ～マグナゲートと∞迷宮～',
    text: ''
  },
  {
    color: 'black',
    year: '2013年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '2013年1月17日',
    game: 'アニメ「ポケットモンスター ベストウイッシュ」白の遺跡編放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '2013年4月24日',
    game: 'ポケモンスクランブルU',
    text: ''
  },
  {
    color: 'blue',
    year: '2013年4月25日',
    game: 'アニメ「ポケットモンスター ベストウイッシュ」デコロラ諸島編放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '2013年10月12日',
    game: 'ポケットモンスターX・Y',
    text: ''
  },
  {
    color: 'blue',
    year: '2013年10月17日',
    game: 'アニメ「ポケットモンスター XY」カロス編放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '2013年12月25日',
    game: 'ポケモンバンク',
    text: ''
  },
  {
    color: 'black',
    year: '2014年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2014年3月12日',
    game: 'ポケモンバトルトローゼ',
    text: ''
  },
  {
    color: 'green',
    year: '2014年6月5日',
    game: 'とうぞくと1000びきのポケモン',
    text: ''
  },
  {
    color: 'green',
    year: '2014年6月19日',
    game: 'ポケモンアートアカデミー',
    text: ''
  },
  {
    color: 'cyan',
    year: '2014年11月21日',
    game: 'ポケットモンスターオメガルビー・アルファサファイア',
    text: ''
  },
  {
    color: 'black',
    year: '2015年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2015年2月18日',
    game: 'ポケとる',
    text: ''
  },
  {
    color: 'green',
    year: '2015年4月8日',
    game: 'みんなのポケモンスクランブル',
    text: ''
  },
  {
    color: 'green',
    year: '2015年9月17日',
    game: 'ポケモン超不思議のダンジョン',
    text: ''
  },
  {
    color: 'blue',
    year: '2015年10月29日',
    game: 'アニメ「ポケットモンスター XY」XY&Z編放映開始',
    text: ''
  },
  {
    color: 'green',
    year: '2015年12月2日',
    game: 'ポケモンピクロス',
    text: ''
  },
  {
    color: 'black',
    year: '2016年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2016年2月3日',
    game: '名探偵ピカチュウ ～新コンビ誕生～',
    text: ''
  },
  {
    color: 'green',
    year: '2016年3月18日',
    game: 'ポッ拳　POKKEN TOURNAMENT',
    text: ''
  },
  {
    color: 'amber',
    year: '2016年7月22日',
    game: 'Pokémon GO',
    text: ''
  },
  {
    color: 'blue',
    year: '2016年11月17日',
    game: 'アニメ「ポケットモンスター サン＆ムーン」放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '2016年11月18日',
    game: 'ポケットモンスターサン・ムーン',
    text: ''
  },
  {
    color: 'black',
    year: '2017年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2017年9月22日',
    game: 'ポッ拳　POKKEN TOURNAMENT DX',
    text: ''
  },
  {
    color: 'cyan',
    year: '2017年11月17日',
    game: 'ポケットモンスターウルトラサン・ウルトラムーン',
    text: ''
  },
  {
    color: 'black',
    year: '2018年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2018年3月23日',
    game: '名探偵ピカチュウ',
    text: ''
  },
  {
    color: 'green',
    year: '2018年5月30日',
    game: 'ポケモンクエスト',
    text: ''
  },
  {
    color: 'amber',
    year: '2018年6月27日',
    game: 'ポケモンクエスト',
    text: ''
  },
  {
    color: 'cyan',
    year: '2018年11月16日',
    game: 'ポケットモンスターLets Go!ピカチュウ・Lets Go!イーブイ',
    text: ''
  },
  {
    color: 'black',
    year: '2019年',
    game: '',
    text: ''
  },
  {
    color: 'cyan',
    year: '2019年11月15日',
    game: 'ポケットモンスターソード・シールド',
    text: ''
  },
  {
    color: 'blue',
    year: '2019年11月17日',
    game: 'アニメ「ポケットモンスター」放映開始',
    text: ''
  },
  {
    color: 'black',
    year: '2020年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2020年2月12日',
    game: 'Pokémon HOME',
    text: ''
  },
  {
    color: 'amber',
    year: '2020年2月12日',
    game: 'Pokémon HOME',
    text: ''
  },
  {
    color: 'green',
    year: '2020年3月6日',
    game: 'ポケモン不思議のダンジョン 救助隊DX',
    text: ''
  },
  {
    color: 'cyan',
    year: '2020年6月17日',
    game: 'ポケットモンスターソード・シールド エキスパンションパス(鎧の狐島)',
    text: ''
  },
  {
    color: 'green',
    year: '2020年6月24日',
    game: 'Pokémon Café Mix',
    text: ''
  },
  {
    color: 'amber',
    year: '2020年6月24日',
    game: 'Pokémon Café Mix',
    text: ''
  },
  {
    color: 'cyan',
    year: '2020年10月23日',
    game: 'ポケットモンスターソード・シールド エキスパンションパス(冠の雪原)',
    text: ''
  },
  {
    color: 'black',
    year: '2021年',
    game: '',
    text: ''
  },
  {
    color: 'green',
    year: '2021年4月30日',
    game: 'New ポケモンスナップ',
    text: ''
  },
  {
    color: 'green',
    year: '2021年7月21日',
    game: 'Pokémon UNITE',
    text: ''
  },
  {
    color: 'amber',
    year: '2021年9月22日',
    game: 'Pokémon UNITE',
    text: ''
  },
  {
    color: 'green',
    year: '2021年10月28日',
    game: 'ようこそ！ポケモンカフェ～まぜまぜパズル～',
    text: ''
  },
  {
    color: 'amber',
    year: '2021年10月28日',
    game: 'ようこそ！ポケモンカフェ～まぜまぜパズル～',
    text: ''
  },
  {
    color: 'cyan',
    year: '2021年11月19日',
    game: 'ポケットモンスターブリリアントダイヤモンド・シャイニングパール',
    text: ''
  },
  {
    color: 'black',
    year: '2022年',
    game: '',
    text: ''
  },
  {
    color: 'cyan',
    year: '2022年1月28日',
    game: 'Pokémon LEGENDS アルセウス',
    text: ''
  },
  {
    color: 'cyan',
    year: '2022年11月18日',
    game: 'ポケットモンスタースカーレット・バイオレット',
    text: ''
  },
  {
    color: 'black',
    year: '2023年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '2023年1月13日',
    game: 'アニメ「ポケットモンスター」めざせポケモンマスター編放映開始',
    text: ''
  },
  {
    color: 'blue',
    year: '2023年4月14日',
    game: 'アニメ「ポケットモンスター」リコとロイの旅立ち編放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '2023年9月13日',
    game: 'ポケットモンスタースカーレット・バイオレット ゼロの秘宝 前編・碧の仮面',
    text: ''
  },
  {
    color: 'green',
    year: '2023年10月6日',
    game: '帰ってきた 名探偵ピカチュウ',
    text: ''
  },
  {
    color: 'blue',
    year: '2023年10月27日',
    game: 'アニメ「ポケットモンスター」テラパゴスのかがやき編放映開始',
    text: ''
  },
  {
    color: 'cyan',
    year: '2023年12月14日',
    game: 'ポケットモンスタースカーレット・バイオレット ゼロの秘宝 後編・藍の円盤',
    text: ''
  },
  {
    color: 'black',
    year: '2024年',
    game: '',
    text: ''
  },
  {
    color: 'blue',
    year: '2024年4月12日',
    game: 'アニメ「ポケットモンスター」テラスタルデビュー編放映開始',
    text: ''
  },
  {
    color: 'blue',
    year: '2024年10月11日',
    game: 'アニメ「ポケットモンスター」レックウザ ライジング編放映開始',
    text: ''
  },
  // {
  //   color: 'green',
  //   year: '1970',
  // },
  // {
  //   color: 'pink',
  //   year: '1980',
  // },
  // {
  //   color: 'amber',
  //   year: '1990',
  // },
  // {
  //   color: 'orange',
  //   year: '2000',
  // },  
]

const colorNames = {
  'cyan': 'メインシリーズ',
  'green': 'スピンオフ',
  'amber': 'モバイル',
  'blue': 'アニメ'
}

const availableColors = [...new Set(years.map(year => year.color))].filter(color => color !== 'black');
const selectedColors = ref(new Set()); // 初期状態では何も選択されていない状態

const filteredYears = computed(() => {
  if (selectedColors.value.size === 0) {
    return years; // 何も選択されていない場合はすべて表示
  } else {
    return years.filter(year => selectedColors.value.has(year.color) || year.color === 'black');
  }
});

const toggleColor = (color: string) => {
  if (selectedColors.value.has(color)) {
    selectedColors.value.delete(color);
  } else {
    selectedColors.value.add(color);
  }
};

</script>
<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="props">
        <v-breadcrumbs-item
          exact
          :disabled="props.item.disabled"
          :to="props.item.href"
          nuxt
        >
          {{ props.item.title }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-card-text>
          <v-chip-group multiple> <!-- multiple 属性を追加 -->
            <v-chip
              v-for="color in availableColors"
              :key="color"
              :class="[
                selectedColors.has(color) ? 'selected-chip text-' + color : '', // selected-chip と text-color を同時に適用
                selectedColors.has(color) ? 'bg-' + color : 'bg-grey-lighten-2' // 背景色も動的に変更
                ]"
                :variant="selectedColors.has(color) ? 'flat' : 'outlined'"
                @click="toggleColor(color)"
            >
                {{ colorNames[color] }}
            </v-chip>
          </v-chip-group>

        <v-timeline side="end">
          <v-timeline-item
            v-for="(year, i) in filteredYears"
            :key="i"
            :dot-color="year.color"
            size="small"
          >
            <template v-slot:opposite>
              <div
                :class="`pt-1 headline font-weight-bold text-${year.color}`"
                v-text="year.year"
              ></div>
            </template>
            <div>
              <!-- <h2 
                :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`"
              > -->
              <h2 
              :class="`pt-1 headline font-weight-bold text-${year.color}`"
              >
                {{ year.game }}
              </h2>
              <!-- <div>
                {{ year.text }}
              </div> -->
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.v-chip.v-chip--selected { /* selected時のスタイル */
  color: white !important; /* 必要に応じてテキスト色を調整 */
}
</style>