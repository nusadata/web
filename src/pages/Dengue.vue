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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
