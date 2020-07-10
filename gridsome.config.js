// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const siteUrl = isGithubPages ? 'https://nusadata.github.io' : 'https://www.nusadata.org'
const pathPrefix = isGithubPages ? '/web' : ''

module.exports = {
  siteName: 'Nusadata',
  siteDescription: 'Nusadata adalah tempat untuk melihat berbagai macam visualisasi data dan statistik yang menarik tentang Indonesia. Kami ingin membantu masyarakat untuk dapat mengakses informasi mengenai negeri kita ini dengan website yang cepat dan sumber yang kredibel.',
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
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-73365330-2'
      }
    }
  ]
}
