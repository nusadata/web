<template>
  <section :class="`${selectorPrefix} max-w-3xl mb-24 mx-auto overflow-x-hidden`">
    <header class="flex flex-wrap items-center">
      <div class="w-full lg:w-2/3">
        <h2
          id="table-recap-of-dengue-fever"
          class="font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4">
          Recap table for {{ this.currentYear }}
        </h2>
      </div>
      <div
        class="mb-5 lg:mb-0 flex-none w-full lg:w-1/3">
        <div class="mx-5 lg:mx-0 flex items-center justify-start lg:justify-center">
          <select v-model.number="currentYear" class="text-gray-800">
            <option v-for="year in yearRange" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <th class="uppercase font-normal text-sm text-gray-500">Province</th>
          <th class="uppercase font-normal text-sm text-gray-500">Total Cases</th>
          <th class="uppercase font-normal text-sm text-gray-500">Total Deaths</th>
          <th class="uppercase font-normal text-sm text-gray-500">Incident Rate</th>
          <th class="uppercase font-normal text-sm text-gray-500 ">Fatality rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, id) in response" :key="id">
          <td>{{ item.total_cases }}</td>
          <td>{{ item.total_deaths }}</td>
          <td>{{ item.incident_rate }}</td>
          <td>{{ item.fatality_rate }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{{ totalCasesInYear }}</td>
          <td>{{ totalDeathsInYear }}</td>
          <td colspan="2"></td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    yearRange: {
      type: Array,
      default: () => []
    },
    selectorPrefix: {
      type: String,
      default: 'tbdv'
    }
  },
  computed: {
    totalCasesInYear() {
      return this.response.reduce((acc, item) => acc + +item.total_cases, 0)
    },
    totalDeathsInYear() {
      return this.response.reduce((acc, item) => acc + +item.total_deaths, 0)
    }
  },
  data() {
    return {
      currentYear: this.yearRange[0],
      response: []
    }
  },
  async mounted() {
    this.response = await this.fetchResources()
  },
  watch: {
    async currentYear() {
      this.response = await this.fetchResources()
    }
  },
  methods: {
    getResourceUrl(url) {
      return this.$devMode ? url : this.$url(url)
    },
    async fetchResources() {
      const csvUrl = this.getResourceUrl(`/dengue-indonesia-${this.currentYear}.csv`)
      const response  = await fetch(csvUrl)
      return this.$d3.csvParse(await response.text())
    },
  }
}
</script>
