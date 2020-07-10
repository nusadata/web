<template>
  <main :class="`${selectorPrefix} relative max-w-4xl h-screen mx-auto py-5`" role="main">
    <div class="z-0">
      <header id="article-header" class="px-5 lg:px-0">
        <div class="flex items-center">
          <g-link class="flex-none text-lg leading-none" to="/">
            <span class="font-bold text-blue-500">Nusa</span>
            <span class="font-bold text-gray-200">data</span>
          </g-link>

          <div class="flex-1 flex justify-end text-right text-xs sm:text-sm">
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400 mr-5"
              to="/kalender-covid19/">
              Kalender COVID-19
            </g-link>
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400"
              to="/koleksi/">
              Koleksi
            </g-link>
          </div>
        </div>

        <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
        <p class="font-bold text-2xl sm:text-3xl pt-10 mb-2"><span class="text-blue-500">Timeline</span> COVID-19</p>
        <p class="text-gray-500">
          Halaman ini menyediakan visualisasi timeline terkait dengan aksi pemerintah merespon pandemik COVID-19 mulai dari kasus pertama sampai hari ini. Kami akan memperbarui halaman ini secara berkala mengikuti perkembangan terakhir dari situasi pandemik di Indonesia. Halaman ini lebih baik diakses dari platform desktop.
        </p>

        <div class="text-center mt-10">
          <span class="bg-gray-800 rounded px-3 py-1 text-xs">
            Untuk tampilan mobile, kamu bisa mengunjungi <g-link class="underline" to="/kalender-covid19/">kalender COVID-19</g-link>
          </span>
        </div>

        <div class="flex flex-col items-center pt-20 pb-10">
          <p class="text-gray-500">Scroll ke bawah untuk bernavigasi</p>
					<span class="text-gray-500">
						<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<polyline points="19 12 12 19 5 12"></polyline>
						</svg>
					</span>
         </div>
      </header>
      <div class="relative viewbox">
        <div class="article-container z-10 px-5 lg:px-0">
          <article class="py-5">
            <transition name="fade" v-for="(data, idx) in timelineData" :key="idx">
              <section v-show="currentDate >= new Date(data.display.start).getTime() &&
                               currentDate < new Date(data.display.end).getTime()">
                <p class="text-gray-500 font-semibold">{{ data.date }}</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  {{ data.title }}
                </h2>
                <p class="mb-2">
                  {{ data.content }}
                </p>
                <p class="text-sm text-gray-500">
                  (source:
                  <template v-if="data.sources.length === 1">
                    <a class="underline" :href="data.sources[0].url" target="__blank" rel="nofollow noreferrer">
                      {{ data.sources[0].name }}
                    </a>
                  </template>
                  <template v-else>
                    <template v-for="(source, idxSrc) in data.sources">
                      [{{ idxSrc + 1 }}] <a class="underline" :href="source.url" target="__blank" rel="nofollow noreferrer">
                        {{ source.name }}
                      </a>
                    </template>
                  </template>
                  )
                </p>
              </section>
            </transition>
          </article>
        </div>
        <div class="content-container px-5 lg:px-0">
          <div class="content"/>
        </div>
        <div id="article-footer" class="text-lg text-gray-500 px-5 lg:px-0 py-48 text-center absolute bottom-0 left-0 w-full">
          <p class="mb-5">Sering cuci tangan</p>
          <p class="mb-5">Selalu gunakan masker saat keluar rumah</p>
          <p class="mb-5">Jaga jarak 1.5m satu sama lain</p>
          <p>Stay safe, stay healthy</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Layout from '~/layouts/Id.vue'
import timelineData from '~/data/timeline-covid19.json'

export default {
  components: { Layout },
  metaInfo() {
    return {
      ...this.meta,
      bodyAttrs: {
        class: 'font-sans bg-gray-900 text-gray-200'
      },
      htmlAttrs: {
        class: 'antialiased',
        lang: 'id',
        dir: 'ltr'
      },
      link: [
        {
          href: this.url, hreflang: 'id', rel: 'alternate'
        },
        {
          href: this.$page.metadata.siteUrl + '/coronavirus-timeline/',
          hreflang: 'en',
          rel: 'alternate'
        }
      ]
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
        title: this.title,
        meta: this.$generateMeta(
          this.title,
          this.description,
          this.$page.metadata.siteUrl,
          this.url
        )
      }
    },
    title() {
      return 'Timeline COVID-19 di Indonesia - Nusadata'
    },
    description() {
      return 'Halaman ini menyediakan visualisasi timeline terkait dengan aksi pemerintah merespon pandemik COVID-19. Halaman ini lebih baik diakses dari platform desktop.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/timeline-covid19/`
    }
  },
  data() {
    return {
      scrollY: 0,
      currentDate: new Date('2020-03-02T00:00:00.000Z').getTime(),
      xFn: null,
      yFn: null,
      scrollFn: null,
      timelineData,
      captionsGraph: timelineData.map(({ graph }) => ({ date: graph.date, value: graph.value }))
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

    // Important note: these need to be declare first because we need to display
    // scroll first before getting the correct width
		const headerRect = document.querySelector('#article-header').getBoundingClientRect()
    const scrollLength = 15000
    let footerRect = document.querySelector('#article-footer').getBoundingClientRect()
    const $viewbox = document.querySelector('.viewbox')
    this.applyStyle(
      $viewbox,
      {
        height: `${scrollLength + footerRect.height}px`
      }
    )

    const viewboxRect = $viewbox.getBoundingClientRect()
    const viewboxWidth = $viewbox.offsetWidth - (20 * 2) // 20px == 1.25rem
    const viewboxHeight = window.innerHeight

    this.scrollFn = this.$d3.scaleLinear().domain([headerRect.bottom, scrollLength]).range([0, viewboxWidth])

    this.applyStyle(
      document.querySelector('.content-container'),
      {
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: 'unset',
      }
    )
    this.applyStyle(
      document.querySelector('.article-container'),
      {
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: 'unset',
      }
    )

    footerRect = document.querySelector('#article-footer').getBoundingClientRect()

    this.scrollListenerFn = () => {
      this.scrollY = this.scrollFn(window.scrollY)
      const top = footerRect.top - footerRect.height
      if (window.scrollY >= top) {
        const graph = document.querySelector('.content-container')
        const article = document.querySelector('.article-container')
        this.applyStyle(
          graph,
          {
            position: 'absolute',
            bottom: `${footerRect.height}px`,
            top: 'unset',
            left: '0'
          }
        )
        this.applyStyle(
          article,
          {
            position: 'absolute',
            bottom: `${footerRect.height + graph.offsetHeight - article.offsetHeight}px`,
            top: 'unset',
            left: '0'
          }
        )
      } else if (window.scrollY >= headerRect.bottom) {
        this.applyStyle(
          document.querySelector('.content-container'),
          {
            position: 'fixed',
            top: '0',
            bottom: 'unset',
            left: `${viewboxRect.left}px`
          }
        )
        this.applyStyle(
          document.querySelector('.article-container'),
          {
            position: 'fixed',
            top: '0',
            bottom: 'unset',
            left: `${viewboxRect.left}px`
          }
        )
      } else {
        this.applyStyle(
          document.querySelector('.content-container'),
          {
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: 'unset',
          }
        )
        this.applyStyle(
          document.querySelector('.article-container'),
          {
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: 'unset',
          }
        )
      }
    }

    window.addEventListener('scroll', this.scrollListenerFn, {passive: true});

    this.render(this.$page.allCoronavirus.edges[0].node.daily, viewboxWidth, viewboxHeight)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListenerFn);
  },
  methods: {
    getSelector(selector) {
      return `.${this.selectorPrefix} ${selector}`
    },
    getId(selector) {
      return `${this.selectorPrefix}-${selector}`
    },
    applyStyle(el, styleObj) {
      Object.keys(styleObj).forEach(styleAttr => {
        el.style[styleAttr] = styleObj[styleAttr]
      })
    },
    render(confirmed, viewboxWidth, viewboxHeight) {
      const selector = this.getSelector('.content')
      const marginX = 15
      const marginY = 40
      const width = viewboxWidth - (marginX * 2)
      const height = viewboxHeight - (marginY * 2)

      // set width for article
      this.applyStyle(
        document.querySelector('.article-container'),
        {
          width: `${viewboxWidth * 2 / 3}px`
        }
      )

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
        .attr('transform', 'translate(-5,-10)')

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .style('font', '1rem Manrope')
        .call(this.$d3.axisBottom(x).ticks(5))

      const captionCircles = svg.append('g')
        .attr('class', 'caption-circles')
      const self = this
      this.captionsGraph.forEach(caption => {
        captionCircles.append('circle')
          .attr('r', 5)
          .attr('class', 'caption-circle-donut')
          .attr('cx', x(new Date(caption.date)))
          .attr('cy', y(caption.value))

        captionCircles.append('circle')
          .attr('r', 8)
          .attr('class', 'caption-circle')
          .attr('data-x', x(new Date(caption.date)))
          .attr('cx', x(new Date(caption.date)))
          .attr('cy', y(caption.value))
          .on('click', function (d, i) {
            const x = +this.getAttribute('data-x')
            const scrollY = self.scrollFn.invert(x).toFixed(2)
            window.scrollTo(0, scrollY)
          })
      })

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
    }
  }

}
</script>

<page-query>
  query {
    metadata {
      siteUrl
    }
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
.cts .caption-circles .caption-circle {
  fill: #bee3f8;
  fill-opacity: 0;
  stroke: #bee3f8;
  stroke-width: 2;
}
.cts .caption-circles .caption-circle-donut {
  fill: #63b3ed;
  stroke: none;
}
</style>
