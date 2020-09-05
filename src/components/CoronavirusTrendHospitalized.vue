<template>
  <section
    :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`"
  >
    <header>
      <h2
        id="trend-of-coronavirus-hospitalized"
        class="font-semibold text-2xl mx-5 lg:mx-0 mb-4"
      >
        {{ $d[locale].trend_of_people_hospitalized_per_day }}
      </h2>
    </header>
    <div class="overflow-x-auto">
      <div class="content min-w-2xl max-w-3xl" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'cths',
    },
    daily: {
      type: Array,
      required: true,
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
      const confirmed = this.daily

      const selector = this.getSelector('.content')
      this.$d3.select(selector).selectAll('*').remove()

      const svg = this.$d3
        .select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 900 500`)
        .append('g')
        .attr('transform', `translate(100, 50)`)

      const linearGradientBlueId = this.createLinearGradient(
        svg,
        'linear-gradient-blue',
        '#2c5282',
        '#1a202c'
      )

      const x = this.$d3
        .scaleTime()
        .domain(this.$d3.extent(confirmed, (d) => new Date(d.key)))
        .range([0, 700])

      const y = this.$d3
        .scaleLinear()
        .domain([0, this.$d3.max(confirmed, (d) => d.jumlah_dirawat.value)])
        .range([400, 0])

      svg
        .append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientBlueId})`)
        .attr(
          'd',
          this.$d3
            .area()
            .x((d) => x(new Date(d.key)))
            .y0(400)
            .y1((d) => y(d.jumlah_dirawat.value))
            .curve(this.$d3.curveMonotoneX)
        )

      svg
        .append('path')
        .datum(confirmed)
        .attr('class', 'line-blue')
        .attr(
          'd',
          this.$d3
            .line()
            .x((d) => x(new Date(d.key)))
            .y((d) => y(d.jumlah_dirawat.value))
            .curve(this.$d3.curveMonotoneX)
        )

      const mouseG = svg.append('g').attr('class', 'mouse-over-effect')

      const mousePerLineBlue = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-blue')

      mousePerLineBlue
        .append('circle')
        .attr('r', 5)
        .attr('class', 'circle')
        .style('opacity', '0')

      mousePerLineBlue
        .append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      const self = this
      mouseG
        .append('rect')
        .attr('width', 700)
        .attr('height', 400)
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

          svg
            .select('.mouse-per-line-blue')
            .attr('transform', function (_d, _i) {
              const xDate = x.invert(mouse[0])
              const bisect = self.$d3.bisector((data) => new Date(data.key))
                .left
              const idx = bisect(confirmed, xDate)

              self.$d3
                .select(this)
                .select('text')
                .text(
                  Math.ceil(y.invert(y(confirmed[idx].jumlah_dirawat.value)))
                )

              return `translate(${x(
                new Date(confirmed[idx].key)
              )}, ${y(confirmed[idx].jumlah_dirawat.value)})`
            })
        })

      svg
        .append('g')
        .attr('transform', `translate(0, 400)`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      svg
        .append('g')
        .style('font', '1rem Manrope')
        .call(this.$d3.axisLeft(y).ticks(5))
    },
    createLinearGradient(svg, id, firstColor, secondColor) {
      const linearGradientId = this.getId(id)
      const linearGradient = svg
        .append('defs')
        .attr('class', 'linear-gradient-wrapper')
        .append('linearGradient')
        .attr('id', linearGradientId)
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%')

      linearGradient
        .append('stop')
        .attr('class', 'start')
        .attr('offset', '0%')
        .attr('stop-color', firstColor)
        .attr('stop-opacity', 1)

      linearGradient
        .append('stop')
        .attr('class', 'end')
        .attr('offset', '100%')
        .attr('stop-color', secondColor)
        .attr('stop-opacity', 1)

      return linearGradientId
    },
  },
}
</script>

<style>
.cths .line-blue {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.cths .mouse-per-line-blue .circle {
  fill: #63b3ed;
  stroke: none;
}
.cths .text {
  opacity: 0;
  fill: #edf2f7;
  stroke: none;
}
</style>
