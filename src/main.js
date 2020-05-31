// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import font from './font'

export default function (Vue, { router, head, isClient }) {
  Vue.prototype.$isClient = isClient
  Vue.component('Layout', DefaultLayout)

  // HEAD manipulation
  head.style.push({
    cssText: font,
    type: 'text/css'
  })
}
