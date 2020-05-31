// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import ClientOnly from 'vue-client-only'
import DefaultLayout from '~/layouts/Default.vue'
import font from './font'

export default function (Vue, { router, head, isClient }) {
  Vue.prototype.$devMode = process.env.GRIDSOME_DEV_MODE === 'true'
  Vue.prototype.$isClient = isClient
  Vue.component('Layout', DefaultLayout)
  Vue.component('ClientOnly', ClientOnly)

  // HEAD manipulation
  head.style.push({
    cssText: font,
    type: 'text/css'
  })
}
