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
        <p class="text-gray-500">
          Indonesia is the second of the worst affected country in Southeast Asia by covid-19. This page provides visualizations about the trend of daily new cases, the spread of diseases in all provinces from day one until today and many more.
        </p>
      </section>
      <CoronavirusSummary :daily="$page.allCoronavirus.edges[0].node.daily" :province-daily="$page.byProvince.edges[0].node.list" :provinces="provinces"/>
      <CoronavirusTrendNewCases :daily="$page.allCoronavirus.edges[0].node.daily" />
      <CoronavirusTrendByProvince :daily="$page.byProvince.edges[0].node.list" :provinces="provinces"/>
      <CoronavirusMap :daily="$page.byProvince.edges[0].node.list" :provinces="provinces"/>
      <CoronavirusTrend :daily="$page.allCoronavirus.edges[0].node.daily" />
    </main>
  </Layout>
</template>

<script>
import CoronavirusMap from '~/components/CoronavirusMap.vue'
import CoronavirusSummary from '~/components/CoronavirusSummary.vue'
import CoronavirusTrend from '~/components/CoronavirusTrend.vue'
import CoronavirusTrendByProvince from '~/components/CoronavirusTrendByProvince.vue'
import CoronavirusTrendNewCases from '~/components/CoronavirusTrendNewCases.vue'

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    CoronavirusMap,
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

var provinces = {
  "ACEH": {
    slug: "special-region-of-aceh",
    name: "Aceh"
  },
  "SUMATERA UTARA": {
    slug: "north-sumatera",
    name: "Sumatera Utara"
  },
  "SUMATERA BARAT": {
    slug: "west-sumatera",
    name: "Sumatera Barat",
  },
  "RIAU": {
    slug: "riau",
    name: "Riau",
  },
  "JAMBI": {
    slug: "jambi",
    name: "Jambi",
  },
  "SUMATERA SELATAN": {
    slug: "south-sumatera",
    name: "Sumatera Selatan",
  },
  "BENGKULU": {
    slug: "bengkulu",
    name: "Bengkulu",
  },
  "LAMPUNG": {
    slug: "lampung",
    name: "Lampung"
  },
  "KEPULAUAN BANGKA BELITUNG": {
    slug: "bangka-belitung-islands",
    name: "Bangka Belitung",
  },
  "KEPULAUAN RIAU": {
    slug: "riau-islands",
    name: "Kepulauan Riau",
  },
	"DKI JAKARTA": {
    slug: "jakarta-special-capital-region",
    name: "DKI Jakarta",
  },
	"JAWA BARAT": {
    slug: "west-java",
    name: "Jawa Barat",
  },
  "JAWA TENGAH": {
    slug: "central-java",
    name: "Jawa Tengah",
  },
  "DAERAH ISTIMEWA YOGYAKARTA": {
    slug: "special-region-of-yogyakarta",
    name: "Yogyakarta"
  },
  "JAWA TIMUR": {
    slug: "east-java",
    name: "Jawa Timur",
  },
  "BANTEN": {
    slug: "banten",
    name: "Banten",
  },
	"BALI": {
    slug: "bali",
    name: "Bali",
  },
  "NUSA TENGGARA BARAT": {
    slug: "west-nusa-tenggara",
    name: "Nusa Tenggara Barat",
  },
  "NUSA TENGGARA TIMUR": {
    slug: "east-nusa-tenggara",
    name: "Nusa Tenggara Timur",
  },
	"KALIMANTAN BARAT": {
    slug: "west-kalimantan",
    name: "Kalimantan Barat",
  },
  "KALIMANTAN TENGAH": {
    slug: "central-kalimantan",
    name: "Kalimantan Tengah",
  },
	"KALIMANTAN SELATAN": {
    slug: "south-kalimantan",
    name: "Kalimantan Selatan",
  },
	"KALIMANTAN TIMUR": {
    slug: "east-kalimantan",
    name: "Kalimantan Timur",
  },
	"KALIMANTAN UTARA": {
    slug: "north-kalimantan",
    name: "Kalimantan Utara",
  },
  "SULAWESI UTARA": {
    slug: "north-sulawesi",
    name: "Sulawesi Utara",
  },
  "GORONTALO": {
    slug: "gorontalo",
    name: "Gorontalo",
  },
  "SULAWESI BARAT": {
    slug: "west-sulawesi",
    name: "Sulawesi Barat",
  },
  "SULAWESI TENGAH": {
    slug: "central-sulawesi",
    name: "Sulawesi Tengah",
  },
  "SULAWESI TENGGARA": {
    slug: "southeast-sulawesi",
    name: "Sulawesi Tenggara",
  },
  "SULAWESI SELATAN": {
    slug: "south-sulawesi",
    name: "Sulawesi Selatan",
  },
	"MALUKU": {
    slug: "maluku",
    name: "Maluku",
  },
	"MALUKU UTARA": {
    slug: "north-maluku",
    name: "Maluku Utara",
  },
	"PAPUA": {
    slug: "special-region-of-papua",
    name: "Papua",
  },
	"PAPUA BARAT": {
    slug: "special-region-of-west-papua",
    name: "Papua Barat",
  },
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
