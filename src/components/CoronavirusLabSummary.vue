<template>
  <section :class="`max-w-4xl mb-10 mx-auto overflow-x-hidden`">
    <header>
      <h2
        id="summary-of-labs"
        class="font-semibold text-2xl mx-5 lg:mx-0 my-4">
        Testing labs availability
      </h2>
      <p class="mx-5 lg:mx-0 mb-5 text-gray-500">
        There are three types of COVID-19 testing conducted by the government: rapid test, polymerase chain reaction (PCR) and 'test cepat molekuler' (TCM). Rapid test is usually performed as a screening procedure, and it only takes about 10-15 minutes (<a class="underline" href="https://www.alodokter.com/kenali-apa-itu-rapid-test-untuk-virus-corona" target="__blank" rel="nofollow noreferrer">alodokter</a>). If a rapid test result is positive, then the person should undergone PCR test which takes about 1-3 days (<a class="underline" href="https://katadata.co.id/berita/2020/03/16/unair-dan-eijkman-jadi-laboratorium-corona-berapa-lama-hasil-tesnya" target="__blank" rel="nofollow noreferrer">katadata</a>). To complement rapid test and PCR test, the government also makes use of tuberculosis examination machine or TCM which are already available in 132 hospitals across the country (<a class="underline" href="https://health.detik.com/berita-detikhealth/d-4961437/pemerintah-ri-akan-pakai-mesin-pemeriksaan-tbc-untuk-tes-virus-corona" target="__blank" rel="nofollow noreferrer">detik.com</a>).
      </p>
    </header>
    <ul class="flex flex-wrap -mx-5 px-5 lg:px-0">
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">Total labs</p>
          <p class="text-4xl text-blue-400 leading-none">{{ $delimiter(summary.totalLabs) }}</p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">PCR labs</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.pcrLabs.total) }}</p>
          <p class="text-gray-500">
            {{ $delimiter(summary.pcrLabs.offline) }} + {{ $delimiter(summary.pcrLabs.online) }} online
          </p>
        </div>
      </li>
      <li class="mb-8 w-1/2 md:w-1/3 lg:w-1/4">
        <div class="mx-5">
          <p class="mb-2">TCM labs</p>
          <p class="mb-2 text-4xl text-blue-400 leading-none">{{ $delimiter(summary.tcmLabs.total) }}</p>
          <p class="text-gray-500">
            {{ $delimiter(summary.tcmLabs.offline) }} + {{ $delimiter(summary.tcmLabs.online) }} online
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import records from '~/data/coronavirus-tests.json'

export default {
  computed: {
    summary() {
      const lastRecord = records[records.length - 1]
      return {
        totalLabs: lastRecord.lab.pcr + lastRecord.lab.tcm + lastRecord.online_lab.total,
        pcrLabs: {
          total: lastRecord.lab.pcr + lastRecord.online_lab.pcr,
          offline: lastRecord.lab.pcr,
          online: lastRecord.online_lab.pcr
        },
        tcmLabs: {
          total: lastRecord.lab.tcm + lastRecord.online_lab.tcm,
          offline: lastRecord.lab.tcm,
          online: lastRecord.online_lab.tcm
        }
      }
    }
  }
}
</script>
