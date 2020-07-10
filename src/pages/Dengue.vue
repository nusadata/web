<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
          <p class="text-gray-500 font-semibold">2011-2018</p>
          <p class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Dengue Fever</span> in Indonesia
          </p>
        </header>
        <p class="text-gray-500">
        Dengue fever is a disease caused by the dengue virus which is transmitted to human via a vector mosquito (<a href="https://en.wikipedia.org/wiki/Aedes_aegypti" rel="nofollow noopener" class="underline">Aedes Aegypti</a>). In Indonesia, dengue fever still becomes an important public health issue all over the country. Therefore, making a high availability of information regarding this disease is deemed necessary as a starting point to improve the situation.
        </p>
      </section>
      <DengueSummary/>
      <DengueMap :year-range="yearRange"/>
      <DengueTrendByNational/>
      <DengueTrend/>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return this.meta
  },
  components: {
    DengueSummary: () => import('~/components/DengueSummary.vue'),
    DengueMap: () => import('~/components/DengueMap.vue'),
    DengueTrend: () => import('~/components/DengueTrend.vue'),
    DengueTrendByNational: () => import('~/components/DengueTrendByNational.vue')
  },
  computed: {
    meta() {
      return {
        title: this.title,
        htmlAttrs: {
          lang: 'en',
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
            href: this.url, hreflang: 'en', rel: 'alternate'

          },
          {
            href: this.$page.metadata.siteUrl + '/dengue-di-indonesia/',
            hreflang: 'id',
            rel: 'alternate'
          }
        ]
      }
    },
    title() {
      return `Dengue Fever in Indonesia ${this.yearRange[this.yearRange.length - 1]}-${this.yearRange[0]} - Nusadata`
    },
    description() {
      return 'In Indonesia, dengue fever still becomes an important public health issue all over the country. This data visualization provides insights about the spread of the disease in all provinces and the trend of the cases in 2011-2018.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/dengue/`
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
