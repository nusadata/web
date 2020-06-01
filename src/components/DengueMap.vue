<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-20 mx-auto overflow-x-hidden`">
    <div class="flex flex-wrap items-center">
      <h2
        id="map-of-dengue-fever"
        class="font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4 w-full md:w-1/2">
        Map of {{ currentType.replace('_', ' ') }} in {{ currentYear }}
      </h2>
      <div
        class="mx-5 lg:mx-0 mb-5 md:mb-0 flex-none flex items-center justify-start md:justify-end w-full md:w-1/2">
        <select v-model.number="currentYear" class="text-gray-800 mr-4">
          <option
            v-for="year in yearRange"
            :key="`year-${year}`"
            :value="year">
            {{ year }}
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
    </div>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl"/>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3'
import tippy, {followCursor} from 'tippy.js'
import 'tippy.js/dist/tippy.css'

const projection = d3.geoEquirectangular()
  .scale(1000)
  .translate([-1650, 120])

const geoGenerator = d3.geoPath()
  .projection(projection)

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'mdv'
    },
    yearRange: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    colorRange() {
      const range = {
        total_cases: [0, 10000],
        total_deaths: [0, 200],
        incident_rate: [0, 200],
        fatality_rate: [0, 8.75]
      }
      return range[this.currentType]
    },
    stopRange() {
      const range = {
        total_cases: [0, 1500, 3000, 4500, 6000, 7500, 9000, 10000],
        total_deaths: [0, 25, 50, 75, 100, 125, 150, 200],
        incident_rate: [0, 25, 50, 75, 100, 125, 150, 200],
        fatality_rate: [0, 1.25, 2.5, 3.75, 5, 6.25, 7.5, 8.75]
      }
      return range[this.currentType]
    },
    legendText() {
      const texts = {
        total_cases: 'Number of total cases',
        total_deaths: 'Number of total deaths',
        incident_rate: 'Number of incident rate',
        fatality_rate: 'Number of fatality rate'
      }
      return texts[this.currentType]
    }
  },
  data() {
    return {
      types: ['total_cases', 'total_deaths', 'incident_rate', 'fatality_rate'],
      currentType: 'total_cases',
      currentYear: 2018
    }
  },
  mounted() {
    this.currentYear = this.yearRange[this.yearRange.length - 1]

		this.fetchResources()
      .then(async ([geojson, data]) => {
				const map = await this.transformToMap(data, this.currentType)
				this.renderLegend(this.render(await geojson.json(), map, geoGenerator))
				tippy(this.getSelector('.province'), {
					followCursor: true,
          plugins: [followCursor],
					content(ref) {
						return ref.getAttribute('data-tooltip')
					}
				})
			})
  },
  watch: {
    currentYear(year) {
      this.rerender(year, this.currentType)
    },
    currentType(type) {
      this.rerender(this.currentYear, type)
      this.rerenderLegend(this.currentYear, type)
    },
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    render(geojson, data, generator) {
      const strokeColor = '#22292f'
      const strokeHoverColor = 'black'

      const svg = d3.select(this.getSelector('.content'))
        .append('svg')
        .attr('viewBox', [0, 0, 800, 400])

			svg.append('g')
				.selectAll('path')
				.data(geojson.features)
				.join('path')
				.attr('fill', d => this.color(data.get(d.properties.slug)))
				.attr('data-name', d => d.properties.state)
				.attr('data-tooltip', d => `${d.properties.state} ${data.get(d.properties.slug)}`)
				.attr('stroke', strokeColor)
				.attr('stroke-linejoin', 'round')
				.attr('d', generator)
				.attr('id', d => this.getId(d.properties.slug))
				.attr('class', 'province')
				.on('mouseover', function () {
					svg.selectAll('.province').transition().style('opacity', 0.5).attr('stroke', strokeColor)
					d3.select(this).transition().style('opacity', 1).attr('stroke', strokeHoverColor)
				})
				.on('mouseleave', function () {
					svg.selectAll('.province').transition().style('opacity', 1).attr('stroke', strokeColor)
				})

			return svg
    },
		renderLegend(svg) {
      const linearGradientId = this.getId('linear-gradient')
			const linearGradient = svg.append('defs')
        .attr('class', 'linear-gradient-wrapper')
				.append('linearGradient')
				.attr('id', linearGradientId)
				.attr('x1', '0%')
				.attr('y1', '0%')
				.attr('x2', '100%')
				.attr('y2', '0%')

			const stops = this.stopRange;

			linearGradient.selectAll('stop')
				.data(stops)
				.join('stop')
				.attr('offset', (d, index) => `${Math.floor((index + 1) / stops.length * 100)}%`)
				.attr('stop-color', d => this.color(d))

			const legendWrapper = svg
        .append('g')
        .attr('class', 'legend-wrapper')
				.style('transform', 'translate(calc(50% - 150px), 375px)')

			legendWrapper.append('rect')
				.attr('width', 300)
				.attr('height', 5)
        .style('fill', `url(#${linearGradientId})`)

			const texts = stops.slice(0, stops.length - 1)
			const textWrapper = legendWrapper.append('g')
				.attr('transform', 'translate(-35, 20)')
      const fillColor = '#edf2f7'

			texts.forEach((text, index) => {
				if (index % 2 == 0) {
					textWrapper
						.append('text')
						.attr('x', Math.floor((index + 1) / stops.length * 300))
						.attr('y', 0)
						.style('text-anchor', 'middle')
            .style('fill', fillColor)
						.attr('class', 'legend-stop')
						.text(text)
				}
			})

			legendWrapper.append('text')
				.style('text-anchor', 'middle')
        .style('fill', fillColor)
				.attr('x', 150)
				.attr('y', -12)
				.attr('class', 'legend-title')
				.text(this.legendText);

			return svg
		},
    getResourceUrl(url) {
      return this.$devMode ? url : this.$url(url)
    },
		fetchResources() {
      const geoJsonUrl = this.getResourceUrl('/id.geojson')
      const csvUrl = this.getResourceUrl(`/dengue-indonesia-${this.currentYear}.csv`)
			return Promise.all([fetch(geoJsonUrl), fetch(csvUrl)])
		},
		async rerender(year, type) {
      const csvUrl = this.getResourceUrl(`/dengue-indonesia-${year}.csv`)
		  const data = await this.transformToMap(await fetch(csvUrl), type)
			data.forEach((value, key) => {
        const id = this.getId(key)
				const province = d3.select('#' + id)
				if (province) {
					province
						.transition()
						.attr('fill', this.color(value))
					try {
						document.getElementById(id)._tippy.setContent(`${province.attr('data-name')} ${value}`)
					} catch (e) {
						console.log(key)
					}
				}
			})
		},
    rerenderLegend(year, type) {
      const svg = d3.select(this.getSelector('.content svg'))
      svg.select('.linear-gradient-wrapper').remove()
      svg.select('.legend-wrapper').remove()
      this.renderLegend(svg)
    },
    color(value) {
      return d3.scaleQuantize(this.colorRange, d3.schemeBlues[7])(value)
    },
 		async transformToMap(data, type) {
      const parsedCsv = d3.csvParse(
        await data.text(),
        col => [col.slug, +col[type]]
      )

 			return new Map(parsedCsv)
 		}
  }
}
</script>

