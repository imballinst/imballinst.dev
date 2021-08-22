const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { execSync } = require('child_process');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      });
    });

    // Add `/latest` redirect link.
    const latestBlogPost = posts
      .filter(post => post.node.frontmatter.templateKey === 'blog-post')
      .sort((a, b) => {
        const date1 = new Date(a.node.frontmatter.date);
        const date2 = new Date(b.node.frontmatter.date);

        return date2.valueOf() - date1.valueOf();
      })[0];

    createPage({
      path: '/latest-post',
      tags: latestBlogPost.node.frontmatter.tags,
      component: path.resolve(`src/templates/latest-blog-post.tsx`),
      // additional data can be passed via context
      context: {
        id: latestBlogPost.node.id
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: removeTrailingSlashFromSlug(value)
    });

    const modifiedDate = execSync(
      `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString();
    createNodeField({
      name: `modifiedDate`,
      node,
      value: modifiedDate
    });
  }
};

function removeTrailingSlashFromSlug(slug) {
  const length = slug.length;

  if (length > 1 && slug.charAt(length - 1) === '/') {
    return slug.slice(0, -1);
  }

  return slug;
}
