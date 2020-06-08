<template>
  <main :class="`${selectorPrefix} relative max-w-4xl h-screen mx-auto py-5`" role="main">
    <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
    <div class="article-container w-1/2 fixed z-10">
      <article class="px-5 py-5">
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
              Expanded international travel ban
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
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-03-16T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-03-20T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">16 March 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Several activities began to be restricted
            </h2>
            <p class="mb-2">
              Several regions closed schools and imposed learning activity from home [1]. Majelis Ulama Indonesia issued a fatwa to temporarily forbid non-compulsory prays in mosque and other public places during pandemic [2]. On 17 March, COVID-19 health protocols have been released to public [3].
            </p>
            <p class="text-sm text-gray-500">
              (source:
                [1] <a class="underline" href="https://www.bbc.com/indonesia/indonesia-51769074" rel="nofollow noopener">BBC</a>
                [2] <a class="underline" href="https://covid19.go.id/p/protokol/fatwa-majelis-ulama-indonesia-nomor-14-tahun-2020-tentang-penyelenggaran-ibadah-dalam-situasi-terjadi-wabah-covid-19" rel="nofollow noopener">Fatwa MUI nomor 14 tahun 2020</a>
                [3] <a class="underline" href="https://www.kompas.com/tren/read/2020/03/17/105258465/berikut-protokol-kesehatan-jika-alami-gejala-virus-corona" target="__blank" rel="nofollow noopener">Kompas.com</a>
              )
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
                           currentDate < new Date('2020-04-7T00:00:00.000Z').getTime()">
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
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-04-02T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-04-05T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">2 April 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Temporary entry ban for all foreign citizens
            </h2>
            <p class="mb-2">
              The Directorate General of Immigration in Indonesia temporarily ban entry to the Republic of Indonesia for foreign citizens with several exceptions.
            </p>
            <p class="text-sm text-gray-500">
              (source:
                <a class="underline" href="https://www.indonesia.travel/gb/en/news/temporary-entry-ban-for-foreign-citizen-entering-the-republic-of-indonesia" target="__blank" rel="nofollow noopener">indonesia.travel</a>
               )
            </p>
          </section>
        </transition>
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-04-10T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-04-12T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">10 April 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Large-scale Social Restrictions (PSBB)
            </h2>
            <p class="mb-2">
              The government of DKI Jakarta imposed large-scale social restrictions, followed by several other regions like Bogor, Depok, Bekasi and Tangerang.
            </p>
            <p class="text-sm text-gray-500">
              (source:
                <a class="underline" href="https://megapolitan.kompas.com/read/2020/04/07/21552791/psbb-jakarta-mulai-10-april-belajar-tetap-di-rumah-fasilitas-umum-ditutup" target="__blank" rel="nofollow noopener">Kompas.com</a>
               )
            </p>
          </section>
        </transition>
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-04-13T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-04-18T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">13 April 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              COVID-19 is a national disaster
            </h2>
            <p class="mb-2">
              President Joko Widodo declared COVID-19 as a national disaster after it has infected 4557 people and caused 399 deaths in Indonesia.
            </p>
            <p class="text-sm text-gray-500">
              (source: <a class="underline" href="https://setkab.go.id/presiden-tetapkan-bencana-nonalam-penyebaran-covid-19-sebagai-bencana-nasional/" target="__blank" rel="nofollow noopener">setkab.go.id</a>)
            </p>
          </section>
        </transition>
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-04-21T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-04-25T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">21 April 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Mudik Idul Fitri is banned
            </h2>
            <p class="mb-2">
              President Joko Widodo announced his decision to ban Idul Fitri mudik (exodus) starting from 24 April to limit the spread of COVID-19 [1]. To help with this effort, several long distance transportations were banned until at least 31 May [2].
            </p>
            <p class="text-sm text-gray-500">
              (source:
               [1] <a class="underline" href="https://www.thejakartapost.com/news/2020/04/21/breaking-jokowi-bans-mudik-as-ramadan-approaches.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>
               [2] <a class="underline" href="https://www.thejakartapost.com/news/2020/04/23/govt-temporarily-bans-passenger-travel-to-prevent-mudik.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>
              )
            </p>
          </section>
        </transition>
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-05-06T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-05-09T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">6 May 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Government allowed public transportation to operate but still banned 'mudik'
            </h2>
            <p class="mb-2">
              Transportation Minister Budi Karya Sumadi said that it was possible for the government to allow all means of public transportation to start operations on 7 May to accommodate particular individuals while insisting on banning this year’s Idul Fitri mudik.
            </p>
            <p class="text-sm text-gray-500">
              (source: <a class="underline" href="https://www.thejakartapost.com/news/2020/05/06/government-to-allow-public-transportation-to-operate-but-still-bans-mudik.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>
              )
            </p>
          </section>
        </transition>
        <transition name="fade">
          <section v-show="currentDate >= new Date('2020-05-20T00:00:00.000Z').getTime() &&
                           currentDate < new Date('2020-05-23T00:00:00.000Z').getTime()">
            <p class="text-gray-500 font-semibold">20 May 2020</p>
            <h2 class="text-3xl font-bold leading-tight mb-2">
              Government tightened security at 'mudik' ban checkpoints
            </h2>
            <p class="mb-2">
              The government tightened its monitoring of the Idul Fitri mudik ban on the Islamic holiday, which falls on May 24 and 25 2020. Violators would either be stopped or turned back.
            </p>
            <p class="text-sm text-gray-500">
              (source: <a class="underline" href="https://www.thejakartapost.com/news/2020/05/19/covid-19-govt-to-tighten-security-at-mudik-ban-checkpoints-as-idul-fitri-approaches.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>
              )
            </p>
          </section>
        </transition>
      </article>
    </div>
    <div class="px-5 lg:px-0 z-0 viewbox">
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
      },
      htmlAttrs: {
        class: 'antialiased'
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
      captionsGraph: [
        { date: '2020-03-02T00:00:00.000Z', value: 2 },
        { date: '2020-03-08T00:00:00.000Z', value: 14 },
        { date: '2020-03-13T00:00:00.000Z', value: 35 },
        { date: '2020-03-16T00:00:00.000Z', value: 18 },
        { date: '2020-03-23T00:00:00.000Z', value: 65 },
        { date: '2020-04-02T00:00:00.000Z', value: 114 },
        { date: '2020-04-10T00:00:00.000Z', value: 220 },
        { date: '2020-04-13T00:00:00.000Z', value: 316 },
        { date: '2020-04-21T00:00:00.000Z', value: 376 },
        { date: '2020-05-06T00:00:00.000Z', value: 368 },
        { date: '2020-05-20T00:00:00.000Z', value: 693 },
      ]
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
      const marginX = 30
      const marginY = 40
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
