<template>
  <Layout>
    <div class="max-w-6xl mx-auto relative">
      <section class="my-10 mx-5">
        <h1 class="hidden" aria-hidden="true">
          {{ meta.title }}
        </h1>
        <div class="flex items-center py-10">
          <div class="hero flex-1">
            <p class="text-4xl leading-tight font-bold text-blue-500 mb-5">
              Visualisasi Data <span class="text-gray-200">Indonesia</span>
            </p>
            <p class="text-gray-500 mb-8">
              {{ description }}
            </p>
            <div class="flex flex-wrap">
              <g-link
                class="w-full sm:w-auto px-5 py-3 mb-5 sm:mb-0 mr-0 sm:mr-5 text-base md:text-lg text-center text-gray-800 rounded inline-block bg-gray-400 hover:bg-gray-300 font-semibold shadow"
                to="/kalender-covid19/"
              >
                Lihat kalender COVID-19
              </g-link>
              <g-link
                class="w-full sm:w-auto px-5 py-3 mb-5 sm:mb-0 text-base md:text-lg text-center rounded inline-block bg-gray-800 hover:bg-gray-700 font-semibold shadow"
                to="/koleksi/"
              >
                Lihat koleksi ->
              </g-link>
            </div>
          </div>
          <div class="flex-1 hidden md:block">
            <g-image
              src="~/images/indonesia-map.png"
              alt="Indonesian map"
              class="opacity-25"
            />
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Id.vue'

export default {
  components: { Layout },
  metaInfo() {
    return this.meta
  },
  computed: {
    meta() {
      return {
        title: this.title,
        htmlAttrs: {
          lang: 'id',
          dir: 'ltr',
        },
        meta: this.$generateMeta(
          this.title,
          this.description,
          this.$page.metadata.siteUrl,
          this.$page.metadata.siteUrl
        ),
      }
    },
    description() {
      return this.$page.metadata.siteDescription
    },
    title() {
      return 'Nusadata - Visualisasi Data Indonesia'
    },
  },
}
</script>

<page-query>
  query {
    metadata {
      siteUrl
      siteDescription
    }
  }
</page-query>
