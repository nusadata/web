<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
          <p class="text-gray-500 font-semibold">2011-2018</p>
          <p class="text-3xl font-bold">
            <span class="text-blue-500">Dengue Fever</span> in Indonesia
          </p>
        </header>
        <p class="text-gray-500">
        Dengue fever is a disease caused by the dengue virus which is transmitted to human via a vector mosquito (<a href="https://en.wikipedia.org/wiki/Aedes_aegypti" rel="nofollow noopener" class="underline">Aedes Aegypti</a>). In Indonesia, dengue fever still becomes a important public health issue all over the country. Therefore, making a high availability of information regarding this disease is deemed necessary as a starting point to improve the situation.
        </p>
      </section>
      <DengueMap :year-range="yearRange"/>
      <DengueTrend :year-range="yearRange"/>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return this.meta
  },
  components: {
    DengueMap: () => import('~/components/DengueMap.vue'),
    DengueTrend: () => import('~/components/DengueTrend.vue'),
  },
  computed: {
    meta() {
      return {
        title: `Dengue Fever in Indonesia ${this.yearRange[0]}-${this.yearRange[this.yearRange.length - 1]}`
      }
    }
  },
  data() {
    return {
      yearRange: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
    }
  }
}
</script>
