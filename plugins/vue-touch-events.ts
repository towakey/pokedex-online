// plugins/vue-touch-events.js
// import Vue3TouchEvents from 'vue-touch-events'

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(Vue3TouchEvents)
// })

// import Vue3TouchEvents, {
//   type Vue3TouchEventsOptions,
// } from "vue3-touch-events";

// app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
//   disableClick: false
//   // any other global options...
// })

import Vue3TouchEvents, {
  type Vue3TouchEventsOptions,
} from "vue3-touch-events";

app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
  disableClick: false
  // any other global options...
})