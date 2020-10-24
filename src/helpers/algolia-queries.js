const escapeStringRegexp = require('escape-string-regexp');

const pagePath = `src/pages`;
const indexName = `prod_peepohappy`;

const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          visibility
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest
  };
}

const isProductionBuild = process.env.CONTEXT === 'production';

if (!isProductionBuild) {
  console.log(
    'Current build is not within `production` context. Skipping building indices.'
  );
}

const queries = isProductionBuild
  ? [
      {
        query: pageQuery,
        transformer: ({ data }) =>
          data.pages.edges.reduce((array, edge) => {
            // Filter articles with `unlisted` visibility, so they're not searchable in the Gatsby site.
            if (edge.node.frontmatter.visibility === 'unlisted') {
              return array;
            }

            return array.concat(pageToAlgoliaRecord(edge));
          }, []),
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] }
      }
    ]
  : [];

module.exports = queries;
