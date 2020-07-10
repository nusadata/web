<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header>
      <p class="text-gray-500 font-semibold mx-5 lg:mx-0 text-sm mb-1 mt-4">{{ $d[locale].data_starts_from_7_may_2020 }}</p>
      <h2
        id="trend-of-coronavirus-tests"
        class="font-semibold text-2xl mx-5 lg:mx-0 mb-4">
        {{ $d[locale].trend_of_people_tested_per_day }}
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
      default: 'ctts'
    },
    locale: {
      type: String,
      default: 'en',
    },
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
        .attr('viewBox', `0 0 900 500`)
        .append('g')
        .attr('transform', `translate(100, 50)`)

      const linearGradientBlueId = this.createLinearGradient(svg, 'linear-gradient-blue', '#2c5282', '#1a202c')
      const linearGradientGreenId = this.createLinearGradient(svg, 'linear-gradient-green', '#285e61', '#1a202c')
      const linearGradientOrangeId = this.createLinearGradient(svg, 'linear-gradient-orange', '#9c4221', '#1a202c')

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.date)))
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(confirmed, d => d.people_tests.daily.total)])
        .range([400, 0])

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientBlueId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(400)
          .y1(d => y(d.people_tests.daily.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line-blue')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.people_tests.daily.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientGreenId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(400)
          .y1(d => y(d.negative_cases.daily.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line-green')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.negative_cases.daily.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientOrangeId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(400)
          .y1(d => y(d.positive_cases.daily.total))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line-orange')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.positive_cases.daily.total))
          .curve(this.$d3.curveMonotoneX))

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

      const mousePerLineGreen = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-green')

      mousePerLineGreen.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineGreen.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const mousePerLineOrange = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-orange')

      mousePerLineOrange.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineOrange.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const self = this
      mouseG.append('rect')
        .attr('width', 700)
        .attr('height', 400)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', () => {
          svg.select('.mouse-per-line-blue circle').style('opacity', '0')
          svg.select('.mouse-per-line-blue text').style('opacity', '0')

          svg.select('.mouse-per-line-green circle').style('opacity', '0')
          svg.select('.mouse-per-line-green text').style('opacity', '0')

          svg.select('.mouse-per-line-orange circle').style('opacity', '0')
          svg.select('.mouse-per-line-orange text').style('opacity', '0')
        })
        .on('mouseover', () => {
          svg.select('.mouse-per-line-blue circle').style('opacity', '1')
          svg.select('.mouse-per-line-blue text').style('opacity', '1')

          svg.select('.mouse-per-line-green circle').style('opacity', '1')
          svg.select('.mouse-per-line-green text').style('opacity', '1')

          svg.select('.mouse-per-line-orange circle').style('opacity', '1')
          svg.select('.mouse-per-line-orange text').style('opacity', '1')
        })
        .on('mousemove', function () {
          const mouse = self.$d3.mouse(this)

          svg.select('.mouse-per-line-blue')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.date)).left
              const idx = bisect(confirmed, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].people_tests.daily.total))))

              return `translate(${x(new Date(confirmed[idx].date))}, ${y(confirmed[idx].people_tests.daily.total)})`
            })

          svg.select('.mouse-per-line-green')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.date)).left
              const idx = bisect(confirmed, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].negative_cases.daily.total))))

              return `translate(${x(new Date(confirmed[idx].date))}, ${y(confirmed[idx].negative_cases.daily.total)})`
            })

          svg.select('.mouse-per-line-orange')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.date)).left
              const idx = bisect(confirmed, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].positive_cases.daily.total))))

              return `translate(${x(new Date(confirmed[idx].date))}, ${y(confirmed[idx].positive_cases.daily.total)})`
            })

        })

      svg.append('g')
        .attr('transform', `translate(0, 400)`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      svg.append('g')
        .style('font', '1rem Manrope')
        .call(this.$d3.axisLeft(y).ticks(5))

      this.renderLegend(svg)
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
        .text('total tests')

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
        .text('negative cases')

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
        .text('positive cases')
    }
  }
}
</script>

<style>
.ctts .line-blue {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.ctts .line-orange {
  fill: none;
  stroke: #dd6b20;
  stroke-width: 2;
}
.ctts .line-green {
  fill: none;
  stroke: #319795;
  stroke-width: 2;
}
.ctts .mouse-per-line-blue .circle {
  fill: #63b3ed;
  stroke: none;
}
.ctts .mouse-per-line-green .circle {
  fill: #319795;
  stroke: none;
}
.ctts .mouse-per-line-orange .circle {
  fill: #dd6b20;
  stroke: none;
}
.ctts .text {
  opacity: 0;
  fill: #edf2f7;
  stroke: none;
}
</style>
