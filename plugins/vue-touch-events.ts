// plugins/vue-touch-events.ts
import Vue3TouchEvents, {
  type Vue3TouchEventsOptions,
} from "vue3-touch-events";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false
    // any other global options...
  });
});