import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Paper } from './Paper';
import { peepoTheme } from '../theme';
import { cls } from '../helpers/styles';
import { PeepoLink } from './Links';

type Props = {
  data: {
    allMarkdownRemark: {
      // TODO(aji): change this with the correct form of the post.
      edges: any[];
    };
  };
};

const StyledPaper = styled(Paper)`
  &:not(:first-child) {
    margin-top: ${peepoTheme.spacing(8)};
  }
`;

function BlogRoll(props: Props) {
  const { edges: posts } = props.data.allMarkdownRemark;

  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <StyledPaper key={post.id}>
            {/* TODO(aji): continue here. */}
            <article
              className={cls({
                featured: post.frontmatter.featuredpost
              })}
            >
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="mb-2">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`
                      }}
                    />
                  </div>
                ) : null}
                <div>
                  <div className="block w-full">
                    <PeepoLink
                      className={`${peepoTheme.textSizes.large2} font-semibold`}
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </PeepoLink>
                  </div>
                  <div className="block w-full">
                    <span className={`${peepoTheme.textSizes.small} italic`}>
                      {post.frontmatter.date}
                    </span>
                  </div>
                </div>
              </header>
              <p className="mt-4">
                {post.excerpt}
                <div className="block w-full mt-8 text-right">
                  <PeepoLink
                    className={`${peepoTheme.textSizes.small}`}
                    to={post.fields.slug}
                  >
                    Read more →
                  </PeepoLink>
                </div>
              </p>
            </article>
          </StyledPaper>
        ))}
    </div>
  );
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
                templateKey
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
    `}
    render={data => <BlogRoll data={data} />}
  />
);
