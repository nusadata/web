<template>
  <main :class="`${selectorPrefix} relative max-w-4xl h-screen mx-auto py-5`" role="main">
    <div class="z-0">
      <header id="article-header" class="px-5 lg:px-0">
        <div class="flex items-center">
          <g-link class="flex-none text-lg leading-none" to="/">
            <span class="font-bold text-gray-200">Nusa</span>
            <span class="font-bold text-blue-500">data</span>
          </g-link>

          <div class="flex-1 flex justify-end text-right text-sm">
            <g-link
              class="py-5 text-gray-500 hover:text-gray-400 mr-5"
              to="/collections/">
              Collections
            </g-link>
            <a
              class="py-5 text-gray-500 hover:text-gray-400"
              href="https://github.com/nusadata/web">
              Repository
            </a>
          </div>
        </div>

        <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
        <p class="font-bold text-4xl pt-10 mb-2"><span class="text-blue-500">Coronavirus</span> Timeline</p>
        <p class="text-gray-500">This page provides timeline visualization regarding the government actions in response to COVID-19 pandemic starting from the first case to this day. We will update this page regularly following to the latest development of pandemic situation in Indonesia. Best viewed in desktop platform.</p>
        <div class="flex flex-col items-center pt-20 pb-10">
          <p class="text-gray-500">Scroll down to navigate</p>
					<span class="text-gray-500">
						<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<polyline points="19 12 12 19 5 12"></polyline>
						</svg>
					</span>
         </div>
      </header>
      <div class="relative viewbox">
        <div class="article-container w-1/2 z-10 px-5 lg:px-0">
          <article class="py-5">
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
                  Activities began to be restricted
                </h2>
                <p class="mb-2">
                  Following to President Joko Widodo call on social distancing, major Jakarta companies started conducting work from home policy [1]. Several regions closed schools and imposed learning activity from home [2]. MUI issued a fatwa to forbid non-compulsory worships in mosque during pandemic [3]. On 17 March, COVID-19 health protocols have been released to public [4].
                </p>
                <p class="text-sm text-gray-500">
                  (source:
                    [1] <a class="underline" href="https://www.thejakartapost.com/news/2020/03/15/work-from-home-policy-in-effect-at-major-jakarta-companies-over-virus-concerns.html" rel="nofollow noopener">The Jakarta Post</a>
                    [2] <a class="underline" href="https://www.bbc.com/indonesia/indonesia-51769074" rel="nofollow noopener">BBC</a>
                    [3] <a class="underline" href="https://covid19.go.id/p/protokol/fatwa-majelis-ulama-indonesia-nomor-14-tahun-2020-tentang-penyelenggaran-ibadah-dalam-situasi-terjadi-wabah-covid-19" rel="nofollow noopener">Fatwa MUI number 14 2020</a>
                    [4] <a class="underline" href="https://www.kompas.com/tren/read/2020/03/17/105258465/berikut-protokol-kesehatan-jika-alami-gejala-virus-corona" target="__blank" rel="nofollow noopener">Kompas.com</a>
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
              <section v-show="currentDate >= new Date('2020-05-04T00:00:00.000Z').getTime() &&
                               currentDate < new Date('2020-05-06T00:00:00.000Z').getTime()">
                <p class="text-gray-500 font-semibold">4 May 2020</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  Regional elections are postponed
                </h2>
                <p class="mb-2">
                  President issued a regulation to postpone 2020 regional elections until December with a potential to prolong the postponement should the national disaster persist.
                </p>
                <p class="text-sm text-gray-500">
                  (source: <a class="underline" href="https://jdih.setneg.go.id/viewpdfperaturan/P18867/Perpu%20Nomor%202%20Tahun%202020" target="__blank" rel="nofollow noopener">jdih.setneg.go.id</a>
                  )
                </p>
              </section>
            </transition>
            <transition name="fade">
              <section v-show="currentDate >= new Date('2020-05-06T00:00:00.000Z').getTime() &&
                               currentDate < new Date('2020-05-09T00:00:00.000Z').getTime()">
                <p class="text-gray-500 font-semibold">6 May 2020</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  Public transportation was allowed to operate but not for 'mudik'
                </h2>
                <p class="mb-2">
                  Transportation Minister said that it was possible for the government to allow all means of public transportation to start operations on 7 May to accommodate particular individuals while insisting on banning this year’s Idul Fitri mudik.
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
                  The government began to tighten its monitoring of the mudik ban as the Idul Fitri holiday on 24-25 May was approaching. Violators would either be stopped or turned back.
                </p>
                <p class="text-sm text-gray-500">
                  (source: <a class="underline" href="https://www.thejakartapost.com/news/2020/05/19/covid-19-govt-to-tighten-security-at-mudik-ban-checkpoints-as-idul-fitri-approaches.html" target="__blank" rel="nofollow noopener">The Jakarta Post</a>
                  )
                </p>
              </section>
            </transition>
            <transition name="fade">
              <section v-show="currentDate >= new Date('2020-05-29T00:00:00.000Z').getTime() &&
                               currentDate < new Date('2020-06-01T00:00:00.000Z').getTime()">
                <p class="text-gray-500 font-semibold">29 May 2020</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  Religious activities on public are starting to return
                </h2>
                <p class="mb-2">
                  Using SE 15/2020, the Minister of Religious Affairs allows houses of worship to reopen if it is deemed safe by its respective regional head of COVID-19 Task Force and as long as they implement a strict health and hygiene protocol.
                </p>
                <p class="text-sm text-gray-500">
                  (source: <a class="underline" href="https://covid19.go.id/storage/app/media/Regulasi/SE%20Menag%20Nomor%2015%202020%20Rumah%20Ibadah.pdf" target="__blank" rel="nofollow noopener">covid19.go.id</a>
                  )
                </p>
              </section>
            </transition>
            <transition name="fade">
              <section v-show="currentDate >= new Date('2020-06-04T00:00:00.000Z').getTime() &&
                               currentDate < new Date('2020-06-07T00:00:00.000Z').getTime()">
                <p class="text-gray-500 font-semibold">4 June 2020</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  PSBB begins to relax
                </h2>
                <p class="mb-2">
                  Jakarta Governor Anies Baswedan has issued Pergub No. 51/2020 on the implementation of relaxing PSBB (transitional PSBB). The document lists various regulations in place during transitional PSBB period, such as allowing business to operate with 50% presence.
                </p>
                <p class="text-sm text-gray-500">
                  (source: <a class="underline" href="https://covid19.go.id/p/protokol/pergub-51-tahun-2020-tentang-pelaksanaan-psbb-transisi" target="__blank" rel="nofollow noopener">covid19.go.id</a>
                  )
                </p>
              </section>
            </transition>
            <transition name="fade">
              <section v-show="currentDate >= new Date('2020-06-08T00:00:00.000Z').getTime() &&
                               currentDate < new Date('2020-06-11T00:00:00.000Z').getTime()">
                <p class="text-gray-500 font-semibold">8 June 2020</p>
                <h2 class="text-3xl font-bold leading-tight mb-2">
                  Ojek to return operating
                </h2>
                <p class="mb-2">
                  The Ministry of Transportation has issued regulation Permenhub No. 41/2020 to relax the various restrictions placed by the previous regulation (Permenhub No. 18/2020). The relaxations include allowing motorcycle taxi services (ojek) to continue operating again and increase the maximum capacity of flight passengers to 70%.
                </p>
                <p class="text-sm text-gray-500">
                  (source: <a class="underline" href="https://covid19.go.id/storage/app/media/Regulasi/PM%2041%20TAHUN%202020.pdf" target="__blank" rel="nofollow noopener">covid19.go.id</a>
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
          <p class="mb-5">Wash your hands often</p>
          <p class="mb-5">Always use mask on public</p>
          <p class="mb-5">Keep 1.5m distance from each other</p>
          <p>Stay safe, stay healthy</p>
        </div>
      </div>
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
      return 'Coronavirus Timeline in Indonesia - Nusadata'
    },
    description() {
      return 'This page provides timeline visualization regarding the government actions in response to COVID-19 pandemic. This page is best viewed in desktop platform.'
    },
    url() {
      return `${this.$page.metadata.siteUrl}/coronavirus-timeline/`
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
        { date: '2020-05-04T00:00:00.000Z', value: 395 },
        { date: '2020-05-06T00:00:00.000Z', value: 368 },
        { date: '2020-05-20T00:00:00.000Z', value: 693 },
        { date: '2020-05-29T00:00:00.000Z', value: 678 },
        { date: '2020-06-04T00:00:00.000Z', value: 585 },
        { date: '2020-06-08T00:00:00.000Z', value: 847 },
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

    // Important note: these need to be declare first because we need to display
    // scroll first before getting the correct width
		const headerRect = document.querySelector('#article-header').getBoundingClientRect()
    const scrollLength = 15000
    let footerRect = document.querySelector('#article-footer').getBoundingClientRect()
    document.querySelector('.viewbox').setAttribute(
      'style',
      `height: ${scrollLength + footerRect.height}px`
    )

    const viewboxRect = document.querySelector('.viewbox').getBoundingClientRect()
    const viewboxWidth = document.querySelector('.viewbox').offsetWidth - (20 * 2) // 20px == 1.25rem
    const viewboxHeight = window.innerHeight

    this.scrollFn = this.$d3.scaleLinear().domain([headerRect.bottom, scrollLength]).range([0, viewboxWidth])

    document.querySelector('.viewbox').setAttribute('style', `height: ${scrollLength}px`)
    document.querySelector('.content-container').setAttribute('style', `position: absolute; top: 0; left: 0`)
		document.querySelector('.article-container').setAttribute('style', `position: absolute; top: 0; left: 0`)


    footerRect = document.querySelector('#article-footer').getBoundingClientRect()
    const contentRect = document.querySelector('.content-container').getBoundingClientRect()

    window.addEventListener("scroll", () => {
        this.scrollY = this.scrollFn(window.scrollY)
        const top = footerRect.top - contentRect.height - footerRect.height
        if (window.scrollY >= top) {
          document.querySelector('.content-container').setAttribute('style', `position: absolute; bottom: ${footerRect.height}px; left: 0`)
          document.querySelector('.article-container').setAttribute('style', `position: absolute; bottom: ${footerRect.height}px; left: 0`)
        } else if (window.scrollY >= headerRect.bottom) {
          document.querySelector('.content-container').setAttribute('style', `position: fixed; top: 0; left: ${viewboxRect.left}px;`)
					document.querySelector('.article-container').setAttribute('style', `position: fixed; top: 0; left: ${viewboxRect.left}px;`)
        } else {
          document.querySelector('.content-container').setAttribute('style', `position: absolute; top: 0; left: 0`)
		      document.querySelector('.article-container').setAttribute('style', `position: absolute; top: 0; left: 0`)
				}
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
      const marginX = 15
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
