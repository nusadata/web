<template>
  <Layout>
    <main role="main">
      <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
      <DengueMap/>
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
        title: 'Cases of Dengue Fever in Indonesia (2011-2018) - Nusadata'
      }
    }
  }
}
</script>
