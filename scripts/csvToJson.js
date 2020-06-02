const fs = require('fs').promises
const path = require('path')
const parse = require('csv-parse/lib/sync')

generateDataByProvince()
generateProvinces()
generateSummary()

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
