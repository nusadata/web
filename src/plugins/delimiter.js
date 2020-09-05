export default {
  install(Vue) {
    Vue.prototype.$delimiter = delimiter
  }
};

export function delimiter(val) {
  const str = `${val}`; // convert to string
  const delimited = str
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${val < 0 ? '-' : ''}${delimited}`;
}
