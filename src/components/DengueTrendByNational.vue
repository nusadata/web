<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header class="flex flex-wrap items-center">
      <div class="w-full lg:w-2/3">
        <h2
          id="trend-of-dengue-fever"
          class="font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4">
          National trend of {{ legendText }}
        </h2>
        <p class="mx-5 lg:mx-0 mb-5 text-gray-500">
          <template v-if="currentType === 'total_cases'">
            In 2016, Indonesia saw a record breaking number with a total of more than 200.000 cases. However in the following year, the figure immediately fall into the smallest record in the period.
          </template>
          <template v-if="currentType === 'total_deaths'">
            The total deaths figure has a similar pattern with the total cases trend. The death toll saw the highest record with over 1500 cases which also happened in 2016.
          </template>
        </p>
      </div>
      <div
        class="mb-5 md:mb-0 flex-none w-full lg:w-1/3">
        <div class="mx-5 lg:mx-0 flex items-center justify-start lg:justify-center">
          <select v-model="currentType" class="text-gray-800">
            <option
              v-for="type in types"
              :key="`type-${type}`"
              :value="type">
              {{ type.replace('_', ' ') }}
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
import data from '~/data/dengue-national.json'
import provinces from '~/data/provinces.json'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'tndv'
    }
  },
  computed: {
    legendText() {
      const texts = {
        total_cases: 'total cases',
        total_deaths: 'total deaths',
        incident_rate: 'incident rate',
        fatality_rate: 'fatality rate (%)',
      }
      return texts[this.currentType]
    }
  },
  data() {
    return {
      types: ['total_cases', 'total_deaths'],
      provinces,
      currentType: 'total_cases'
    }
  },
  mounted() {
    this.render(this.currentType)
  },
  watch: {
    currentType(type) {
      this.render(type)
    }
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    getMaxValueFromType(type) {
      let values = data.map(d => d[type])
      return this.$d3.max(values)
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
    render(type) {
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

      const x = this.$d3.scalePoint()
        .domain(data.map(d => +d.year))
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([0, this.getMaxValueFromType(type)])
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

      this.$tippy(this.getSelector('.circle-pad'), {
        content(ref) {
          return ref.getAttribute('data-tooltip')
        }
      })

    }
  }
}
</script>

<style>
.tndv .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.tndv .circle {
  fill: #63b3ed;
  stroke: none;
}
.tndv .circle-pad {
  fill: #63b3ed;
  fill-opacity: 0;
  stroke: none;
}
</style>
