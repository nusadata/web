<template>
  <div>
    <header>
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center px-5">
          <g-link
            class="flex-none text-lg leading-none"
            to="/"
          >
            <span class="font-bold text-blue-500">Nusa</span>
            <span class="font-bold text-gray-200">data</span>
          </g-link>
          <div class="flex-1 flex justify-end text-right text-xs sm:text-sm">
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400 mr-5"
              to="/kalender-covid19/"
            >
              Kalender COVID-19
            </g-link>
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400"
              to="/koleksi/"
            >
              Koleksi
            </g-link>
          </div>
        </div>
        <div class="border-b-2 border-solid border-gray-800 h-1 mx-0 lg:mx-5" />
      </div>
    </header>
    <slot />
    <footer class="mb-5">
      <div class="max-w-6xl mx-auto">
        <p
          class="text-xs text-gray-500 px-5"
          lang="en"
        >
          Data bersumber dari
          <a
            class="underline"
            href="https://pusdatin.kemkes.go.id/folder/view/01/structure-publikasi-data-pusat-data-dan-informasi.html"
          >Pusat Data dan Informasi Kementerian Kesehatan Indonesia</a>
          dan
          <a
            class="underline"
            href="https://covid19.go.id"
          >covid19.go.id</a>
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
      },
      htmlAttrs: {
        class: 'antialiased'
      }
    }
  }
}
</script>
