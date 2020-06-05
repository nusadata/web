<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header>
      <h2
        id="trend-of-coronavirus-new-cases"
        class="font-semibold text-2xl mx-5 lg:mx-0 my-4">
        Trend of new cases per day
      </h2>
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
      default: 'ctnvs'
    },
    daily: {
      type: Array,
      required: true
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
      const confirmed = this.daily
      const deaths = this.daily
      const recovered = this.daily

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
      const linearGradientInvId = this.createLinearGradient(svg, 'linear-gradient-inv', '#9c4221', '#1a202c')
      const linearGradientSucId = this.createLinearGradient(svg, 'linear-gradient-suc', '#285e61', '#1a202c')

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.key)))
        .range([0, 700])

      const y = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(confirmed, d => d.jumlah_positif.value)]) // need to be adjustable
        .range([400, 0])

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.key)))
          .y0(400)
          .y1(d => y(d.jumlah_positif.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.key)))
          .y(d => y(d.jumlah_positif.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(recovered)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientSucId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.key)))
          .y0(400)
          .y1(d => y(d.jumlah_sembuh.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(recovered)
        .attr('class', 'line-suc')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.key)))
          .y(d => y(d.jumlah_sembuh.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(deaths)
        .style('opacity', '0.8')
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientInvId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.key)))
          .y0(400)
          .y1(d => y(d.jumlah_meninggal.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(deaths)
        .style('opacity', '0.8')
        .attr('class', 'line-inv')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.key)))
          .y(d => y(d.jumlah_meninggal.value))
          .curve(this.$d3.curveMonotoneX))

      const mouseG = svg.append('g')
        .attr('class', 'mouse-over-effect')

      const mousePerLineConfirmed = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-confirmed')

      mousePerLineConfirmed.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineConfirmed.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const mousePerLineRecovered = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-recovered')

      mousePerLineRecovered.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineRecovered.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const mousePerLineDeaths = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-deaths')

      mousePerLineDeaths.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineDeaths.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const self = this
      mouseG.append('rect')
        .attr('width', 700)
        .attr('height', 400)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', () => {
          svg.select('.mouse-per-line-confirmed circle').style('opacity', '0')
          svg.select('.mouse-per-line-confirmed text').style('opacity', '0')

          svg.select('.mouse-per-line-recovered circle').style('opacity', '0')
          svg.select('.mouse-per-line-recovered text').style('opacity', '0')

          svg.select('.mouse-per-line-deaths circle').style('opacity', '0')
          svg.select('.mouse-per-line-deaths text').style('opacity', '0')
        })
        .on('mouseover', () => {
          svg.select('.mouse-per-line-confirmed circle').style('opacity', '1')
          svg.select('.mouse-per-line-confirmed text').style('opacity', '1')

          svg.select('.mouse-per-line-recovered circle').style('opacity', '1')
          svg.select('.mouse-per-line-recovered text').style('opacity', '1')

          svg.select('.mouse-per-line-deaths circle').style('opacity', '1')
          svg.select('.mouse-per-line-deaths text').style('opacity', '1')
        })
        .on('mousemove', function () {
          const mouse = self.$d3.mouse(this)

          self.$d3.select('.mouse-per-line-confirmed')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.key)).left
              const idx = bisect(confirmed, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].jumlah_positif.value))))

              return `translate(${x(new Date(confirmed[idx].key))}, ${y(confirmed[idx].jumlah_positif.value)})`
            })

          self.$d3.select('.mouse-per-line-recovered')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.key)).left
              const idx = bisect(recovered, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].jumlah_sembuh.value))))

              return `translate(${x(new Date(confirmed[idx].key))}, ${y(confirmed[idx].jumlah_sembuh.value)})`
            })

          self.$d3.select('.mouse-per-line-deaths')
            .attr('transform', function (d, i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector(data => new Date(data.key)).left
              const idx = bisect(deaths, xDate)

              self.$d3.select(this).select('text')
                .text(Math.ceil(y.invert(y(confirmed[idx].jumlah_meninggal.value))))

              return `translate(${x(new Date(confirmed[idx].key))}, ${y(confirmed[idx].jumlah_meninggal.value)})`
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
        .text('new cases')

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
.ctnvs .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.ctnvs .line-inv {
  fill: none;
  stroke: #dd6b20;
  stroke-width: 2;
}
.ctnvs .line-suc {
  fill: none;
  stroke: #319795;
  stroke-width: 2;
}
.ctnvs .mouse-per-line-confirmed .circle {
  fill: #63b3ed;
  stroke: none;
}
.ctnvs .mouse-per-line-recovered .circle {
  fill: #319795;
  stroke: none;
}
.ctnvs .mouse-per-line-deaths .circle {
  fill: #dd6b20;
  stroke: none;
}
.ctnvs .text {
  opacity: 0;
  fill: #edf2f7;
  stroke: none;
}
</style>
