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
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Total confirmed cases</p>
          <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalCases) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">New cases</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.newCases) }}</p>
          <p class="text-gray-500">
          <span :class="(summary.percentMarginNewCasesPastDay > 0 ? 'text-red-500' : 'text-green-500')">
            {{ summary.percentMarginNewCasesPastDay > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginNewCasesPastDay) }}%
          </span>
          from previous day
          </p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Avg cases in one week</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(Math.ceil(summary.avgCasesOneWeek)) }}</p>
          <p class="text-gray-500">
          <span :class="(summary.percentMarginAvgCasesOneWeek > 0 ? 'text-red-500' : 'text-green-500')">
            {{ summary.percentMarginAvgCasesOneWeek > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginAvgCasesOneWeek) }}%
          </span>
          from previous week
          </p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Highest new cases</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">
          {{ summary.highestNewCasesInProvince.value }}
          </p>
          <p v-if="summary.highestNewCasesInProvince.province" class="text-gray-500">
          in {{ provinces[summary.highestNewCasesInProvince.province].name }}
          </p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Total specimen tested</p>
          <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalSpecimenTests) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Total people tested</p>
          <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalTests) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">New people tested</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.newTests) }}</p>
          <p class="text-gray-500">
          <span :class="(summary.percentMarginNewTestsPastDay > 0 ? 'text-green-500' : 'text-red-500')">
            {{ summary.percentMarginNewTestsPastDay > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginNewTestsPastDay) }}%
          </span>
          from previous day
          </p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Avg tests in one week</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(Math.ceil(summary.avgTestsOneWeek)) }}</p>
          <p class="text-gray-500">
          <span :class="(summary.percentMarginAvgTestsOneWeek > 0 ? 'text-green-500' : 'text-red-500')">
            {{ summary.percentMarginAvgTestsOneWeek > 0 ? '+' : '' }}{{ Math.ceil(summary.percentMarginAvgTestsOneWeek) }}%
          </span>
          from previous week
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import testRecords from '~/data/coronavirus-tests.json'

export default {
  props: {
    daily: {
      type: Array,
      required: true
    },
    provinceDaily: {
      type: Array,
      required: true
    },
    provinces: {
      type: Object,
      required: true
    }
  },
  computed: {
    summary() {
      const [newCases, percentMarginNewCasesPastDay] = getNewCases(this.daily)
      const [avgCasesOneWeek, percentMarginAvgCasesOneWeek] = getAverageCasesPastOneWeek(this.daily)

      const [newTests, percentMarginNewTestsPastDay] = getNewTests(testRecords)
      const [avgTestsOneWeek, percentMarginAvgTestsOneWeek] = getAverageTestsPastOneWeek(testRecords)

      return {
        totalCases: getTotalCases(this.daily),
        newCases,
        percentMarginNewCasesPastDay,
        avgCasesOneWeek,
        percentMarginAvgCasesOneWeek,
        highestNewCasesInProvince: getHighestNewCasesInProvince(this.provinceDaily),
        totalSpecimenTests: testRecords[testRecords.length - 1].specimen_tests.total,
        totalTests: getTotalTests(testRecords),
        newTests,
        percentMarginNewTestsPastDay,
        avgTestsOneWeek,
        percentMarginAvgTestsOneWeek,
      }
    }
  }
}

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

function getHighestNewCasesInProvince(records) {
  const latestRecords = records[records.length - 1].data
  let maxRecord = 0
  let province = ''
  latestRecords.forEach(record => {
    if (record.cases > maxRecord) {
      maxRecord = record.cases
      province = record.key
    }
  })
  return {
    value: maxRecord,
    province,
  }
}

function getTotalTests(records) {
  return records[records.length - 1].people_tests.total
}

function getNewTests(records) {
  const newTests = records[records.length - 1].people_tests.daily.total
  const pastDayTests = records[records.length - 2].people_tests.daily.total
  return [newTests, ((newTests - pastDayTests) / pastDayTests * 100)]
}

function getAverageTestsPastOneWeek(records) {
  const latestRecord = records[records.length - 1].people_tests.total
  const pastOneWeekRecord = records[records.length - 7].people_tests.total
  const totalCasesPastOneWeek = latestRecord - pastOneWeekRecord
  const avgCasesPastOneWeek = totalCasesPastOneWeek / 7

  const recordsWithoutPastOneWeek = records.slice(0, records.length - 7)
  const latestTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 1].people_tests.total
  const pastTwoWeekRecord = recordsWithoutPastOneWeek[recordsWithoutPastOneWeek.length - 7].people_tests.total
  const totalCasesPastTwoWeek = latestTwoWeekRecord - pastTwoWeekRecord
  const avgCasesPastTwoWeek = totalCasesPastTwoWeek / 7

  return [avgCasesPastOneWeek, ((avgCasesPastOneWeek - avgCasesPastTwoWeek) / avgCasesPastTwoWeek * 100)]
}
</script>
