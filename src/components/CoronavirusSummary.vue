<template>
  <section :class="`max-w-4xl mb-10 mx-auto overflow-x-hidden`">
    <header>
      <h2
        id="summary-of-coronavirus"
        class="font-semibold text-2xl mx-5 lg:mx-0 my-4">
        Summary
      </h2>
    </header>
    <ul class="flex flex-wrap -mx-5 px-5 lg:px-0">
      <li class="mx-5 mb-5">
        <p class="mb-2">Total confirmed cases</p>
        <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalCases) }}</p>
      </li>
      <li class="mx-5 mb-5">
        <p class="mb-2">New cases</p>
        <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.newCases) }}</p>
        <p class="text-gray-500">
          <span :class="(summary.percentMarginNewCasesPastDay > 0 ? 'text-red-500' : 'text-green-500')">
            {{ summary.percentMarginNewCasesPastDay > 0 ? '+' : '-' }}{{ Math.ceil(summary.percentMarginNewCasesPastDay) }}%
          </span>
          from previous day
        </p>
      </li>
      <li class="mx-5 mb-5">
        <p class="mb-2">Average cases in one week</p>
        <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(Math.ceil(summary.avgCasesOneWeek)) }}</p>
        <p class="text-gray-500">
          <span :class="(summary.percentMarginAvgCasesOneWeek > 0 ? 'text-red-500' : 'text-green-500')">
            {{ summary.percentMarginAvgCasesOneWeek > 0 ? '+' : '-' }}{{ Math.ceil(summary.percentMarginAvgCasesOneWeek) }}%
          </span>
          from previous week
        </p>
      </li>
    </ul>
  </section>
</template>

<script>

function getTotalCases(records) {
  if (records.length) {
    return records[records.length - 1].Cases
  }
  return 0
}

function getNewCases(records) {
  if (records.length) {
    const newCases = records[records.length - 1].Cases - records[records.length - 2].Cases
    const pastDayCases = records[records.length - 2].Cases - records[records.length - 3].Cases
    return [newCases, ((newCases - pastDayCases) / pastDayCases * 100)]
  }
  return [0, 0]
}

function getAverageCasesPastOneWeek(records) {
  if (records.length) {
    const latestRecord = records[records.length - 1]
    const pastOneWeekRecord = records[records.length - 7]
    const totalCasesPastOneWeek = latestRecord.Cases - pastOneWeekRecord.Cases
    const avgCasesPastOneWeek = totalCasesPastOneWeek / 7

    const recordsWithoutPastOneWeek = records.slice(0, records.length - 7)
    const latestTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 1]
    const pastTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 7]
    const totalCasesPastTwoWeek = latestTwoWeekRecord.Cases - pastTwoWeekRecord.Cases
    const avgCasesPastTwoWeek = totalCasesPastTwoWeek / 7

    return [avgCasesPastOneWeek, ((avgCasesPastOneWeek - avgCasesPastTwoWeek) / avgCasesPastTwoWeek * 100)]
  }
  return [0, 0]
}

export default {
  computed: {
    summary() {
      const [newCases, percentMarginNewCasesPastDay] = getNewCases(this.confirmed)
      const [avgCasesOneWeek, percentMarginAvgCasesOneWeek] = getAverageCasesPastOneWeek(this.confirmed)
      return {
        totalCases: getTotalCases(this.confirmed),
        newCases,
        percentMarginNewCasesPastDay,
        avgCasesOneWeek,
        percentMarginAvgCasesOneWeek,
      }
    }
  },
  data() {
    return {
      confirmed: [],
      deaths: [],
      recovered: []
    }
  },
  async mounted() {
    const [confirmed, deaths, recovered] = await this.fetchResource()
    this.confirmed = await confirmed.json()
    this.deaths = await deaths.json()
    this.recovered = await recovered.json()
  },
  methods: {
    async fetchResource() {
      const request = Promise.all([
        fetch('https://api.covid19api.com/dayone/country/indonesia/status/confirmed'),
        fetch('https://api.covid19api.com/dayone/country/indonesia/status/deaths'),
        fetch('https://api.covid19api.com/dayone/country/indonesia/status/recovered')
      ])
      return request
    }
  }
}
</script>
