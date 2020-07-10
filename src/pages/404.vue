<template>
  <Layout>
    <main class="max-w-6xl mx-auto relative">
      <section class="mt-5 py-10 mx-5">
        <h1 class="hidden" aria-hidden="true">
          {{ this.meta.title }}
        </h1>
        <p class="text-3xl leading-tight font-bold mb-5">404 <span class="text-blue-500">Not Found</span></p>
        <p class="text-gray-500 mb-8">
          The page that you are looking for is not existed. You can help yourself by clicking on one of these links below.
        </p>
      </section>
      <section class="px-5 mb-24">
        <ul class="flex flex-wrap -mx-5">
          <li v-for="item in items" class="w-full md:w-1/2 lg:w-1/3 mb-10">
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
import collections from '~/data/collections.json'

export default {
  metaInfo() {
    return this.meta
  },
  computed: {
    meta() {
      return {
        title: '404 Not Found - Nusadata',
        htmlAttrs: {
          lang: 'en',
          dir: 'ltr',
        }
      }
    },
    items() {
      return collections
    }
  }
}
</script>
