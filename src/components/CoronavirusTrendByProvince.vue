<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header class="flex flex-wrap items-center">
      <div class="w-full lg:w-2/3">
        <h2
          id="trend-of-coronavirus-by-province"
          class="font-semibold text-2xl mx-5 lg:mx-0 my-4">
          Trend of new cases by province
        </h2>
      </div>
      <div
        class="mb-5 lg:mb-0 flex-none flex items-center justify-start lg:justify-end w-full lg:w-1/3">
        <div class="mx-5 lg:mx-0">
          <select v-model="currentProvince" class="text-gray-800 mr-5">
            <option
              v-for="(province, key) in provinces"
              :key="`province-${province.slug}`"
              :value="key">
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl max-w-3xl"/>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'cnpvs'
    },
    daily: {
      type: Array,
      required: true
    },
    provinces: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentProvince: 'DKI JAKARTA',
    }
  },
  mounted() {
    this.render()
  },
  watch: {
    currentProvince() {
      this.render()
    }
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    render() {
      const confirmed = this.daily

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

      const linearGradientId = this.createLinearGradient(svg, 'linear-gradient', '#2c5282', '#1a202c')

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.date)))
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([0, 400])
        .range([400, 0])

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(400)
          .y1(d => y(d.data.filter(l => l.key === this.currentProvince)[0].cases))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.data.filter(l => l.key === this.currentProvince)[0].cases))
          .curve(this.$d3.curveMonotoneX))

      svg.append('g')
        .attr('transform', `translate(0, 400)`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      svg.append('g')
        .style('font', '1rem Manrope')
        .call(this.$d3.axisLeft(y).ticks(5))
    },
    createLinearGradient(svg, id, firstColor, secondColor) {
      const linearGradientId = this.getId(id)
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
        .attr('stop-color', firstColor)
        .attr('stop-opacity', 1)

      linearGradient.append('stop')
        .attr('class', 'end')
        .attr('offset', '100%')
        .attr('stop-color', secondColor)
        .attr('stop-opacity', 1)

      return linearGradientId
    },
    renderLegend(svg) {
      const fillColor = '#edf2f7'
      const legendWrapper = svg
        .append('g')
        .attr('class', 'legend-wrapper')
        .style('transform', 'translate(20px, 0)')

      legendWrapper.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', '#3182ce')

      legendWrapper.append('text')
        .attr('x', 15 + 10)
        .attr('y', 13)
        .style('fill', fillColor)
        .text('total cases')

      legendWrapper.append('rect')
        .attr('x', 0)
        .attr('y', 15 + 10)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', '#319795')

      legendWrapper.append('text')
        .attr('x', 15 + 10)
        .attr('y', 25 + 13)
        .style('fill', fillColor)
        .text('recovered')

      legendWrapper.append('rect')
        .attr('x', 0)
        .attr('y', 15 + 15 + 10 + 10)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', '#dd6b20')

      legendWrapper.append('text')
        .attr('x', 15 + 10)
        .attr('y', 25 + 25 + 13)
        .style('fill', fillColor)
        .text('deaths')
    }

  }
}
</script>

<style>
.cnpvs .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.cnpvs .line-inv {
  fill: none;
  stroke: #dd6b20;
  stroke-width: 2;
}
.cnpvs .line-suc {
  fill: none;
  stroke: #319795;
  stroke-width: 2;
}
.cnpvs .circle {
  opacity: 0;
  fill: #63b3ed;
  stroke: none;
}
.cnpvs .circle:hover {
  opacity: 1;
}
</style>
