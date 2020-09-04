<template>
  <div :class="`${selectorPrefix} ${selectorPrefix}-${provinceSlug}`" style="width: 150px; height: 40px;"/>
</template>

<script>
export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'cmavg'
    },
    daily: {
      type: Array,
      required: true
    },
    provinceKey: {
      type: String,
      required: true
    },
    provinceSlug: {
      type: String,
      required: true
    },
  },
  mounted() {
    this.render(this.getRollingAvgIn30Days(this.daily, this.provinceKey))
  },
  methods: {
    formatNumber(num) {
      return Math.abs(num) > 999 ?
        Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' :
        Math.sign(num)*Math.abs(num)
    },
    getRollingAvgIn30Days(daily, key) {
      const filteredData = daily.map(item => {
        return {
          date: item.date,
          cases: item.data.filter(l => l.key === key)[0].cases,
        }
      })

      const rollingAvgData = []

      for (let i = 0; i < 30; i++) {
        const data = filteredData.slice(filteredData.length - 60 + 1 + i, filteredData.length - 30 + 1 + i)
        const { date } = data[data.length - 1]
        const avg = Math.ceil(data.reduce((acc, d) => acc + d.cases, 0) / data.length)
        rollingAvgData.push({
          date,
          avg,
        })
      }

      return rollingAvgData
    },
    render(confirmed) {
      const selector = `.${this.selectorPrefix}-${this.provinceSlug}`

      const svg = this.$d3.select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 150 40`)
        .append('g')
        .attr('transform', `translate(25, 0)`)

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.date)))
        .range([0, 100])

      const y = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(confirmed, d => d.avg)])
        .range([40, 5])

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `#2c5282`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.date)))
          .y0(35)
          .y1(d => y(d.avg))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.avg))
          .curve(this.$d3.curveMonotoneX))

      const startData = confirmed[0]

      svg.append('circle')
        .attr('r', 2)
        .attr('class', 'circle')
        .attr('cx', x(new Date(startData.date)))
        .attr('cy', y(startData.avg))

      svg.append('text')
        .attr('class', 'text')
        .attr('text-anchor', 'end')
        .attr('x', x(new Date(startData.date)) - 3)
        .attr('y', y(startData.avg) + 3)
        .text(this.formatNumber(startData.avg))

      const endData = confirmed[confirmed.length - 1]

      svg.append('circle')
        .attr('r', 2)
        .attr('class', 'circle')
        .attr('cx', x(new Date(endData.date)))
        .attr('cy', y(endData.avg))

      svg.append('text')
        .attr('class', 'text')
        .attr('text-anchor', 'start')
        .attr('x', x(new Date(endData.date)) + 3)
        .attr('y', y(endData.avg) + 3)
        .text(this.formatNumber(endData.avg))
    }
  }
}
</script>

<style>
.cmavg .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.cmavg .circle {
  fill: #63b3ed;
  stroke: none;
}
.cmavg .text {
  opacity: 1 !important;
  fill: #edf2f7 !important;
  font-size: 11px;
  stroke: none;
}
</style>
