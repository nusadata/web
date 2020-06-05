<template>
  <Layout>
    <main class="max-w-6xl mx-auto relative">
      <section class="my-10">
        <h1 class="hidden" aria-hidden="true">
          {{ this.meta.title }}
        </h1>
        <div
          class="mx-5">
          <p class="text-4xl leading-tight font-bold mb-5">Collection of <span class="text-blue-500">Data Visualization</span></p>
          <p class="text-gray-500 mb-8">
            We are still working on a lot of stuffs, so for now there are still few data visualizations here. Many new data visualizations will be added soon.
          </p>
        </div>
      </section>
      <section class="px-5 mb-24">
        <ul class="flex flex-wrap -mx-5">
          <li v-for="item in items" class="w-full md:w-1/2 lg:w-1/3">
            <article class="mx-5">
              <h3 class="text-lg mb-2">
                <g-link :to="item.link" class="hover:underline hover:text-blue-500">{{ item.name }}</g-link>
              </h3>
              <p class="text-gray-500">{{ item.description }}</p>
            </article>
          </li>
        </ul>
      </section>
    </main>
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
        title: 'Collection of data visualizations - Nusadata'
      }
    },
    items() {
      return [
        {
          name: 'Dengue fever in Indonesia',
          description: 'In Indonesia, dengue fever still becomes an important public health issue all over the country. This data visualization provides insights about the spread of the disease in all provinces and the trend of the cases in 2011-2018.',
          link: '/dengue/'
        },
        {
          name: 'Coronavirus in Indonesia',
          description: 'Indonesia is the second of the worst affected country in Southeast Asia by covid-19. This page provides visualizations about the trend of daily new cases, the spread of diseases in all provinces from day one until today and many more.',
          link: '/coronavirus/'
        }
      ]
    }
  }
}
</script>

