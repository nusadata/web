<template>
  <Layout>
    <main class="max-w-6xl mx-auto relative">
      <section class="mt-5 py-10 mx-5">
        <h1 class="hidden" aria-hidden="true">
          {{ meta.title }}
        </h1>
        <p
          class="text-2xl sm:text-3xl leading-tight font-bold mb-5 text-blue-500"
        >
          Koleksi <span class="text-gray-200">Visualisasi Data</span>
        </p>
        <p class="text-gray-500 mb-8">
          {{ description }}
        </p>
      </section>
      <section class="px-5 mb-24">
        <ul class="flex flex-wrap -mx-5">
          <li
            v-for="(item, idx) in items"
            :key="item.name + idx"
            class="w-full md:w-1/2 lg:w-1/3 mb-10"
          >
            <article class="mx-5">
              <header>
                <h3 class="text-lg mb-2 inline-block mr-2">
                  <g-link
                    :to="item.link"
                    class="hover:underline hover:text-blue-500"
                  >
                    {{ item.name }}
                  </g-link>
                </h3>
                <span
                  v-if="item.new"
                  class="font-semibold bg-blue-600 px-2 py-1 text-xs rounded inline-block leading-tight"
                >
                  Baru
                </span>
              </header>
              <p class="text-gray-500">
                {{ item.description }}
              </p>
            </article>
          </li>
        </ul>
      </section>
    </main>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Id.vue'
import collections from '~/data/koleksi.json'

export default {
  components: { Layout },
  metaInfo() {
    return this.meta
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
            href: this.url,
            hreflang: 'id',
            rel: 'alternate',
          },
          {
            href: this.$page.metadata.siteUrl + '/collections/',
            hreflang: 'en',
            rel: 'alternate',
          },
        ],
      }
    },
    title() {
      return 'Koleksi Visualisasi Data - Nusadata'
    },
    description() {
      return 'Kami sedang mengerjakan banyak hal, sehingga saat ini hanya ada beberapa visualisasi data yang tersedia. Kedepannya ada lebih banyak lagi visualisasi data yang akan ditambahkan.'
    },
    items() {
      return collections
    },
    url() {
      return `${this.$page.metadata.siteUrl}/koleksi/`
    },
  },
}
</script>

<page-query>
  query {
    metadata {
      siteUrl
    }
  }
</page-query>
