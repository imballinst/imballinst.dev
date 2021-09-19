require('dotenv').config();

// Manually set the index name.
process.env.GATSBY_ALGOLIA_INDEX_NAME =
  process.env.CONTEXT === 'production'
    ? process.env.GATSBY_ALGOLIA_INDEX_NAME || 'prod_peepohappy'
    : 'deploy_preview_peepohappy';

const SITE_URL =
  process.env.CONTEXT === 'deploy-preview'
    ? process.env.DEPLOY_PRIME_URL
    : 'https://peepohappy.id';

module.exports = {
  siteMetadata: {
    title: 'peepohappy',
    description:
      'My name is Try Ajitiono. I talk about software development, real life, and gaming stuff.',
    author: 'Try Ajitiono',
    authorTwitter: '@Ajiballinst',
    keywords: ['blog', 'tech', 'life', 'happiness'],
    siteUrl: SITE_URL
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js') // Optional: Load custom Tailwind CSS configuration
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
              showCaptions: true,
              markdownCaptions: true
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          {
            resolve: `gatsby-remark-default-html-attrs`,
            options: {
              // Basic stylings that do not require frequent updates or excessive themings.
              // This should adapt to src/components/Typography.tsx.
              h1: 'text-3xl font-bold',
              h2: 'text-2xl font-bold',
              h3: 'text-xl font-semibold',
              h4: 'text-lg font-semibold',
              h5: 'text-base',
              h6: 'text-sm',
              p: 'text-base',
              strong: 'font-semibold'
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: true,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {}
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it.
        trackingId: 'UA-164562762-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body.
        head: true,
        // Setting this parameter is optional.
        anonymize: true,
        // Setting this parameter is also optional.
        respectDNT: true,
        // Avoids sending pageview hits from custom paths.
        // exclude: [],
        // Delays sending pageview hits on route update (in milliseconds).
        // pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id.
        // optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
        // Enables Google Optimize Experiment ID.
        // experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
        // Defers execution of google analytics script after page load.
        defer: false
        // Any additional optional fields.
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: 'example.com'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'peepohappy',
        short_name: 'peepohappy',
        start_url: '/',
        background_color: '#234e52',
        theme_color: '#234e52',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button).
        // See https://developers.google.com/web/fundamentals/web-app-manifest/#display.
        // Not used for now.
        // display: 'standalone',
        // This path is relative to the root of the site.
        icon: 'src/img/peepo-logo.png',
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`.
        crossOrigin: `use-credentials`,
        cache_busting_mode: 'none'
      }
    },
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        tailwind: true,
        purgeOnly: ['/all.css']
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/helpers/algolia-queries')
      }
    },
    'gatsby-plugin-sitemap',
    // must be after other CSS plugins.
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
};