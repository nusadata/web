import dictionary from '~/dictionary'

function dateFormat(dateString) {
  const date = new Date(dateString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return date.toLocaleDateString('id', options)
}

export default {
  install(Vue) {
    Vue.prototype.$d = dictionary
    Vue.prototype.$date = dateFormat
  }
}
