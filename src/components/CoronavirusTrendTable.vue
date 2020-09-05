<template>
  <section :class="`${selectorPrefix} max-w-4xl mb-24 mx-auto overflow-x-hidden`">
    <header>
      <p class="text-gray-500 font-semibold mx-5 lg:mx-0 text-sm mb-1">Sampai {{ daily[daily.length - 1].date }}</p>
      <h2
        id="trend-of-coronavirus-by-province"
        class="font-semibold text-xl sm:text-2xl mx-5 lg:mx-0 mb-8">
        Perkembangan kasus di tiap provinsi
      </h2>
    </header>
    <div class="max-w-4xl px-5 lg:px-0">
      <div class="overflow-x-auto">
        <table class="relative" style="width: 896px;">
          <thead class="text-left">
            <tr>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-40 left-0 sticky bg-gray-900 border-shadow" style="height: 100px;">
                Provinsi
              </th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Total kasus</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Kasus baru</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Rataan kasus 7 hari</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Peningkatan kasus 7 hari</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Rataan kasus 14 hari</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Peningkatan kasus 14 hari</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2" style="width: 150px;">Tren kasus 30 hari (rolling avg)</th>
              <th class="uppercase font-normal text-sm text-gray-500 p-2 w-16">Total kasus per 1 juta*</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(province, key, index) in provinces" :key="province.slug" :class="{ 'bg-gray-800': (index % 2) > 0 }">
              <td class="p-2 text-sm w-40 left-0 sticky border-shadow" style="height: 56px;" :class="((index % 2) > 0 ? 'bg-gray-800' : 'bg-gray-900')">
                {{ province.name }}
              </td>
              <td class="p-2 text-sm text-right">{{ $delimiter(calculateTotalByProvince(daily, key)) }}</td>
              <td class="p-2 text-sm text-right">{{ $delimiter(latestUpdate.filter(item => item.key === key)[0].cases) }}</td>
              <td class="p-2 text-sm text-right">
                {{ $delimiter(calculateAvg(twoWeekUpdate, key, 7).avg) }}
              </td>
              <td class="p-2 text-sm text-right">
                <span :class="(calculateAvg(twoWeekUpdate, key, 7).diff > 0 ? 'text-red-500' : 'text-green-500')">
                  {{ calculateAvg(twoWeekUpdate, key, 7).diff }}%
                </span>
              </td>
              <td class="p-2 text-sm text-right">
                {{ $delimiter(calculateAvg(fourWeekUpdate, key, 14).avg) }}
              </td>
              <td class="p-2 text-sm text-right">
                <span :class="(calculateAvg(fourWeekUpdate, key, 14).diff > 0 ? 'text-red-500' : 'text-green-500')">
                  {{ calculateAvg(fourWeekUpdate, key, 14).diff }}%
                </span>
              </td>
              <td class="p-2">
                <CoronavirusTrendRollingAvg :province-slug="province.slug" :province-key="key" :daily="daily"/>
              </td>
              <td class="p-2 text-sm text-right">
                {{ $delimiter(calculateCasesPerOneMillion(latestUpdate.filter(item => item.key === key)[0].total_cases, province.population)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-8 text-sm text-gray-500">* perhitungan menggunakan data populasi penduduk tahun 2018</p>
    </div>
  </section>
</template>

<script>
import CoronavirusTrendRollingAvg from './CoronavirusTrendRollingAvg.vue';

export default {
  props: {
    selectorPrefix: {
      type: String,
      default: 'ctts'
    },
    daily: {
      type: Array,
      required: true
    },
    provinces: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      default: 'en',
    }
  },
  components: {
    CoronavirusTrendRollingAvg,
  },
  computed: {
    latestUpdate() {
      return this.daily[this.daily.length - 1].data;
    },
    twoWeekUpdate() {
      const length = this.daily.length;
      return this.daily.slice(length - 14, length);
    },
    fourWeekUpdate() {
      const length = this.daily.length;
      return this.daily.slice(length - 28, length);
    },
  },
  methods: {
    calculateTotalByProvince(data, key) {
      return data.reduce((acc, item) => acc + item.data.filter(l => l.key === key)[0].cases, 0);
    },
    calculateAvgByProvince(data, key) {
      return Math.ceil(this.calculateTotalByProvince(data, key) / data.length);
    },
    calculateAvg(data, key, days = 7) {
      const firstAvg = this.calculateAvgByProvince(data.slice(0, days), key);
      const secondAvg = this.calculateAvgByProvince(data.slice(days, days * 2), key);
      const diffInPercentage = ((secondAvg - firstAvg) / firstAvg) * 100;
      return {
        avg: secondAvg,
        diff: Math.ceil(diffInPercentage),
      };
    },
    calculateCasesPerOneMillion(data, population) {
      return Math.ceil(data / population * 1000000)
    },
  },
}
</script>

<style scoped>
.border-shadow {
  box-shadow: 2px 4px 6px -1px rgba(0, 0, 0, 0.5);
}
</style>
