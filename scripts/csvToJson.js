const fs = require('fs').promises
const path = require('path')
const parse = require('csv-parse/lib/sync')

generateDataByProvince()
generateProvinces()

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
      name: record.slug
    }
  })

  await fs.writeFile(
    path.join(__dirname, '../src/provinces.json'),
    JSON.stringify(exportedObj),
    { encoding: 'utf8' }
  )
}
