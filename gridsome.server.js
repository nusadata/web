// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  // load source from api.covid19api.com
  api.loadSource(async actions => {
    try {
      const { data } = await axios.get('https://data.covid19.go.id/public/api/update.json')
      const collection = actions.addCollection('Coronavirus')
      collection.addNode({
        new: data.update.penambahan,
        daily: data.update.harian,
        total: data.update.total
      })
    } catch (err) {
      console.log('https://data.covid19.go.id/public/api/update.json', err)
    }
  })

  api.loadSource(async actions => {
    try {
      const { data } = await axios.get('https://data.covid19.go.id/public/api/prov_time.json')
      const collection = actions.addCollection('CoronavirusByProvince')
      collection.addNode({
        list: data.list,
      })
    } catch (err) {
      console.log('https://data.covid19.go.id/public/api/prov_time.json', err)
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
