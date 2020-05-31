// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Nusadata',
  siteDescription: 'All about Indonesia made into data visualizations',
  siteUrl: 'https://rahmanda.github.io/nusadata',
  titleTemplate: '%s',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss'
    }
  ]
}
