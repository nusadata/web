<template>
  <Layout>
  <main class="max-w-6xl mx-auto relative">
  <section class="mt-5 py-10 mx-5">
    <h1 class="hidden" aria-hidden="true">
      {{ this.meta.title }}
    </h1>
    <p class="text-3xl leading-tight font-bold mb-5">Collections of <span class="text-blue-500">Data Visualization</span></p>
    <p class="text-gray-500 mb-8">
      {{ this.description }}
    </p>
  </section>
  <section class="px-5 mb-24">
    <ul class="flex flex-wrap -mx-5">
      <li v-for="item in items" class="w-full md:w-1/2 lg:w-1/3 mb-10">
        <article class="mx-5">
          <header>
            <h3 class="text-lg mb-2 inline-block mr-2">
              <g-link :to="item.link" class="hover:underline hover:text-blue-500">{{ item.name }}</g-link>
            </h3>
            <span
              v-if="item.new"
              class="font-semibold bg-blue-600 px-2 py-1 text-xs rounded inline-block leading-tight">
              New
            </span>
          </header>
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
        title: this.title,
        meta: this.$generateMeta(
          this.title,
          this.description,
          this.$page.metadata.siteUrl,
          this.url,
        ),
      }
    },
    title() {
      return 'Collections of data visualization - Nusadata'
    },
    description() {
      return 'We are still working on a lot of stuffs, so for now there are still few data visualizations here. Many new data visualizations will be added soon.'
    },
    items() {
      return this.$page.allCollections.edges[0].node.items
    },
    url() {
      return `${this.$page.metadata.siteUrl}/collections/`;
    }
  }
}
</script>

<page-query>
  query {
    metadata {
      siteUrl
    }
    allCollections {
      edges {
        node {
          items {
            name
            description
            link
            new
          }
        }
      }
    }
  }
</page-query>
