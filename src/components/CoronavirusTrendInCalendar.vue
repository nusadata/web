<template>
  <div class="flex flex-col md:flex-row items-center md:items-start">
    <article v-for="(month, monthName) in monthsEnum" :key="monthName" class="mb-10 mr-10" :style="calendarStyle">
      <h2 class="capitalize text-lg text-center mb-2">{{ monthName }}</h2>
      <header class="flex flex-wrap" :style="calendarStyle">
        <div v-for="dayName in dayNames" :key="dayName" class="text-gray-500" :style="calendarDayStyle">
          {{ dayName }}
        </div>
      </header>

      <div class="flex flex-wrap">
        <button v-for="day in getFirstDay(2020, month)" :key="day" :style="calendarDayStyle"/>
        <day
          v-for="date in getDaysInMonth(2020, month)"
          :key="`date-${date}`"
          :data-obj="getCalendarDayObj(2020, month, date)"
          @click="openEvent(2020, month, date)">
          {{ date }}
        </day>
      </div>
    </article>
    <Modal v-if="event">
      <div class="w-screen max-w-lg overflow-y-auto">
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
          <h3 class="text-xl mb-6">Events in this date</h3>
          <ul>
            <li v-for="(source, id) in event.sources" :key="id" class="mb-6">
              <p class="text-base mb-2">{{ source.content }}</p>
              <div class="text-sm text-gray-500">
                <a class="underline" :href="source.url">{{ source.name }}</a>
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

const calendarDaySize = 60

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
        width: `${calendarDaySize * 7}px`,
      }
    },
    calendarDayStyle() {
      return {
        width: `${calendarDaySize}px`,
        height: `${calendarDaySize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
  },
  created() {
    this.bgColorFn = this.$d3.interpolateBlues
    this.fgColorFn = this.$d3.scaleQuantize([0, 1], ['#1a202c', '#edf2f7'])
    this.ratioFn = this.$d3.scaleLinear()
      .domain([0, this.$d3.max(this.daily, d => d.jumlah_positif.value)])
      .range([0, 1])
  },
  methods: {
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
        return {
          backgroundColor: `${this.bgColorFn(ratio)}`,
          color: `${this.fgColorFn(ratio)}`,
          event: selectedEvent,
          ...this.calendarDayStyle,
        }
      }

      return this.calendarDayStyle
    },
    openEvent(year, month, date) {
      const event = events.find(item => {
        const dateObj = new Date(item.date)
        return year === dateObj.getFullYear() &&
          month === dateObj.getMonth() &&
          date === dateObj.getDate()
      })
      this.event = event
      document.querySelector('body').style.overflow = 'hidden'
    },
    closeEvent() {
      this.event = null
      document.querySelector('body').style.overflow = 'initial'
    }
  }
}
</script>
