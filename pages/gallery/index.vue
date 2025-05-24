<script setup lang="ts">
// import { ref } from 'vue'

const route = useRoute()
route.meta.title = 'ギャラリー'

definePageMeta({
  title: 'ギャラリー'
})

const galleryItems = ref([
  { 
    id: 1,
    src: '/gallery/gallery-1.jpg',
    description: 'ポケモンマニアのマサキさんって一人でポケモンあずかりシステム作ったんだよね？\n普通にエンジニアとして凄すぎる\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/982812738798809088'
  },
  { 
    id: 2,
    src: '/gallery/gallery-2.jpg',
    description: 'ちなみにPCに写してるコード、それっぽいのを書いたｗ\nクラスよくわかんねえ…\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/982814408773582850'
  },
  { 
    id: 3,
    src: '/gallery/gallery-3.jpg',
    description: 'バトルの合間のお茶\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/982819322216136704'
  },
  { 
    id: 4,
    src: '/gallery/gallery-4.jpg',
    description: '雷落で倒れた木の側から見つかったのが｢かみなりのいし｣の名前の由縁という話は本当だろうか\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/986553904509796353'
  },
  { 
    id: 5,
    src: '/gallery/gallery-5.jpg',
    description: '雷落で倒れた木の側から見つかったのが｢かみなりのいし｣の名前の由縁という話は本当だろうか\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/986553904509796353'
  },
  { 
    id: 6,
    src: '/gallery/gallery-6.jpg',
    description: '冒険の準備！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992643327672500226'
  },
  { 
    id: 7,
    src: '/gallery/gallery-7.jpg',
    description: '誰かここでポケモン捕まえようとした…？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/991203783303561216'
  },
  { 
    id: 8,
    src: '/gallery/gallery-8.jpg',
    description: '草むらにたまにボールが落ちてるけどみんな気付かないものなのかな？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/991219074536390661'
  },
  { 
    id: 9,
    src: '/gallery/gallery-9.jpg',
    description: '1200円浮いた\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/991218923155542016'
  },
  { 
    id: 10,
    src: '/gallery/gallery-10.jpg',
    description: 'しんかのいしは使ってしまうと濁ってしまうので、こうやって瓶にいれてインテリアとして飾る人がいるって聞いたのでやってみた\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/993836084894171137'
  },
  { 
    id: 11,
    src: '/gallery/gallery-11.jpg',
    description: 'モクロースナップ！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992257048141156353'
  },
  { 
    id: 12,
    src: '/gallery/gallery-12.jpg',
    description: 'モクローの巣にあるモンスターボールには誰が入ってるんだろう\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992256884215197696'
  },
  { 
    id: 13,
    src: '/gallery/gallery-13.jpg',
    description: '遠い何かを見つめるモクロー\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992258084109090816'
  },
  { 
    id: 14,
    src: '/gallery/gallery-14.jpg',
    description: '天からの啓示を受けるモクロー\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992257829628137478'
  },
  { 
    id: 15,
    src: '/gallery/gallery-15.jpg',
    description: '道路の端の溝とかにたまにボール落ちてるよね\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992242532204531712'
  },
  { 
    id: 16,
    src: '/gallery/gallery-16.jpg',
    description: 'たぶん雨水に流されて来たモンスターボール\nどこかでポケモン捕まえるときに投げたのが流れてきたのかな？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992245781405974528'
  },
  { 
    id: 17,
    src: '/gallery/gallery-17.jpg',
    description: 'たぶん雨水に流されて来たモンスターボール\nどこかでポケモン捕まえるときに投げたのが流れてきたのかな？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992245781405974528'
  },
  { 
    id: 18,
    src: '/gallery/gallery-18.jpg',
    description: '道の植木の中にたまにボールが落ちてるということはゲットに失敗したのかな\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992250453227270144'
  },
  { 
    id: 19,
    src: '/gallery/gallery-19.jpg',
    description: '木の幹の中って何かないか探しちゃう\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992252555441782784'
  },
  { 
    id: 20,
    src: '/gallery/gallery-20.jpg',
    description: 'なんか光がいい具合に当たって伝説のモンスターボールっぽい\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/992255593866936325'
  },
  { 
    id: 21,
    src: '/gallery/gallery-21.jpg',
    description: '道に落ちてるサイコソーダを、くさむらを通ってきて弱った手持ちポケモンに飲ませて回復させる話をたまに聞くけど、その辺に落ちてる飲み物を拾い与えするの良くないと思うんですよね、とマジレス\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/998500590484271105'
  },
  { 
    id: 22,
    src: '/gallery/gallery-22.jpg',
    description: 'ダイゴ少年が鉱物マニアになったきっかけ\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/998543536101376001'
  },
  { 
    id: 23,
    src: '/gallery/gallery-23.jpg',
    description: 'シルフカンパニーと提携しているホテルに泊まると一部屋に一個ハイパーボールが置かれているらしい\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1000383105503453184'
  },
  { 
    id: 24,
    src: '/gallery/gallery-24.jpg',
    description: 'モンスターボールの中からの風景\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1023509862435540993'
  },
  { 
    id: 25,
    src: '/gallery/gallery-25.jpg',
    description: 'モンスターボールの中からの風景\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1023509862435540993'
  },
  { 
    id: 26,
    src: '/gallery/gallery-26.jpg',
    description: 'モンスターボールの中からの風景\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1023509862435540993'
  },
  { 
    id: 27,
    src: '/gallery/gallery-27.jpg',
    description: 'ボール磨きはトレーナーの日課\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1031195418569265153'
  },
  { 
    id: 28,
    src: '/gallery/gallery-28.jpg',
    description: 'ポケモンを捨てるのは\nダメ、ゼッタイ\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1038695492610285568'
  },
  { 
    id: 29,
    src: '/gallery/gallery-29.jpg',
    description: 'たまにボールが落ちてるけどトレーナー以外は興味ないからスルーされるんだよね\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1069181519145590785'
  },
  { 
    id: 30,
    src: '/gallery/gallery-30.jpg',
    description: '一緒に収穫\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1075380019000598528'
  },
  { 
    id: 31,
    src: '/gallery/gallery-31.jpg',
    description: '最近モンスターボールをスイッチの入ったIHヒーターの側に置いて破損する事例が増えています！\nモンスターボールは精密機械です。\nまた中にポケモンがいた場合ポケモンにも影響がある場合があります。\n側に置かないように気を付けましょう！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1087013533181562880'
  },
  { 
    id: 32,
    src: '/gallery/gallery-32.jpg',
    description: '進化の石は結構そのへんの草むらとかにも落ちてるイメージ\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/974934172799188992'
  },
  { 
    id: 33,
    src: '/gallery/gallery-33.jpg',
    description: '#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/974933845773398016'
  },
  { 
    id: 34,
    src: '/gallery/gallery-34.jpg',
    description: '割れた岩の中に炎の石が…！\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/974934801302999040'
  },
  { 
    id: 35,
    src: '/gallery/gallery-35.jpg',
    description: '砂を掘っていたらなんか出てきた《*≧∀≦》\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/974935347409821696'
  },
  { 
    id: 36,
    src: '/gallery/gallery-36.jpg',
    description: '綺麗な湧き水が流れるところだと、みずのいしは見つかりやすいらしい\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/977831734996692992'
  },
  { 
    id: 37,
    src: '/gallery/gallery-37.jpg',
    description: '綺麗な湧き水が流れるところだと、みずのいしは見つかりやすいらしい\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/977831734996692992'
  },
  { 
    id: 38,
    src: '/gallery/gallery-38.jpg',
    description: '綺麗な湧き水が流れるところだと、みずのいしは見つかりやすいらしい\n#ポケモンのある風景\n#モンスターボールのある風景',
    xLink: 'https://x.com/kyoswin7/status/977831734996692992'
  },
  { 
    id: 39,
    src: '/gallery/gallery-39.jpg',
    description: '田舎のじいちゃん家の押し入れにモンスターボールを見つけた\nあれ、うちの家族誰もポケモン連れてないはずなんだけど…?\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1411708554201817091'
  },
  { 
    id: 40,
    src: '/gallery/gallery-40.jpg',
    description: 'ポケモン園に行ってきたんだけど、スワンナコーナーの近くに落ちてたスワンナの羽根\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1420240246558511106'
  },
  { 
    id: 41,
    src: '/gallery/gallery-41.jpg',
    description: '殿堂入りおめでとう！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1293151580682772480'
  },
  { 
    id: 42,
    src: '/gallery/gallery-42.jpg',
    description: '誰💢\n私の「きあいだま」の技マシンをポケモンのDVDのケースに仕舞ったの💢\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1181931945967505414'
  },
  // { 
  //   id: 43,
  //   src: '/gallery/gallery-43.jpg',
  //   description: '綺麗な湧き水が流れるところだと、みずのいしは見つかりやすいらしい\n#ポケモンのある風景\n#モンスターボールのある風景',
  //   xLink: 'https://x.com/kyoswin7/status/977831734996692992'
  // },
  { 
    id: 44,
    src: '/gallery/gallery-44.jpg',
    description: 'ゴールデンウィークにカントー行ったとき、半日ぐらいゲーセンでずっとスロットやって交換してもらったサイコキネシスの技マシン\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1182311145635344389'
  },
  { 
    id: 45,
    src: '/gallery/gallery-45.jpg',
    description: '岩塩の地層付近で作られた進化の石は、進化の石そのものも岩塩で出来てるらしい。\nそしてその石によって味が少しずつ違うという。\n炎の石は他の石より塩辛いらしい。\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1183254014151950339'
  },
  { 
    id: 46,
    src: '/gallery/gallery-46.jpg',
    description: '雷の石はちょっとピリッとする辛さらしい。\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1183256124662804482'
  },
  { 
    id: 47,
    src: '/gallery/gallery-47.jpg',
    description: '水の石は炎、雷と比べると一番マイルドな味だという。\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1183256695151050752'
  },
  { 
    id: 48,
    src: '/gallery/gallery-48.jpg',
    description: 'ポケモンをメガシンカさせるキーストーン。\n純度の高いものは透き通った色をしておりメガシンカもやりやすいと言われ、高値で取り引きをされてるという。\n誰かが捨てちゃったのかな…。\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1188370636793450496'
  },
  { 
    id: 49,
    src: '/gallery/gallery-49.jpg',
    description: '裏社会をよく知るジャーナリストの筆者が、高い統率力を持つとされるロケット団の組織運営を徹底解剖！\n「強い組織の育てかた」\n好評発売中！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1191737300159385604'
  },
  { 
    id: 50,
    src: '/gallery/gallery-50.jpg',
    description: 'ガラル地方の空港の入国審査所にはこんな看板があるんだろうな。\nたぶん生態系が崩れてるから入国するポケモンの種類を制限してるんだと思う。\n#ポケモンのある風景\n#ポケモン\n#ポケモン剣盾',
    xLink: 'https://x.com/kyoswin7/status/1193908160152473602'
  },
  { 
    id: 51,
    src: '/gallery/gallery-51.jpg',
    description: '失くしたと思ってたプレミアボール、ソファの下に落ちてた！\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1315851180141027329'
  },
  { 
    id: 52,
    src: '/gallery/gallery-52.jpg',
    description: 'こおりタイプポケモンの夏の暑さ対策\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1204395482576912384'
  },
  { 
    id: 53,
    src: '/gallery/gallery-53.jpg',
    description: '遠出をした時はフレンドリーショップでボールをまとめ買いする。\nボール10個まとめ買いで1個プレミアボールがおまけされるのはどこも一緒だけど、ラッピングはお店によって違うんだよね。\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1214559632653373440'
  },
  { 
    id: 54,
    src: '/gallery/gallery-54.jpg',
    description: '今日はお休みだったので、相棒のボールを洗ってあげてた\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1254016436848099329'
  },
  { 
    id: 55,
    src: '/gallery/gallery-55.jpg',
    description: 'この間バトルしたオカルトマニアなトレーナーが\n「夜寝るときに枕元に袋に空のボールを入れて寝ると、あなたを好きなゴーストポケモンがいつの間にか入ってることがある」\nって言ってたけどホントかな？\n#ポケモンのある風景\n#ポケモンと生活',
    xLink: 'https://x.com/kyoswin7/status/1259128512729890817'
  },
  { 
    id: 56,
    src: '/gallery/gallery-56.jpg',
    description: '飲んだ後の瓶は洗って乾かして玄関先に置いておくとモーモーミルク屋さんが回収してくれて、代わりに新しいモーモーミルクが入ってる\nちょっと嬉しい\n#ポケモンのある風景\n#モーモーミルク',
    xLink: 'https://x.com/kyoswin7/status/1561709668350562304'
  },
  { 
    id: 57,
    src: '/gallery/gallery-57.jpg',
    description: 'あの日から僕たちの冒険は始まった！\n25周年おめでとうございます！\n#ポケモン25周年\n#Pokemon25 \n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1365626106888417282'
  },
  { 
    id: 58,
    src: '/gallery/gallery-58.jpg',
    description: '街灯に何かくっついてると思ったらコイルだった\n小さい気がするけど子供かな？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1585589969833558016'
  },
  { 
    id: 59,
    src: '/gallery/gallery-59.jpg',
    description: '街灯に何かくっついてると思ったらコイルだった\n小さい気がするけど子供かな？\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1585589969833558016'
  },
  { 
    id: 60,
    src: '/gallery/gallery-60.jpg',
    description: 'シルフカンパニー ボール販促ポスター ゴーストタイプ編\n#ポケモンのある風景\n#SYLPHCOMPANY\n#ポケモン',
    xLink: 'https://x.com/kyoswin7/status/1481642402884759552'
  },
  { 
    id: 61,
    src: '/gallery/gallery-61.jpg',
    description: '歩き続けて、どこまでも行こう\n#ポケモン26周年\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1500363213845647361'
  },
  { 
    id: 62,
    src: '/gallery/gallery-62.jpg',
    description: '前の人が忘れたプレミアボールを発見\n#ポケモンのある風景',
    xLink: 'https://x.com/kyoswin7/status/1127976057636712448'
  },
  // // 他の画像も同様に追加できます
  // ...Array.from({ length: 60 }, (_, i) => ({
  //   id: i + 3,
  //   src: `/gallery/gallery-${i + 3}.jpg`,
  //   description: ``,
  //   xLink: ''
  // }))
])

const dialog = ref(false)
const selectedItem = ref(null)

const openImage = (item) => {
  selectedItem.value = item
  dialog.value = true
}

let breadcrumbs = []
breadcrumbs.push({
  title: 'HOME',
  href: '/',
  disabled: false
})
breadcrumbs.push({
  title: route.meta.title,
  href: '/gallery',
  disabled: true
})

const updateMetadata = inject('updateMetadata') as (title: string) => void
const metaTitle = ref("ギャラリー")
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

    <v-row>
      <v-col v-for="item in galleryItems" :key="item.id" cols="12" sm="4">
        <v-card class="gallery-item" @click="openImage(item)">
          <v-img
            :src="item.src"
            aspect-ratio="1"
            cover
            class="image-thumbnail"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="800" max-height="90vh" class="media-dialog">
      <v-card class="media-card" flat>
        <v-card-actions class="pa-0">
          <v-btn 
            icon 
            @click="dialog = false" 
            class="close-btn"
            size="small"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        
        <v-card-text class="pa-0">
          <v-img
            v-if="selectedItem"
            :src="selectedItem.src"
            max-height="60vh"
            contain
            class="enlarged-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          
          <div v-if="selectedItem" class="media-caption pa-4">
            <p class="text-body-2 mb-2">{{ selectedItem.description }}</p>
            <div v-if="selectedItem.xLink" class="d-flex align-center">
              <v-icon small class="mr-1">mdi-twitter</v-icon>
              <a 
                :href="selectedItem.xLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none"
              >
                <span class="text-body-2">X で見る</span>
              </a>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.gallery-item {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}



.media-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-card {
  background: white;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
}

.media-caption {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.media-caption a {
  color: #1da1f2;
  text-decoration: none;
  transition: opacity 0.2s;
}

.media-caption a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background-color: rgba(15, 20, 25, 0.75);
  color: white;
  backdrop-filter: blur(4px);
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(15, 20, 25, 0.9);
}

.enlarged-image {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
}

:deep(.v-dialog) {
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

/* スクロールバーのスタイリング */
:deep(.v-dialog)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

:deep(.v-dialog)::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

:deep(.v-dialog)::-webkit-scrollbar-track {
  background: transparent;
}
</style>
