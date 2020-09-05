<template>
  <Layout>
    <main role="main">
      <section class="mt-5 px-5 lg:px-0 py-10 max-w-4xl mx-auto">
        <header class="mb-2">
          <h1 class="text-2xl sm:text-3xl font-bold">
            <span class="text-blue-500">Dasbor</span>
            COVID-19
          </h1>
        </header>
        <p class="text-gray-500">
          {{ description }}
        </p>
      </section>
      <aside class="text-gray-500 text-sm max-w-4xl mx-auto px-5 lg:px-0 mb-8">
        <p>Data terakhir diperbarui <time :datetime="updateTime.id">{{ updateTime.id }}</time></p>
      </aside>
      <CoronavirusSummary
        :daily="$page.allCoronavirus.edges[0].node.daily"
        :province-daily="$page.byProvince.edges[0].node.list"
        :provinces="provinces"
        locale="id"
      />
      <CoronavirusTrendNewCases
        :daily="$page.allCoronavirus.edges[0].node.daily"
        locale="id"
      />
      <CoronavirusTrendByProvince
        :daily="$page.byProvince.edges[0].node.list"
        :provinces="provinces"
        locale="id"
      />
      <CoronavirusTrendTable 
        :daily="$page.byProvince.edges[0].node.list" 
        :provinces="provinces" 
        locale="id"/>
      <CoronavirusMap
        :daily="$page.byProvince.edges[0].node.list"
        :provinces="provinces"
        locale="id"
      />
      <CoronavirusTrendAffectedCities locale="id" />
      <CoronavirusLabSummary locale="id" />
      <CoronavirusTrendTests locale="id" />
    </main>
  </Layout>
</template>

<script>
import CoronavirusMap from '~/components/CoronavirusMap.vue'
import CoronavirusSummary from '~/components/CoronavirusSummary.vue'
import CoronavirusLabSummary from '~/components/CoronavirusLabSummary.vue'
import CoronavirusTrendAffectedCities from '~/components/CoronavirusTrendAffectedCities.vue'
import CoronavirusTrendByProvince from '~/components/CoronavirusTrendByProvince.vue'
import CoronavirusTrendNewCases from '~/components/CoronavirusTrendNewCases.vue'
import CoronavirusTrendTable from '~/components/CoronavirusTrendTable.vue'
import CoronavirusTrendTests from '~/components/CoronavirusTrendTests.vue'
import Layout from '~/layouts/Id.vue'
import updateTime from '~/data/coronavirus-update-time.json'

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    CoronavirusMap,
    CoronavirusLabSummary,
    CoronavirusSummary,
    CoronavirusTrendAffectedCities,
    CoronavirusTrendByProvince,
    CoronavirusTrendNewCases,
    CoronavirusTrendTable,
    CoronavirusTrendTests,
    Layout,
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
            href: this.$page.metadata.siteUrl + '/coronavirus/',
            hreflang: 'en',
            rel: 'alternate'
          }
        ]
      }
    },
    provinces() {
      return provinces
    },
    title() {
      return 'Dasbor COVID-19 - Nusadata'
    },
    description() {
      return 'Indonesia adalah negara yang paling parah terdampak COVID-19 di Asia Tenggara. Halaman ini menyediakan visualisasi mengenai tren perkembangan harian kasus baru, persebaran kasus di seluruh provinsi dari hari pertama sampai sekarang dan sebagainya'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/dasbor-covid19/`
    },
    updateTime: () => updateTime,
  }
}

var provinces = {
  "ACEH": {
    slug: "special-region-of-aceh",
    name: "Aceh",
    population: 5281314,
  },
  "SUMATERA UTARA": {
    slug: "north-sumatera",
    name: "Sumatera Utara",
    population: 14415391,
  },
  "SUMATERA BARAT": {
    slug: "west-sumatera",
    name: "Sumatera Barat",
    population: 5382077,
  },
  "RIAU": {
    slug: "riau",
    name: "Riau",
    population: 6814909,
  },
  "JAMBI": {
    slug: "jambi",
    name: "Jambi",
    population: 3570272,
  },
  "SUMATERA SELATAN": {
    slug: "south-sumatera",
    name: "Sumatera Selatan",
    population: 8370320,
  },
  "BENGKULU": {
    slug: "bengkulu",
    name: "Bengkulu",
    population: 1963300,
  },
  "LAMPUNG": {
    slug: "lampung",
    name: "Lampung",
    population: 8370485,
  },
  "KEPULAUAN BANGKA BELITUNG": {
    slug: "bangka-belitung-islands",
    name: "Bangka Belitung",
    population: 1459873,
  },
  "KEPULAUAN RIAU": {
    slug: "riau-islands",
    name: "Kepulauan Riau",
    population: 2136521,
  },
	"DKI JAKARTA": {
    slug: "jakarta-special-capital-region",
    name: "DKI Jakarta",
    population: 10467629,
  },
	"JAWA BARAT": {
    slug: "west-java",
    name: "Jawa Barat",
    population: 48683861,
  },
  "JAWA TENGAH": {
    slug: "central-java",
    name: "Jawa Tengah",
    population: 34490835,
  },
  "DAERAH ISTIMEWA YOGYAKARTA": {
    slug: "special-region-of-yogyakarta",
    name: "Yogyakarta",
    population: 3802872,
  },
  "JAWA TIMUR": {
    slug: "east-java",
    name: "Jawa Timur",
    population: 39500851,
  },
  "BANTEN": {
    slug: "banten",
    name: "Banten",
    population: 12689736,
  },
	"BALI": {
    slug: "bali",
    name: "Bali",
    population: 4292154,
  },
  "NUSA TENGGARA BARAT": {
    slug: "west-nusa-tenggara",
    name: "Nusa Tenggara Barat",
    population: 5013687,
  },
  "NUSA TENGGARA TIMUR": {
    slug: "east-nusa-tenggara",
    name: "Nusa Tenggara Timur",
    population: 5371519,
  },
	"KALIMANTAN BARAT": {
    slug: "west-kalimantan",
    name: "Kalimantan Barat",
    population: 5001664,
  },
  "KALIMANTAN TENGAH": {
    slug: "central-kalimantan",
    name: "Kalimantan Tengah",
    population: 2660209,
  },
	"KALIMANTAN SELATAN": {
    slug: "south-kalimantan",
    name: "Kalimantan Selatan",
    population: 4182695,
  },
	"KALIMANTAN TIMUR": {
    slug: "east-kalimantan",
    name: "Kalimantan Timur",
    population: 3648835,
  },
	"KALIMANTAN UTARA": {
    slug: "north-kalimantan",
    name: "Kalimantan Utara",
    population: 716407,
  },
  "SULAWESI UTARA": {
    slug: "north-sulawesi",
    name: "Sulawesi Utara",
    population: 2484392,
  },
  "GORONTALO": {
    slug: "gorontalo",
    name: "Gorontalo",
    population: 1185492,
  },
  "SULAWESI BARAT": {
    slug: "west-sulawesi",
    name: "Sulawesi Barat",
    population: 1355554,
  },
  "SULAWESI TENGAH": {
    slug: "central-sulawesi",
    name: "Sulawesi Tengah",
    population: 3010443,
  },
  "SULAWESI TENGGARA": {
    slug: "southeast-sulawesi",
    name: "Sulawesi Tenggara",
    population: 2895213,
  },
  "SULAWESI SELATAN": {
    slug: "south-sulawesi",
    name: "Sulawesi Selatan",
    population: 8771970,
  },
	"MALUKU": {
    slug: "maluku",
    name: "Maluku",
    population: 1773776,
  },
	"MALUKU UTARA": {
    slug: "north-maluku",
    name: "Maluku Utara",
    population: 1232632,
  },
	"PAPUA": {
    slug: "special-region-of-papua",
    name: "Papua",
    population: 3322526,
  },
	"PAPUA BARAT": {
    slug: "special-region-of-west-papua",
    name: "Papua Barat",
    population: 937458,
  },
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
