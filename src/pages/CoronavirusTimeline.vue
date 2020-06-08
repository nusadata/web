<template>
  <main :class="`${selectorPrefix} relative max-w-4xl h-screen mx-auto py-5`" role="main">
    <div class="px-5 lg:px-0 relative z-10 viewbox">
			<h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
      <div class="article-container fixed">
				<article class="w-1/2 px-5 py-5">
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-02T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-03-05T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">3 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								The first cases
							</h2>
							<p class="mb-2">
								President Joko Widodo announced two first positive cases in Indonesia
							</p>
							<p class="text-sm text-gray-500">
								(source: <a class="underline" href="https://www.thejakartapost.com/news/2020/03/02/breaking-jokowi-announces-indonesias-first-two-confirmed-covid-19-cases.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>)
							</p>
						</section>
					</transition>
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-08T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-03-11T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">8 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								Expanded travel ban	abroad
							</h2>
							<p class="mb-2">
								Travel restrictions expanded to include several cities in South Korea, Italy and Iran. Visitors from these countries must provide a valid health certificate.
							</p>
							<p class="text-sm text-gray-500">
								(source: <a class="underline" href="https://www.thejakartapost.com/news/2020/03/05/covid-19-indonesia-issues-travel-ban-for-hardest-hit-iran-south-korea-italy.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>)
							</p>
						</section>
					</transition>
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-13T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-03-15T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">13 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								Treatment facilities
							</h2>
							<p class="mb-2">
								The government designated 132 treatment facilities across Indonesia
							</p>
							<p class="text-sm text-gray-500">
							  (source: <a class="underline" href="https://infeksiemerging.kemkes.go.id/situasi-infeksi-emerging/info-corona-virus/menteri-kesehatan-tetapkan-132-rumah-sakit-rujukan-covid-19/" target="__blank" rel="nofollow noopener">Kementerian Kesehatan</a>)
							</p>
						</section>
					</transition>
					<section v-show="currentDate === new Date('2020-03-16T00:00:00.000Z').getTime()">
						<p class="text-gray-500 font-semibold">16 March 2020</p>
						<h2 class="text-3xl font-bold leading-tight mb-2">
							Fatwa MUI regarding prayer activity during pandemic
						</h2>
						<p class="mb-2">
							Majelis Ulama Indonesia issued a fatwa to temporarily forbid non-compulsory prays in mosque and other public places during COVID-19 pandemic.
						</p>
						<p class="text-sm text-gray-500">
							(source: <a class="underline" href="https://covid19.go.id/p/protokol/fatwa-majelis-ulama-indonesia-nomor-14-tahun-2020-tentang-penyelenggaran-ibadah-dalam-situasi-terjadi-wabah-covid-19" rel="nofollow noopener">Fatwa MUI nomor 14 tahun 2020</a>)
						</p>
					</section>
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-17T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-03-20T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">17 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								Health protocol
							</h2>
							<p class="mb-2">
								On 17 March, COVID-19 health protocols have been released to public [1]. The government also expanded the travel restriction to suspend visa free entry to Indonesia for one month and deny transit or arrival for visitors from several countries [2].
							</p>
              <p class="text-sm text-gray-500">
								(source:
								 [1] <a class="underline" href="https://www.kompas.com/tren/read/2020/03/17/105258465/berikut-protokol-kesehatan-jika-alami-gejala-virus-corona" target="__blank" rel="nofollow noopener">Kompas.com</a>
								 [2] <a class="underline" href="https://news.detik.com/berita/d-4942940/cegah-persebaran-corona-travelers-dari-8-negara-ini-dilarang-masuk-ri" target="__blank" rel="nofollow noopener">Detik.com</a>)
              </p>
						</section>
					</transition>
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-23T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-03-28T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">23 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								Kemayoran Athletes Village
							</h2>
							<p class="mb-2">
								Kemayoran Athletes Village was officially converted to house COVID-19 patients with mild symptoms. This site claimed to be able to house up to 1800 patients.
							</p>
							<p class="text-sm text-gray-500">
							  (source: <a class="underline" href="https://nasional.kompas.com/read/2020/03/18/19194761/wisma-atlet-untuk-pasien-covid-19-wapres-ada-1800-tempat-tidur" target="__blank" rel="nofollow noopener">Kompas.com</a>)
							</p>
						</section>
					</transition>
					<transition name="fade">
						<section v-show="currentDate >= new Date('2020-03-30T00:00:00.000Z').getTime() &&
                             currentDate < new Date('2020-04-02T00:00:00.000Z').getTime()">
              <p class="text-gray-500 font-semibold">30 March 2020</p>
							<h2 class="text-3xl font-bold leading-tight mb-2">
								Not yet lockdown for Jakarta
							</h2>
							<p class="mb-2">
								President Joko Widodo refused to impose lockdown on Jakarta.  Bus routes connecting Jakarta and other cities and provinces will remain open following the cancellation of a plan to temporarily suspend operations of AKAP buses.
							</p>
							<p class="text-sm text-gray-500">
							  (source: <a class="underline" href="https://www.thejakartapost.com/news/2020/03/30/jokowi-refuses-to-impose-lockdown-on-jakarta.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>)
							</p>
						</section>
					</transition>
				</article>
       </div>
    </div>
    <div class="fixed content-container">
      <div class="content"/>
    </div>
  </main>
</template>

<script>
export default {
  metaInfo() {
    return {
      ...this.meta,
      bodyAttrs: {
        class: 'font-sans bg-gray-900 text-gray-200'
      }
    }
  },
  props: {
    selectorPrefix: {
      type: String,
      default: 'cts'
    }
  },
  computed: {
    meta() {
      return {
        title: `Coronavirus Timeline in Indonesia - Nusadata`
      }
    }
  },
  data() {
    return {
      scrollY: 0,
      currentDate: new Date('2020-03-02T00:00:00.000Z').getTime(),
      xFn: null,
      yFn: null,
      scrollFn: null,
    }
  },
  watch: {
    scrollY(scroll) {
      const daily = this.$page.allCoronavirus.edges[0].node.daily
      const xDate = this.xFn.invert(scroll)
      const bisect = this.$d3.bisector(data => new Date(data.key)).left
      const idx = bisect(daily, xDate)
      const currentData = daily[idx] ? daily[idx] : daily[daily.length - 1]
      this.currentDate = currentData.key
      this.$d3.select('.mouse-per-line-confirmed text').text(
        Math.ceil(this.yFn.invert(this.yFn(currentData.jumlah_positif.value))))
      this.$d3.select('.mouse-per-line-confirmed circle').style('opacity', '1')
      this.$d3.select('.mouse-per-line-confirmed').attr('transform', `translate(${this.xFn(new Date(currentData.key))}, ${this.yFn(currentData.jumlah_positif.value)})`)
    }
  },
  mounted() {
    this.scrollY = window.scrollY
    const viewboxRect = document.querySelector('.viewbox').getBoundingClientRect()
    const viewboxWidth = document.querySelector('.viewbox').offsetWidth
    const viewboxHeight = window.innerHeight
    const scrollLength = 15000
    this.scrollFn = this.$d3.scaleLinear().domain([0, scrollLength]).range([0, viewboxWidth])
    document.querySelector('.viewbox').setAttribute('style', `height: ${scrollLength}px`)
    document.querySelector('.content-container').setAttribute('style', `top: 0; left: ${viewboxRect.right - viewboxWidth}px`)
		document.querySelector('.article-container').setAttribute('style', `top: 0; left: ${viewboxRect.left}px`)
    window.addEventListener("scroll", () => {
        this.scrollY = this.scrollFn(window.scrollY)
      },
      {passive: true}
    );
    this.render(this.$page.allCoronavirus.edges[0].node.daily, viewboxWidth, viewboxHeight)
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    render(confirmed, viewboxWidth, viewboxHeight) {
      const selector = this.getSelector('.content')
      const marginX = 50
      const marginY = 50
      const width = viewboxWidth - (marginX * 2)
      const height = viewboxHeight - (marginY * 2)
      this.$d3.select(selector)
        .selectAll('*')
        .remove()

      const svg = this.$d3.select(selector)
        .append('svg')
        .attr('width', viewboxWidth)
        .attr('height', viewboxHeight)
        .append('g')
        .attr('transform', `translate(${marginX}, ${marginY})`)

      const linearGradientId = this.createLinearGradient(svg, 'linear-gradient', '#2c5282', '#1a202c')

      const x = this.$d3.scaleTime()
        .domain(this.$d3.extent(confirmed, d => new Date(d.key)))
        .range([0, width])
      this.xFn = x

      const y = this.$d3.scaleLinear()
        .domain([0, this.$d3.max(confirmed, d => d.jumlah_positif.value)]) // need to be adjustable
        .range([height, 0])
      this.yFn = y

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'area')
        .attr('fill', `url(#${linearGradientId})`)
        .attr('d', this.$d3.area()
          .x(d => x(new Date(d.key)))
          .y0(height)
          .y1(d => y(d.jumlah_positif.value))
          .curve(this.$d3.curveMonotoneX))

      svg.append('path')
        .datum(confirmed)
        .attr('class', 'line')
        .attr('d', this.$d3.line()
          .x(d => x(new Date(d.key)))
          .y(d => y(d.jumlah_positif.value))
          .curve(this.$d3.curveMonotoneX))

      const mouseG = svg.append('g')
        .attr('class', 'mouse-over-effect')

      const mousePerLineConfirmed = mouseG
        .append('g')
        .attr('class', 'mouse-per-line-confirmed')

      mousePerLineConfirmed.append('circle')
        .attr('r', 5)
        .attr('class', 'circle')

      mousePerLineConfirmed.append('text')
        .attr('class', 'text')
        .attr('transform', 'translate(10,3)')

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      // svg.append('g')
      //   .style('font', '1rem Manrope')
      //   .call(this.$d3.axisLeft(y).ticks(5))

      // this.renderLegend(svg)
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

<page-query>
  query {
    allCoronavirus {
      edges {
        node {
          new {
            jumlah_positif
            jumlah_meninggal
            jumlah_sembuh
            jumlah_dirawat
            created
          }
          daily {
            key
						key_as_string
            jumlah_positif {
              value
            }
            jumlah_meninggal {
              value
            }
            jumlah_sembuh {
              value
            }
            jumlah_dirawat {
              value
            }
            jumlah_positif_kum {
              value
            }
            jumlah_meninggal_kum {
              value
            }
            jumlah_sembuh_kum {
              value
            }
            jumlah_dirawat_kum {
              value
            }
          }
          total {
            jumlah_positif
            jumlah_dirawat
            jumlah_sembuh
            jumlah_meninggal
          }
        }
      }
    }
  }
</page-query>

<style>
.cts .line {
  fill: none;
  stroke: #3182ce;
  stroke-width: 2;
}
.cts .mouse-per-line-confirmed .circle {
  opacity: 0;
  fill: #63b3ed;
  stroke: none;
}
.cts .text {
  fill: #edf2f7;
  stroke: none;
}
.cts .fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.cts .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
