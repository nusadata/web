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
      <CoronavirusSummary :daily="$page.allCoronavirus.edges[0].node.daily" />
      <CoronavirusTrendNewCases :daily="$page.allCoronavirus.edges[0].node.daily" />
      <CoronavirusTrendByProvince :daily="$page.byProvince.edges[0].node.list" :provinces="provinces"/>
      <CoronavirusTrend :daily="$page.allCoronavirus.edges[0].node.daily" />
    </main>
  </Layout>
</template>

<script>
import CoronavirusSummary from '~/components/CoronavirusSummary.vue'
import CoronavirusTrend from '~/components/CoronavirusTrend.vue'
import CoronavirusTrendByProvince from '~/components/CoronavirusTrendByProvince.vue'
import CoronavirusTrendNewCases from '~/components/CoronavirusTrendNewCases.vue'

const provinces = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
	"DKI Jakarta",
	"Jawa Barat",
  "Jawa Tengah",
  "Daerah Istimewa Yogyakarta",
  "Jawa Timur",
  "Banten",
	"Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
	"Kalimantan Barat",
  "Kalimantan Tengah",
	"Kalimantan Selatan",
	"Kalimantan Timur",
	"Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Barat",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Selatan",
	"Maluku",
	"Maluku Utara",
	"Papua",
	"Papua Barat",
]

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    CoronavirusSummary,
    CoronavirusTrend,
    CoronavirusTrendByProvince,
    CoronavirusTrendNewCases,
  },
  computed: {
    meta() {
      return {
        title: 'Coronavirus In Indonesia'
      }
    },
    provinces() {
      return provinces
    }
  }
}
</script>

<page-query>
  query {
    byProvince: allCoronavirusByProvince {
      edges {
        node {
          list {
            date
            total_cases: cur_total
            data {
              key
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
