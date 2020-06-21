const fs = require('fs').promises
const path = require('path')
const parse = require('csv-parse/lib/sync')

generateDataByProvince()
generateProvinces()
generateSummary()
generateNationalTrendOverPeriod()
generateTestsData()

async function generateDataByProvince() {
  const content = await fs.readFile(path.resolve(__dirname, '../static/dengue-indonesia-2011-2018.csv'))
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })

  let exportedObj = {}

  records.forEach(record => {
    if (exportedObj[record.slug]) {
      exportedObj[record.slug].push(record)
    } else {
      exportedObj[record.slug] = [record]
    }
  })

  await fs.writeFile(
    path.join(__dirname, '../static/dengue-indonesia-by-province-2011-2018.json'),
    JSON.stringify(exportedObj),
    { encoding: 'utf8' }
  )
}

async function generateProvinces() {
  const content = await fs.readFile(path.resolve(__dirname, '../static/dengue-indonesia-2011.csv'))
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })

  let exportedObj = {}

  records.forEach(record => {
    exportedObj[record.slug] = {
      name: record.province
    }
  })

  await fs.writeFile(
    path.join(__dirname, '../src/data/provinces.json'),
    JSON.stringify(exportedObj),
    { encoding: 'utf8' }
  )
}

async function generateSummary() {
  const content = await fs.readFile(path.resolve(__dirname, '../static/dengue-indonesia-2011-2018.csv'))
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })

  let totalCases = 0

  let maxTotalCases = 0
  let provinceWithMaxTotalCases = ''
  let yearWithMaxTotalCases = 2011

  let maxDeathCases = 0
  let provinceWithMaxDeathCases = ''
  let yearWithMaxDeathCases = 2011

  records.forEach(record => {
    const currentTotalCases = +record.total_cases
    const currentDeathCases = +record.total_deaths

    totalCases += currentTotalCases

    if (currentTotalCases > maxTotalCases) {
      maxTotalCases = currentTotalCases
      provinceWithMaxTotalCases = record.province
      yearWithMaxTotalCases = +record.year
    }

    if (currentDeathCases > maxDeathCases) {
      maxDeathCases = currentDeathCases
      provinceWithMaxDeathCases = record.province
      yearWithMaxDeathCases = +record.year
    }

  })

  const exportedObj = {
    total_cases: totalCases,
    average_total_cases: totalCases / 8,
    max_total_cases: maxTotalCases,
    province_with_max_total_cases: provinceWithMaxTotalCases,
    year_with_max_total_cases: yearWithMaxTotalCases,
    max_death_cases: maxDeathCases,
    province_with_max_death_cases: provinceWithMaxDeathCases,
    year_with_max_death_cases: yearWithMaxDeathCases
  }

  await fs.writeFile(
    path.join(__dirname, '../src/data/dengue-summary.json'),
    JSON.stringify(exportedObj),
    { encoding: 'utf8' }
  )
}

async function generateNationalTrendOverPeriod() {
  const yearRange = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
  let exported = []

  for (let i = 0; i < yearRange.length; i++) {
    const year = yearRange[i]
    const content = await fs.readFile(path.resolve(__dirname, `../static/dengue-indonesia-${year}.csv`))
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true
    })
    const obj = {
      population: 0,
      total_cases: 0,
      total_deaths: 0,
      year,
    }
    records.forEach(record => {
      obj.population += +record.population
      obj.total_cases += +record.total_cases
      obj.total_deaths += +record.total_deaths
    })
    exported.push(obj)
  }

  await fs.writeFile(
    path.join(__dirname, '../src/data/dengue-national.json'),
    JSON.stringify(exported),
    { encoding: 'utf8' }
  )
}

async function generateTestsData() {
  const content = await fs.readFile(path.resolve(__dirname, `../static/coronavirus-tests.csv`))
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })
  let exported = []
  records.forEach((record, idx) => {
    if (idx === 0) return

    const currentRecord = record
    const pastRecord = records[idx - 1]
    const dailyLabPcr = +currentRecord.lab_pcr - +pastRecord.lab_pcr
    const dailyLabTcm = +currentRecord.lab_tcm - +pastRecord.lab_tcm
    const dailyOnlineLab = +currentRecord.total_online_lab - +pastRecord.total_online_lab
    const dailyOnlineLabPcr = +currentRecord.online_lab_pcr - +pastRecord.online_lab_pcr
    const dailyOnlineLabTcm = +currentRecord.online_lab_tcm - +pastRecord.online_lab_tcm
    const dailySpecimenTests = +currentRecord.total_specimen_tests - +pastRecord.total_specimen_tests
    const dailySpecimenTestsPcr = +currentRecord.specimen_tests_pcr - +pastRecord.specimen_tests_pcr
    const dailySpecimenTestsTcm = +currentRecord.specimen_tests_tcm - +pastRecord.specimen_tests_tcm
    const dailyPeopleTests = +currentRecord.total_people_tests - +pastRecord.total_people_tests
    const dailyPeopleTestsPcr = +currentRecord.people_tests_pcr - +pastRecord.people_tests_pcr
    const dailyPeopleTestsTcm = +currentRecord.people_tests_tcm - +pastRecord.people_tests_tcm
    const dailyPositiveCases = +currentRecord.positive_cases - +pastRecord.positive_cases
    const dailyPositiveCasesPcr = +currentRecord.positive_cases_pcr - +pastRecord.positive_cases_pcr
    const dailyPositiveCasesTcm = +currentRecord.positive_cases_tcm - +pastRecord.positive_cases_tcm
    const dailyNegativeCases = +currentRecord.negative_cases - +pastRecord.negative_cases
    const dailyNegativeCasesPcr = +currentRecord.negative_cases_pcr - +pastRecord.negative_cases_pcr
    const dailyNegativeCasesTcm = +currentRecord.negative_cases_tcm - +pastRecord.negative_cases_tcm
    const dailyCitiesAffected = +currentRecord.cities - +pastRecord.cities

    exported.push({
      date: record.date,
      lab: {
        pcr: +record.lab_pcr,
        tcm: +record.lab_tcm,
        daily: {
          pcr: dailyLabPcr,
          tcm: dailyLabTcm
        }
      },
      online_lab: {
        total: +record.total_online_lab,
        pcr: +record.online_lab_pcr,
        tcm: +record.online_lab_tcm,
        daily: {
          total: dailyOnlineLab,
          pcr: dailyOnlineLabPcr,
          tcm: dailyOnlineLabTcm
        }
      },
      specimen_tests: {
        total: +record.total_specimen_tests,
        pcr: +record.specimen_tests_pcr,
        tcm: +record.specimen_tests_tcm,
        daily: {
          total: dailySpecimenTests,
          pcr: dailySpecimenTestsPcr,
          tcm: dailySpecimenTestsTcm
        }
      },
      people_tests: {
        total: +record.total_people_tests,
        pcr: +record.people_tests_pcr,
        tcm: +record.people_tests_tcm,
        daily: {
          total: dailyPeopleTests,
          pcr: dailyPeopleTestsPcr,
          tcm: dailyPeopleTestsTcm
        }
      },
      positive_cases: {
        total: +record.positive_cases,
        pcr: +record.positive_cases_pcr,
        tcm: +record.positive_cases_tcm,
        daily: {
          total: dailyPositiveCases,
          pcr: dailyPositiveCasesPcr,
          tcm: dailyPositiveCasesTcm,
        }
      },
      negative_cases: {
        total: +record.negative_cases,
        pcr: +record.negative_cases_pcr,
        tcm: +record.negative_cases_tcm,
        daily: {
          total: dailyNegativeCases,
          pcr: dailyNegativeCasesPcr,
          tcm: dailyNegativeCasesTcm
        }
      },
      cities_affected: {
        total: +record.cities,
        daily: dailyCitiesAffected,
      }
    })
  })
  await fs.writeFile(
    path.join(__dirname, '../src/data/coronavirus-tests.json'),
    JSON.stringify(exported),
    { encoding: 'utf8' }
  )
}
