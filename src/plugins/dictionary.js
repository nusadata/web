import dictionary from '~/dictionary'

export default {
  install(Vue) {
    Vue.prototype.$d = dictionary
  }
}
