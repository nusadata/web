<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Coronavirus</span>
            in Calendar
          </h1>
        </header>
        <p class="text-gray-500">
          {{ description }}
        </p>
      </section>
      <section class="px-5 max-w-6xl mx-auto">
        <CoronavirusTrendInCalendar :daily="$page.allCoronavirus.edges[0].node.daily"/>
      </section>
    </main>
  </Layout>
</template>

<script>
import CoronavirusTrendInCalendar from '~/components/CoronavirusTrendInCalendar.vue'

export default {
  components: {
    CoronavirusTrendInCalendar
  },
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
          this.url
        )
      }
    },
    title() {
      return 'Coronavirus Calendar - Nusadata'
    },
    description() {
      return 'The page provides calendar visualization regarding the government actions in response to the pandemic situation against the actual trend of new COVID-19 cases per day. We have gathered many important events, public announcements, protocols and regulations from various reliable media outlets.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/coronavirus-calendar/`
    }
  }
}

</script>

<page-query>
  query {
    metadata {
      siteUrl
    }
    byProvince: allCoronavirusByProvince {
      edges {
        node {
          list {
            date
            total_cases: cur_total
            data {
              key
              total_cases: doc_count
              cases: cur_doc_count
            }
          }
        }
      }
    }
    allCoronavirus {
      edges {
        node {
          new {
            jumlah_positif
            jumlah_meninggal
            jumlah_sembuh
            jumlah_dirawat
            created
          }
          daily {
            key
            jumlah_positif {
              value
            }
            jumlah_meninggal {
              value
            }
            jumlah_sembuh {
              value
            }
            jumlah_dirawat {
              value
            }
            jumlah_positif_kum {
              value
            }
            jumlah_meninggal_kum {
              value
            }
            jumlah_sembuh_kum {
              value
            }
            jumlah_dirawat_kum {
              value
            }
          }
          total {
            jumlah_positif
            jumlah_dirawat
            jumlah_sembuh
            jumlah_meninggal
          }
        }
      }
    }
  }
</page-query>
