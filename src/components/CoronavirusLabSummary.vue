<template>
  <section :class="`max-w-4xl mb-10 mx-auto overflow-x-hidden`">
    <header>
      <h2
        id="summary-of-labs"
        class="font-semibold text-2xl mx-5 lg:mx-0 my-4">
        {{ $d[locale].testing_labs_availability }}
      </h2>
    </header>
    <ul class="flex flex-wrap -mx-5 px-5 lg:px-0">
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">{{ $d[locale].total_labs }}</p>
          <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalLabs) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">{{ $d[locale].pcr_labs }}</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.pcrLabs.total) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">{{ $d[locale].tcm_labs }}</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.tcmLabs.total) }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import records from '~/data/coronavirus-tests.json'

export default {
  props: {
    locale: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    summary() {
      const lastRecord = records[records.length - 1]
      return {
        totalLabs: lastRecord.online_lab.total,
        pcrLabs: {
          total: lastRecord.lab.pcr + lastRecord.online_lab.pcr,
        },
        tcmLabs: {
          total: lastRecord.lab.tcm + lastRecord.online_lab.tcm,
        }
      }
    }
  }
}
</script>
