// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  // load source from api.covid19api.com
  api.loadSource(async actions => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/update.json')
    const collection = actions.addCollection('Coronavirus')
    collection.addNode({
      new: data.update.penambahan,
      daily: data.update.harian,
      total: data.update.total
    })
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/prov_time.json')
    const collection = actions.addCollection('CoronavirusByProvince')
    collection.addNode({
      list: data.list,
    })
  })

  api.loadSource(actions => {
    const data = [
      {
        name: 'Dengue fever in Indonesia',
        description: 'In Indonesia, dengue fever still becomes an important public health issue all over the country. This data visualization provides insights about the spread of the disease in all provinces and the trend of the cases in 2011-2018.',
        link: '/dengue/',
        new: false
      },
      {
        name: 'Coronavirus in Indonesia',
        description: 'Indonesia is the second worst affected country in Southeast Asia by covid-19. This page provides visualizations about the trend of daily new cases, the spread of diseases in all provinces from day one until today and many more.',
        link: '/coronavirus/',
        new: false
      },
      {
        name: 'Coronavirus Timeline',
        description: 'This page provides timeline visualization regarding the government actions in response to COVID-19 pandemic. This page is best viewed in desktop platform.',
        link: '/coronavirus-timeline/',
        new: true
      }
    ]
    const collection = actions.addCollection('Collections')
    collection.addNode({
      items: data,
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
