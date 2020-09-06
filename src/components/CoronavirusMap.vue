<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header>
      <h2
        id="map-of-coronavirus"
        class="font-semibold text-2xl mx-5 lg:mx-0 my-4"
      >
        {{ $d[locale].map_of_total_cases }}
      </h2>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl" />
    </div>
  </section>
</template>

<script>
import {followCursor} from 'tippy.js'
import {delimiter} from '~/plugins/delimiter'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'mcv'
    },
    daily: {
      type: Array,
      required: true
    },
    provinces: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      default: 'en',
    }
  },
  data() {
    return {
      currentType: 'total_cases'
    }
  },
  computed: {
    colorRange() {
      const range = {
        total_cases: [0, 10000],
      }
      return range[this.currentType]
    },
    stopRange() {
      const range = {
        total_cases: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
      }
      return range[this.currentType]
    },
    legendText() {
      const texts = {
        total_cases: this.$d[this.locale].number_of_total_cases,
      }
      return texts[this.currentType]
    }
  },
  mounted() {
    this.fetchResources()
      .then(async geojson => {
        const map = this.transformToMap(this.daily[this.daily.length - 1].data)
        this.renderLegend(this.render(await geojson.json(), map))
        this.$tippy(this.getSelector('.province'), {
          followCursor: true,
          plugins: [followCursor],
          content(ref) {
            return ref.getAttribute('data-tooltip')
          }
        })
      })
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    render(geojson, data) {
      const projection = this.$d3.geoEquirectangular()
        .scale(1000)
        .translate([-1650, 120])

      const generator = this.$d3.geoPath()
        .projection(projection)

      const strokeColor = '#22292f'
      const strokeHoverColor = 'black'

      const svg = this.$d3.select(this.getSelector('.content'))
        .append('svg')
        .attr('viewBox', [0, 0, 800, 400])

      const contextD3 = this.$d3 // need to use this because the callback already has its context object

      svg.append('g')
        .selectAll('path')
        .data(geojson.features)
        .join('path')
        .attr('fill', d => this.color(data.get(d.properties.slug).value))
        .attr('data-tooltip', d => `${data.get(d.properties.slug).name} ${delimiter(data.get(d.properties.slug).value)}`)
        .attr('stroke', strokeColor)
        .attr('stroke-linejoin', 'round')
        .attr('d', generator)
        .attr('id', d => this.getId(d.properties.slug))
        .attr('class', 'province')
        .on('mouseover', function () {
          svg.selectAll('.province').transition().style('opacity', 0.5).attr('stroke', strokeColor)
          contextD3.select(this).transition().style('opacity', 1).attr('stroke', strokeHoverColor)
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
      return fetch(geoJsonUrl)
    },
    color(value) {
      return this.$d3.scaleQuantize(this.colorRange, this.$d3.schemeBlues[7])(value)
    },
    transformToMap(data) {
      const result = []
      data.forEach(d => {
        const province = this.provinces[d.key]
        if (province) {
          result.push([province.slug, { value: d.total_cases, name: province.name }])
        }
      })
      return new Map(result)
    }
  }
}
</script>

