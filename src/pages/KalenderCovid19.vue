<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 py-10 max-w-6xl mx-auto">
        <header class="mb-2">
          <h1 class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Kalender</span>
            COVID-19
          </h1>
        </header>
        <p class="text-gray-500">
          {{ description }}
        </p>
      </section>
      <section class="px-5 max-w-6xl mx-auto">
        <CoronavirusTrendInCalendar
          :daily="$page.allCoronavirus.edges[0].node.daily"
          locale="id"
        />
      </section>
    </main>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Id.vue'
import CoronavirusTrendInCalendar from '~/components/CoronavirusTrendInCalendar.vue'

export default {
  components: {
    CoronavirusTrendInCalendar,
    Layout,
  },
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
            href: this.url, hreflang: 'id', rel: 'alternate'

          },
          {
            href: this.$page.metadata.siteUrl + '/coronavirus-calendar/',
            hreflang: 'en',
            rel: 'alternate'
          }
        ]
      }
    },
    title() {
      return 'Kalender COVID-19 - Nusadata'
    },
    description() {
      return 'Halaman ini menyajikan visualisasi kalender mengenai aksi pemerintah dalam merespon situasi pandemi terhadap tren perkembangan kasus baru COVID-19 per hari secara aktual. Kami telah mengumpulkan banyak peristiwa penting, pengumuman publik, protokol dan regulasi dari berbagai macam media.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/kalender-covid19/`
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
