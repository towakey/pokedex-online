<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const config = useRuntimeConfig()

const props = defineProps(["description", "title"])

const shareOptions = [
  { title: 'Twitter', icon: 'mdi-twitter', network: 'twitter' },
  { title: 'Mastodon', icon: 'mdi-mastodon', network: 'mastodon' },
  { title: 'Bluesky', icon: 'mdi-web', network: 'bluesky' },
  // 他のSNSオプションを追加できます
];

const shareOn = (network, ver) => {
  const urlObject = new URL(`${config.public.siteUrl}${route.fullPath}`)
  // const currentUrl = `${config.public.siteUrl}${route.fullPath.slice(0, -1)}#${key}`
  urlObject.hash = ''
  const currentUrl = `${urlObject.toString()}`
  const text = encodeURIComponent(`${ver}\n${props.title}\n`);
  const url = encodeURIComponent(currentUrl);
  
  let shareUrl;
  switch (network) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'mastodon':
      // マストドンの場合、ユーザーにインスタンスURLを入力してもらう必要があります
      const instance = prompt('マストドンのインスタンスURLを入力してください');
      if (instance) {
        shareUrl = `${instance}/share?text=${text} ${url}`;
      }
      break;
      case 'bluesky': // Blueskyの処理を追加
      shareUrl = `https://bsky.app/intent/compose?text=${text}%20${url}`;
      break;
    // 他のSNSの場合分けをここに追加
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=550,height=420');
  }
};

</script>
<template>
  <v-card
  variant="outlined"
  style="margin-top: 20px;"
  :id="`description`"
  >
    <v-list
    lines="two"
    >
      <v-list-item
        v-for="(ver, index) in description" :key="index"
      >
        <v-list-item-title>
          <h3>{{ appConfig.ver_eng2jpn[index] }}
          <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
            variant="plain"
            icon="mdi-share-variant"
            size="small"
            class="share-btn"
            v-bind="props"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in shareOptions"
              :key="index"
              @click="shareOn(item.network, ver)"
            >
              <v-list-item-title>
                <v-icon :icon="item.icon" size="small" class="mr-2" />
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </h3>
        </v-list-item-title>
        <v-list-item-subtitle class="wrap-text" style="color: #000;" v-if="ver !== ''"><p>{{ ver.jpn }}</p></v-list-item-subtitle>
        <v-list-item-subtitle class="wrap-text" style="color: #000;" v-else>じょうほう なし</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
