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
            {{ summary.percentMarginNewCasesPastDay > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginNewCasesPastDay) }}%
          </span>
          from previous day
        </p>
      </li>
      <li class="mx-5 mb-5">
        <p class="mb-2">Average cases in one week</p>
        <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(Math.ceil(summary.avgCasesOneWeek)) }}</p>
        <p class="text-gray-500">
          <span :class="(summary.percentMarginAvgCasesOneWeek > 0 ? 'text-red-500' : 'text-green-500')">
            {{ summary.percentMarginAvgCasesOneWeek > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginAvgCasesOneWeek) }}%
          </span>
          from previous week
        </p>
      </li>
    </ul>
  </section>
</template>

<script>

function getTotalCases(records) {
  return records[records.length - 1].jumlah_positif_kum.value
}

function getNewCases(records) {
  const newCases = records[records.length - 1].jumlah_positif.value
  const pastDayCases = records[records.length - 2].jumlah_positif.value
  return [newCases, ((newCases - pastDayCases) / pastDayCases * 100)]
}

function getAverageCasesPastOneWeek(records) {
  const latestRecord = records[records.length - 1].jumlah_positif_kum.value
  const pastOneWeekRecord = records[records.length - 7].jumlah_positif_kum.value
  const totalCasesPastOneWeek = latestRecord - pastOneWeekRecord
  const avgCasesPastOneWeek = totalCasesPastOneWeek / 7

  const recordsWithoutPastOneWeek = records.slice(0, records.length - 7)
  const latestTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 1].jumlah_positif_kum.value
  const pastTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 7].jumlah_positif_kum.value
  const totalCasesPastTwoWeek = latestTwoWeekRecord - pastTwoWeekRecord
  const avgCasesPastTwoWeek = totalCasesPastTwoWeek / 7

  return [avgCasesPastOneWeek, ((avgCasesPastOneWeek - avgCasesPastTwoWeek) / avgCasesPastTwoWeek * 100)]
}

export default {
  props: {
    daily: {
      type: Array,
      required: true
    }
  },
  computed: {
    summary() {
      const [newCases, percentMarginNewCasesPastDay] = getNewCases(this.daily)
      const [avgCasesOneWeek, percentMarginAvgCasesOneWeek] = getAverageCasesPastOneWeek(this.daily)
      return {
        totalCases: getTotalCases(this.daily),
        newCases,
        percentMarginNewCasesPastDay,
        avgCasesOneWeek,
        percentMarginAvgCasesOneWeek,
      }
    }
  }
}
</script>
