<template>
  <div>
    <header>
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center px-5">
          <g-link class="flex-none text-lg leading-none" to="/">
            <span class="font-bold text-gray-200">Nusa</span>
            <span class="font-bold text-blue-500">data</span>
          </g-link>
          <div class="flex-1 flex justify-end text-right text-sm">
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400 mr-5"
              to="/collections/">
              Collections
            </g-link>
            <a
              class="py-5 text-gray-500 hover:text-gray-400"
              href="https://github.com/nusadata/web">
              Repository
            </a>
          </div>
        </div>
        <div class="border-b-2 border-solid border-gray-800 h-1 mx-0 lg:mx-5"/>
      </div>
    </header>
    <slot/>
    <footer class="mb-5">
      <div class="max-w-6xl mx-auto">
        <p class="text-xs text-gray-500 px-5">
          Data is sourced from
          <a class="underline" href="https://pusdatin.kemkes.go.id/folder/view/01/structure-publikasi-data-pusat-data-dan-informasi.html">Pusat Data dan Informasi Kementerian Kesehatan Indonesia</a>
          and
          <a class="underline" href="https://covid19.go.id">covid19.go.id</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      bodyAttrs: {
        class: 'font-sans bg-gray-900 text-gray-200'
      }
    }
  }
}
</script>
