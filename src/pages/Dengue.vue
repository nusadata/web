<template>
  <Layout>
    <main role="main">
      <div class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
        <p class="text-gray-500 font-semibold">2011-2018</p>
        <p class="text-3xl font-bold">
        <span class="text-blue-500">Dengue Fever</span> in Indonesia
        </p>
      </div>
      <DengueMap :year-range="yearRange"/>
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
