<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-10 mx-auto overflow-x-hidden`">
    <header class="mx-5 lg:mx-0">
      <h2
        id="summary-of-dengue-fever"
        class="font-semibold text-2xl pt-4 mb-4"
      >
        {{ $d[locale].summary }}
      </h2>
    </header>
    <ul class="flex flex-wrap -mx-5 px-5 lg:px-0">
      <li class="mx-5 mb-5">
        <p class="mb-2">
          {{ $d[locale].avg_total_cases_per_year }}
        </p>
        <p class="text-4xl text-blue-400 leading-none">
          {{ $delimiter(Math.ceil(summary.average_total_cases)) }}
        </p>
      </li>
      <li class="mx-5 mb-5">
        <p class="mb-2">
          {{ $d[locale].highest_total_cases_over_period }}
        </p>
        <p class="mb-2 text-4xl text-blue-400 leading-none">
          {{ $delimiter(summary.max_total_cases) }}
        </p>
        <p class="text-gray-500">
          {{ $d[locale].in }} {{ summary.province_with_max_total_cases }} {{ summary.year_with_max_total_cases }}
        </p>
      </li>
      <li class="mx-5 mb-5">
        <p class="mb-2">
          {{ $d[locale].highest_death_cases_over_period }}
        </p>
        <p class="mb-2 text-4xl text-blue-400 leading-none">
          {{ $delimiter(summary.max_death_cases) }}
        </p>
        <p class="text-gray-500">
          {{ $d[locale].in }} {{ summary.province_with_max_death_cases }} {{ summary.year_with_max_death_cases }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import summary from '~/data/dengue-summary.json'

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'sdv'
    },
    locale: {
      type: String,
      default: 'en',
    },
  },
  data() {
    return  {
      summary,
    }
  }
}
</script>
