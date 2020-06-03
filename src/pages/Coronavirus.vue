<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <p class="text-3xl font-bold">
            <span class="text-blue-500">Coronavirus</span>
            in Indonesia
          </p>
        </header>
        <p v-if="false" class="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </section>
      <CoronavirusSummary/>
      <CoronavirusTrendNewCases/>
      <CoronavirusTrend/>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return this.meta
  },
  components: {
    CoronavirusSummary: () => import('~/components/CoronavirusSummary.vue'),
    CoronavirusTrend: () => import('~/components/CoronavirusTrend'),
    CoronavirusTrendNewCases: () => import('~/components/CoronavirusTrendNewCases'),
  },
  computed: {
    meta() {
      return {
        title: 'Coronavirus In Indonesia'
      }
    }
  }
}
</script>
