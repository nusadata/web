<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
          <p class="text-gray-500 font-semibold">2011-2018</p>
          <p class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Dengue</span> di Indonesia
          </p>
        </header>
        <p class="text-gray-500">
          Demam berdarah dengue adalah penyakit yang disebabkan oleh virus dengue yang bertransmisi ke manusia melalui vektor nyamuk (<a href="https://en.wikipedia.org/wiki/Aedes_aegypti" rel="nofollow noopener" class="underline">Aedes Aegypti</a>). Di Indonesia, demam berdarah dengue masih menjadi isu kesehatan yang penting di seluruh penjuru negeri. Oleh sebab itu, kemudahan akses informasi terkait penyakit ini dianggap perlu sebagai langkah awal untuk memperbaiki situasi.
        </p>
      </section>
      <DengueSummary locale="id"/>
      <DengueMap :year-range="yearRange" locale="id"/>
      <DengueTrendByNational locale="id"/>
      <DengueTrend locale="id"/>
    </main>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Id.vue'

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    DengueSummary: () => import('~/components/DengueSummary.vue'),
    DengueMap: () => import('~/components/DengueMap.vue'),
    DengueTrend: () => import('~/components/DengueTrend.vue'),
    DengueTrendByNational: () => import('~/components/DengueTrendByNational.vue'),
    Layout,
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
          this.url
        ),
        link: [
          {
            href: this.url, hreflang: 'id', rel: 'alternate'

          },
          {
            href: this.$page.metadata.siteUrl + '/dengue/',
            hreflang: 'en',
            rel: 'alternate'
          }
        ]
      }
    },
    title() {
      return `Demam Berdarah Dengue in Indonesia ${this.yearRange[this.yearRange.length - 1]}-${this.yearRange[0]} - Nusadata`
    },
    description() {
      return 'Di Indonesia, demam berdarah dengue masih menjadi isu kesehatan yang penting di seluruh penjuru negeri. Visualisasi data ini memberikan wawasan mengenai penyebaran penyakit ini di semua provinsi dan tren perkembangan kasusnya dari tahun ke tahun pada periode 2011-2018'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/dengue-di-indonesia/`
    }
  },
  data() {
    return {
      yearRange: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011]
    }
  }
}
</script>

<page-query>
  query {
    metadata {
      siteUrl
    }
  }
</page-query>
