<template>
  <div>
    <div class="text-center mt-5 mb-16">
      <span class="bg-gray-800 rounded px-3 py-1 text-xs max-w-sm mx-auto">
        Click or tap on date with dots to view events
      </span>
    </div>


    <div class="mb-10 flex flex-col items-center text-sm">
      <div class="mb-1 w-full max-w-sm">
        <p class="text-center">New cases per day</p>
      </div>
      <div class="w-full max-w-sm flex items-center">
        <div class="flex-none">
          <p class="mr-2">1</p>
        </div>
        <div class="w-full" :style="calendarLegendStyle"/>
        <div class="flex-none text-right">
          <p class="ml-2">{{ this.maxCases }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-center md:items-start overflow-x-auto">
      <article v-for="(month, monthName) in monthsEnum"
        :key="monthName"
        class="mb-10 mr-0 md:mr-10"
        :style="calendarStyle">
        <h2 class="capitalize text-lg text-center mb-2">{{ monthName }}</h2>
        <header class="flex flex-wrap" :style="calendarStyle">
          <div v-for="dayName in dayNames" :key="dayName" class="text-sm sm:text-base text-gray-500" :style="calendarDayStyle">
            {{ dayName }}
          </div>
        </header>

        <div class="flex flex-wrap">
          <button v-for="day in getFirstDay(2020, month)" :key="day" class="text-sm sm:text-base" :style="calendarDayStyle"/>
          <day
            v-for="date in getDaysInMonth(2020, month)"
            :key="`date-${date}`"
            :data-obj="getCalendarDayObj(2020, month, date)"
            @click="openEvent">
            {{ date }}
          </day>
        </div>
      </article>
    </div>

    <div class="text-center mt-5 mb-16">
      <span class="bg-gray-800 rounded px-3 py-1 text-xs max-w-sm mx-auto">
        Click or tap on date with dots to view events
      </span>
    </div>


    <Modal v-if="event">
      <div class="w-screen max-w-lg max-h-screen overflow-y-auto">
        <header class="flex">
          <h2 class="flex-1 px-5 py-3 text-gray-400">
            {{ event.formatted_date }}
          </h2>
          <button class="flex-none flex items-center justify-center px-3 text-gray-600 hover:text-gray-500" @click="closeEvent">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <section class="px-5 py-3">
          <div class="mb-6">
            <p class="inline-block rounded px-3 py-1 bg-gray-700 text-sm">Number of new cases: {{ event.numOfCases }}</p>
          </div>
          <ul>
            <li v-for="(source, id) in event.sources" :key="id" class="mb-6">
              <p class="text-base mb-2">{{ source.content }}</p>
              <div class="text-sm text-gray-500">
                <a class="underline" :href="source.url" target="__blank" rel="nofollow noreferrer">{{ source.name }}</a>
              </div>
             </li>
          </ul>
        </section>
      </div>
    </Modal>

  </div>
</template>

<script>
import events from '../data/coronavirus-calendar.json'
import Day from './CoronavirusTrendInCalendarDay.vue'
import Modal from './Modal.vue'

const maxCalendarDaySize = 60

export default {
  components: { Day, Modal },
  props: {
    daily: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      bgColorFn: null,
      fgColorFn: null,
      ratioFn: null,
      event: null,
      maxCases: 0,
      calendarDaySize: maxCalendarDaySize,
    };
  },
  computed: {
    dayNames() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    monthsEnum() {
      return {
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
      }
    },
    calendarStyle() {
      return {
        width: `${this.calendarDaySize * 7}px`,
      }
    },
    calendarDayStyle() {
      return {
        width: `${this.calendarDaySize}px`,
        height: `${this.calendarDaySize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
    calendarLegendStyle() {
      const shades = this.$d3.schemeBlues[9]
      const factor = 100 / (shades.length - 1)

      let gradientValue = 'linear-gradient(90deg'
      let point = 0

      shades.forEach(shade => {
        gradientValue += `, ${shade} ${point}%`
        point += factor
      })

      gradientValue += ')'

      return {
        background: `${shades[shades.length - 1]}`,
        background: gradientValue,
        height: '10px',
      }
    },
  },
  created() {
    this.bgColorFn = this.$d3.interpolateBlues
    this.fgColorFn = this.$d3.scaleQuantize([0, 1], ['#1a202c', '#edf2f7'])
    this.maxCases = this.$d3.max(this.daily, d => d.jumlah_positif.value)
    this.ratioFn = this.$d3.scaleLinear()
      .domain([0, this.maxCases])
      .range([0, 1])
  },
  mounted() {
    this.setCalendarDaySize()
    let timeout
    window.addEventListener('resize', () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout)
      }
      timeout = window.requestAnimationFrame(this.setCalendarDaySize)
    }, false)
  },
  methods: {
    setCalendarDaySize() {
      const calendarWidth = this.$el.offsetWidth
      const calendarDaySize = calendarWidth / 7
      this.calendarDaySize = (maxCalendarDaySize * 7) > calendarWidth ? calendarDaySize : maxCalendarDaySize
    },
    getFirstDay(year, month) {
      return (new Date(year, month)).getDay()
    },
    getDaysInMonth(year, month) {
      const lastDate = new Date(year, month + 1, 0)
      return lastDate.getDate()
    },
    getCalendarDayObj(year, month, date) {
      const data = this.daily.find(item => {
        const dateObj = new Date(item.key)
        return year === dateObj.getFullYear() &&
          month === dateObj.getMonth() &&
          date === dateObj.getDate()
      })

      if (data) {
        const ratio = this.ratioFn(data.jumlah_positif.value)
        const selectedEvent = events.find(event => {
          const dateObj = new Date(event.date)
          return year === dateObj.getFullYear() &&
            month === dateObj.getMonth() &&
            date === dateObj.getDate()
        })

        const bgColor = data.jumlah_positif.value === 0 ? 'transparent' : this.bgColorFn(ratio)
        const fgColor = data.jumlah_positif.value === 0 ? this.fgColorFn(1) : this.fgColorFn(ratio)

        return {
          backgroundColor: `${bgColor}`,
          color: `${fgColor}`,
          event: selectedEvent,
          numOfCases: data.jumlah_positif.value,
          ...this.calendarDayStyle,
        }
      }

      const currentTime = (new Date()).getTime()
      const selectedTime = (new Date(year, month, date)).getTime()

      if (selectedTime > currentTime) {
        return Object.assign({}, this.calendarDayStyle, { color: '#4a5568', cursor: 'default' })
      }

      return this.calendarDayStyle
    },
    openEvent({ event, numOfCases }) {
      this.event = event
      this.event.numOfCases = numOfCases
      document.querySelector('body').style.overflow = 'hidden'
    },
    closeEvent() {
      this.event = null
      document.querySelector('body').style.overflow = 'initial'
    }
  }
}
</script>
