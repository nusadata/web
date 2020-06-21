<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header>
      <p class="text-gray-500 font-semibold text-sm mb-1 mt-4">Data starts from 7 May 2020</p>
      <h2
        id="trend-of-affected-cities"
        class="font-semibold text-2xl mx-5 lg:mx-0 mb-4">
        Trend of total affected cities
      </h2>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl max-w-3xl"/>
    </div>
  </section>
</template>

<script>
import records from '~/data/coronavirus-tests.json'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'cac'
    }
  },
  mounted() {
    this.render()
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    render() {
      const confirmed = records

      const selector = this.getSelector('.content')
      this.$d3.select(selector)
        .selectAll('*')
        .remove()

      const svg = this.$d3.select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 900 414`)
        .append('g')
        .attr('transform', `translate(100, 50)`)

      const linearGradientId = this.createLinearGradient(svg, 'linear-gradient-blue', '#2c5282', '#1a202c')

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.date)))
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([200, 514])
        .range([314, 0])

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(y(200))
          .y1(d => y(d.cities_affected.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line-blue')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.cities_affected.total))
          .curve(this.$d3.curveMonotoneX))

      // render orange line
      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line-orange')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(y(513)))

      svg.append('text')
        .attr('x', 490)
        .attr('y', 22)
        .style('fill', '#dd6b20')
        .text('total cities in Indonesia (514)')

      const mouseG = svg.append('g')
        .attr('class', 'mouse-over-effect')

      const mousePerLineBlue = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-blue')

      mousePerLineBlue.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineBlue.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const self = this
      mouseG.append('rect')
        .attr('width', 700)
        .attr('height', 314)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', () => {
          svg.select('.mouse-per-line-blue circle').style('opacity', '0')
          svg.select('.mouse-per-line-blue text').style('opacity', '0')
        })
        .on('mouseover', () => {
          svg.select('.mouse-per-line-blue circle').style('opacity', '1')
          svg.select('.mouse-per-line-blue text').style('opacity', '1')
        })
        .on('mousemove', function () {
          const mouse = self.$d3.mouse(this)

          svg.select('.mouse-per-line-blue')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.date)).left
              const idx = bisect(confirmed, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].cities_affected.total))))

              return `translate(${x(new Date(confirmed[idx].date))}, ${y(confirmed[idx].cities_affected.total)})`
            })
        })


      svg.append('g')
        .attr('transform', `translate(0, 314)`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      svg.append('g')
        .style('font', '1rem Manrope')
        .call(this.$d3.axisLeft(y).ticks(3))
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
  }
}
</script>

<style>
.cac .line-blue {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}

.cac .line-orange {
  fill: none;
  stroke: #dd6b20;
  stroke-width: 2;
}

.cac .mouse-per-line-blue .circle {
  fill: #63b3ed;
  stroke: none;
}

.cac .text {
  opacity: 0;
  fill: #edf2f7;
  stroke: none;
}
</style>
