<template>
  <div class="max-w-4xl mt-10 mb-20 mx-auto overflow-x-hidden">
    <p id="title" class="font-semibold text-2xl mx-5 text-center pt-4 mb-4">Cases of Dengue Fever in Indonesia ({{ currentYear }})</p>
    <div class="text-center mx-5">
      <span
        v-for="year in yearRange"
        :key="`link-${year}`"
        class="inline-block mx-1 mb-1">
        <a class="underline text-lg text-blue-500 active:text-blue-300 focus:text-blue-300 visited:text-blue-300"
           :href="`#${year}`"
           @click="goYear(year)">
           {{ year }}
        </a>
      </span>
    </div>
    <div class="overflow-x-auto">
      <div id="content" class="min-w-xl"/>
    </div>
  </div>
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

const color = d3.scaleQuantize([0, 10000], d3.schemeBlues[7])

export default {
  data() {
    return {
      currentYear: 2018,
      yearRange: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
    }
  },
  mounted() {
    this.currentYear = window.location.hash.replace('#', '') || this.yearRange[this.yearRange.length - 1]

		this.fetchResources()
      .then(async ([geojson, data]) => {
				const map = await this.transformToMap(data)
				this.renderLegend(this.render(await geojson.json(), map, geoGenerator))
				tippy('.province', {
					followCursor: true,
          plugins: [followCursor],
					content(ref) {
						return ref.getAttribute('data-tooltip')
					}
				})
			})
  },
  methods: {
    render(geojson, data, generator) {
      const strokeColor = '#22292f'
      const strokeHoverColor = 'black'

      const svg = d3.select('#content')
        .append('svg')
        .attr('viewBox', [0, 0, 800, 400])

			svg.append('g')
				.selectAll('path')
				.data(geojson.features)
				.join('path')
				.attr('fill', d => color(data.get(d.properties.slug)))
				.attr('data-name', d => d.properties.state)
				.attr('data-tooltip', d => `${d.properties.state} ${data.get(d.properties.slug)}`)
				.attr('stroke', strokeColor)
				.attr('stroke-linejoin', 'round')
				.attr('d', generator)
				.attr('id', d => d.properties.slug)
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
			const linearGradient = svg.append('defs')
				.append('linearGradient')
				.attr('id', 'linear-gradient')
				.attr('x1', '0%')
				.attr('y1', '0%')
				.attr('x2', '100%')
				.attr('y2', '0%')

			const stops = [0, 1500, 3000, 4500, 6000, 7500, 9000, 10000];

			linearGradient.selectAll('stop')
				.data(stops)
				.join('stop')
				.attr('offset', (d, index) => `${Math.floor((index + 1) / stops.length * 100)}%`)
				.attr('stop-color', d => color(d))

			const legendWrapper = svg.append('g')
				.style('transform', 'translate(calc(50% - 150px), 375px)')

			legendWrapper.append('rect')
				.attr('width', 300)
				.attr('height', 5)
				.style('fill', 'url(#linear-gradient)')

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
				.attr('id', 'legend-title')
				.text('Number of cases');

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
		goYear(year) {
      this.currentYear = year
      this.rerender(this.currentYear)
		},
		async rerender(year) {
      const csvUrl = this.getResourceUrl(`/dengue-indonesia-${year}.csv`)
		  const data = await this.transformToMap(await fetch(csvUrl))
			data.forEach((value, key) => {
				const province = d3.select(`#${key}`)
				if (province) {
					province
						.transition()
						.attr('fill', color(value))
					try {
						document.getElementById(`${key}`)._tippy.setContent(`${province.attr('data-name')} ${value}`)
					} catch (e) {
						console.log(key)
					}
				}
			});
		},
 		async transformToMap(data) {
 			return new Map(d3.csvParse(await data.text(), ({slug, total_cases}) => [slug, +total_cases]))
 		}
  }
}
</script>

