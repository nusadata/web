<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Aksi Pemerintah</span>
            Melawan Pandemi COVID-19
          </h1>
        </header>
        <p class="text-gray-500">
          {{ description }}
        </p>
      </section>
      <section class="px-5 lg:px-0 mb-24 max-w-4xl mx-auto">
        <div class="mb-6 whitespace-no-wrap overflow-x-auto">
          <button
            v-for="tagSelection in tagSelections"
            :key="tagSelection"
            :class="tagSelection === selectedTag ? 'bg-blue-800' : 'bg-gray-800'"
            class="text-sm px-2 py-1 rounded mr-2 mb-2"
            @click="selectTag(tagSelection)">
            {{ tagSelection }}
          </button>
        </div>
        <ul>
          <li v-for="event in filteredEvents" :key="event.date" class="mb-10 md:flex">
            <p class="text-xl md:text-2xl mb-2 text-blue-700 md:w-64 md:text-right pr-5 sticky top-0 bg-gray-900">
              {{ event.formatted_date }}
            </p>
            <ul class="flex-1">
              <li v-for="(source, sourceIdx) in event.sources" :key="sourceIdx" class="mb-4">
                <div>
                  <div class="mb-1">
                    <a
                      :href="source.url"
                      class="text-sm text-gray-500 underline"
                      target="__blank"
                      rel="nofollow noreferrer">
                      {{ source.name }}
                    </a>
                  </div>
                  <p class="md:mr-16">{{ source.content }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>
  </Layout>
</template>

<script>
import events from '~/data/kalender-covid19.json'
import Layout from '~/layouts/Id.vue'

export default {
  components: {
    Layout
  },
  data() {
    return {
      selectedTag: 'semua'
    }
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
      }
    },
    title() {
      return 'Aksi pemerintah melawan pandemi COVID-19 - Nusadata'
    },
    description() {
      return 'Selama pandemi COVID-19 ini pemerintah Indonesia telah mengeluarkan banyak regulasi untuk menekan penyebaran virus COVID-19 seperti pembatasan kegiatan publik, penerapan protokol kesehatan dan penyelenggaraan vaksinasi secara nasional. Pemerintah juga telah melaksanakan berbagai macam program untuk memulihkan perekonomian nasional yang terdampak pandemi. Kami mengumpulkan regulasi dan aksi pemerintah terkait COVID-19 dari berbagai macam sumber.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/aksi-pemerintah-melawan-covid19/`
    },
    filteredEvents() {
      if (this.selectedTag === 'semua') {
        return events
      }
      const result = []
      events.forEach(event => {
        const { date, formatted_date } = event
        const sources = []
        event.sources.forEach(source => {
          const { tags } = source
          if (tags && tags.includes(this.selectedTag)) {
            sources.push(source)
          }
        })
        if (sources.length > 0) {
          result.push({
            date,
            formatted_date,
            sources
          })
        }
      })
      return result
    },
    tagSelections() {
      return ['semua', 'protokol kesehatan', 'travelling', 'vaksin', 'ekonomi', 'pendidikan']
    }
  },
  methods: {
    selectTag(value) {
      this.selectedTag = value
    }
  }
}
</script>
