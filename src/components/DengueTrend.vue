<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header class="flex flex-wrap items-center">
      <div class="w-full lg:w-1/2">
        <h2
          id="trend-of-dengue-fever"
          class="font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4"
        >
          {{ $d[locale][`trend_of_${currentType}_by_province`] }}
        </h2>
        <p class="mx-5 lg:mx-0 mb-5 text-gray-500">
          {{ descriptions[locale][`province_trend_${currentType}`] }}
        </p>
      </div>
      <div class="mb-5 lg:mb-0 flex-none flex items-center justify-start lg:justify-end w-full lg:w-1/2">
        <div class="mx-5 lg:mx-0">
          <select
            v-model="currentProvince"
            class="text-gray-800 mr-5"
          >
            <option
              v-for="(province, key) in provinces"
              :key="`province-${key}`"
              :value="key"
            >
              {{ province.name }}
            </option>
          </select>

          <select
            v-model="currentType"
            class="text-gray-800"
          >
            <option
              v-for="type in types"
              :key="`type-${type}`"
              :value="type"
            >
              {{ $d[locale][type] }}
            </option>
          </select>
        </div>
      </div>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl max-w-3xl" />
    </div>
  </section>
</template>

<script>
import {delimiter} from '~/plugins/delimiter'
import descriptions from '~/data/dengue.json'
import provinces from '~/data/provinces.json'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'tdv'
    },
    locale: {
      type: String,
      default: 'id',
    }
  },
  data() {
    return {
      types: ['total_cases', 'total_deaths', 'fatality_rate'],
      provinces: provinces,
      currentType: 'total_cases',
      currentProvince: 'jakarta-special-capital-region',
      currentProvinceName: provinces['jakarta-special-capital-region'].name,
      descriptions,
    }
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
  mounted() {
    this.render(this.currentProvince, this.currentType)
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
    getMaxValueFromType(provinces, type) {
      let values = []
      Object.keys(provinces).forEach(slug => {
        const valuesFromType = provinces[slug].map(d => +d[type])
        values = values.concat(valuesFromType)
      })
      return this.$d3.max(values)
    },
    async fetchResource() {
      const csvUrl = this.getResourceUrl('/dengue-indonesia-by-province-2011-2018.json')
      let response = await fetch(csvUrl)
      return await response.json()
    },
    async render(province, type) {
      const dataProvinces = await this.fetchResource()
      const data = dataProvinces[province]

      const selector = this.getSelector('.content')
      this.$d3.select(selector)
        .selectAll('*')
        .remove()

      const svg = this.$d3.select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 900 500`)
        .append('g')
        .attr('transform', `translate(100, 50)`)

      const linearGradientId = this.getId('linear-gradient')
      const linearGradient = svg.append('defs')
        .attr('class', 'linear-gradient-wrapper')
        .append('linearGradient')
        .attr('id', linearGradientId)
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%')

      linearGradient.append('stop')
        .attr('class', 'start')
        .attr('offset', '0%')
        .attr('stop-color', '#2c5282')
        .attr('stop-opacity', 1)

      linearGradient.append('stop')
        .attr('class', 'end')
        .attr('offset', '100%')
        .attr('stop-color', '#1a202c')
        .attr('stop-opacity', 1)

      const x = this.$d3.scalePoint()
        .domain(data.map(d => +d.year).reverse())
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([0, this.getMaxValueFromType(dataProvinces, type)]) // need to be adjustable
        .range([400, 0])

      svg.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientId})`)
        .attr('d', this.$d3.area()
          .x(d => x(+d.year))
          .y0(400)
          .y1(d => y(+d[type]))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', this.$d3.line()
          .x(d => x(+d.year))
          .y(d => y(+d[type]))
          .curve(this.$d3.curveMonotoneX))

      svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', d => x(+d.year))
        .attr('cy', d => y(+d[type]))
        .attr('r', 5)

      svg.selectAll('circle-pad')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle-pad')
        .attr('data-tooltip', d => d[type])
        .attr('cx', d => x(+d.year))
        .attr('cy', d => y(+d[type]))
        .attr('r', 12)

      svg.append('g')
        .attr('transform', `translate(0, 400)`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x))

      svg.append('g')
        .style('font', '1rem Manrope')
        .call(this.$d3.axisLeft(y).ticks(5))

      // svg.selectAll('.bar')
      //   .data(data)
      //   .enter()
      //   .append('rect')
      //   .attr('class', 'bar')
      //   .attr('data-tooltip', d => d[type])
      //   .attr('x', d => x(+d.year))
      //   .attr('y', d => y(+d[type]))
      //   .attr('width', x.bandwidth())
      //   .attr('height', d => 400 - y(+d[type]))

      this.$tippy(this.getSelector('.circle-pad'), {
        content(ref) {
          return delimiter(ref.getAttribute('data-tooltip'))
        }
      })

    }
  }
}
</script>

<style>
.tdv .bar {
  fill: #2c5282;
}
.tdv .bar:hover {
  fill: #3182ce;
}
.tdv .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.tdv .circle {
  fill: #63b3ed;
  stroke: none;
}
.tdv .circle-pad {
  fill: #63b3ed;
  fill-opacity: 0;
  stroke: none;
}
</style>
