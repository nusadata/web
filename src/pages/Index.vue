<template>
  <Layout>
    <div class="max-w-6xl mx-auto relative">
      <section class="my-10 mx-5">
        <h1 class="hidden" aria-hidden="true">
          {{ this.meta.title }}
        </h1>
        <div class="flex items-center py-10">
          <div
            class="hero flex-1">
            <p class="text-sm font-semibold uppercase text-gray-600 tracking-wide mb-1">Coming soon</p>
            <p class="text-4xl leading-tight font-bold mb-5">Indonesia in <span class="text-blue-500">Data Visualization</span></p>
            <p class="text-gray-500 mb-8">
              Nusadata is a place to see various kinds of interesting data visualization and statistics about Indonesia. We want to help people to easily find information about Indonesia with a fast website and reliable source.
            </p>
            <g-link
              class="w-full sm:w-auto px-5 py-3 text-base md:text-lg text-center rounded inline-block bg-gray-800 hover:bg-gray-700 font-semibold shadow"
              to="/collections/">
              View collections ->
            </g-link>
          </div>
          <div class="flex-1 hidden md:block">
            <g-image src="~/indonesia-map.png" alt="Indonesian map" class="opacity-25" />
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return this.meta
  },
  computed: {
    meta() {
      return {
        title: this.title,
        meta: this.$generateMeta(
          this.title,
          this.$page.metadata.siteDescription,
          this.$page.metadata.siteUrl,
          this.$page.metadata.siteUrl
        )
      }
    },
    title() {
      return 'Nusadata - Indonesia in Data Visualization'
    }
  }
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
