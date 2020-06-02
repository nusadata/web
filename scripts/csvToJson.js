const fs = require('fs').promises
const path = require('path')
const parse = require('csv-parse/lib/sync')

generateDataByProvince()
generateProvinces()
generateSummary()
generateNationalTrendOverPeriod()

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
