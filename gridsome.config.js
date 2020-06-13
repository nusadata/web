// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const siteUrl = isGithubPages ? 'https://nusadata.github.io' : 'https://www.nusadata.org'
const pathPrefix = isGithubPages ? '/web' : ''

module.exports = {
  siteName: 'Nusadata',
  siteDescription: 'Collections of data visualization based on Indonesian statistics',
  siteUrl,
  pathPrefix,
  titleTemplate: '%s',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          whitelistPatternsChildren: [/^tippy/]
        }
      }
    }
  ]
}
