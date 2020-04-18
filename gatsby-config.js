module.exports = {
  siteMetadata: {
    title: 'peepohappy',
    description:
      "This is Try Ajitiono's personal site and blog, powered by Gatsby and Netlify."
  },
  plugins: [
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
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
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
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`
      }
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        tailwind: true,
        purgeOnly: ['/all.css']
      }
    },
    [
      `gatsby-plugin-webpack-size`,
      {
        // Set to true to show bundle sizes in development mode as well
        development: true
      }
    ],
    // must be after other CSS plugins
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
};
