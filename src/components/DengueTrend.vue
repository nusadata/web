<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header class="flex flex-wrap items-center">
      <h2
        id="trend-of-dengue-fever"
        class="font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4 w-full md:w-1/2">
        Trend of {{ currentType.replace('_', ' ') }} by province
      </h2>
      <div
        class="mx-5 lg:mx-0 mb-5 md:mb-0 flex-none flex items-center justify-start md:justify-end w-full md:w-1/2">
        <select v-model="currentProvince" class="text-gray-800 mr-5">
          <option
            v-for="(province, key) in provinces"
            :key="`province-${key}`"
            :value="key">
            {{ province.name }}
          </option>
        </select>

        <select v-model="currentType" class="text-gray-800">
          <option
            v-for="type in types"
            :key="`type-${type}`"
            :value="type">
            {{ type.replace('_', ' ') }}
          </option>
        </select>
      </div>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl"/>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3'
import tippy, {followCursor} from 'tippy.js'
import provinces from '~/provinces'
import 'tippy.js/dist/tippy.css'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'tdv'
    },
    yearRange: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      types: ['total_cases', 'total_deaths', 'incident_rate', 'fatality_rate'],
      provinces: provinces,
      currentType: 'total_cases',
      currentProvince: 'jakarta-special-capital-region',
      currentProvinceName: provinces['jakarta-special-capital-region'].name,
    }
  },
  mounted() {
    this.render(this.currentProvince, this.currentType)
  },
  watch: {
    currentType(type) {
      this.render(this.currentProvince, type)
    },
    currentProvince(province) {
      this.render(province, this.currentType)
      this.currentProvinceName = provinces[province].name
    }
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    getResourceUrl(url) {
      return this.$devMode ? url : this.$url(url)
    },
    async fetchResource() {
      const csvUrl = this.getResourceUrl('/dengue-indonesia-by-province-2011-2018.json')
      let response = await fetch(csvUrl)
      return await response.json()
    },
    async render(province, type) {
      let data = await this.fetchResource()
      data = data[province]

      const selector = this.getSelector('.content')
      d3.select(selector)
        .selectAll('*')
        .remove()

      const svg = d3.select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 900 500`)
        .append('g')
        .attr('transform', `translate(100, 50)`)

      const x = d3.scaleBand()
        .domain(data.map(d => +d.year).reverse())
        .range([0, 700])
        .padding(0.5)

      svg.append('g')
        .attr('transform', `translate(0, 400)`)
        .style('font', '1rem Manrope')
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => +d[type])])
        .range([400, 0])

      svg.append('g')
        .style('font', '1rem Manrope')
        .call(d3.axisLeft(y).ticks(5))

      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-tooltip', d => d[type])
        .attr('x', d => x(+d.year))
        .attr('y', d => y(+d[type]))
        .attr('width', x.bandwidth())
        .attr('height', d => 400 - y(+d[type]))

      tippy(this.getSelector('.bar'), {
        followCursor: true,
        plugins: [followCursor],
        content(ref) {
          return ref.getAttribute('data-tooltip')
        }
      })

    }
  }
}
</script>

<style>
.bar {
  fill: #2c5282;
}
.bar:hover {
  fill: #3182ce;
}
</style>
