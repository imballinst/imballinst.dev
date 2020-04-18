import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout, { SectionWrapper } from '../components/Layout';
import { ListBlogItem, ListBlogItemType } from '../components/Blog/Posts';
import { createGrammaticalNoun } from '../helpers/formatter';
import { Typography } from '../components/Typography';
import { PeepoLink } from '../components/Links';

type Post = {
  node: ListBlogItemType;
};
type SpecificTagProps = {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Post[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: {
    tag: string;
  };
};

function SpecificTags({ data, pageContext }: SpecificTagProps) {
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map(post => <ListBlogItem post={post.node} />);
  const tag = pageContext.tag;
  const title = data.site.siteMetadata.title;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} ${createGrammaticalNoun(
    'post',
    totalCount
  )} tagged with “${tag}”`;

  return (
    <Layout>
      <SectionWrapper>
        <Helmet title={`${tag} | ${title}`} />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <Typography variant="h3" className="mb-4">
                {tagHeader}
              </Typography>
              <ul className="mb-4">{postLinks}</ul>
              <PeepoLink to="/tags/">Browse all tags</PeepoLink>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
}

export default SpecificTags;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(pruneLength: 400)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
