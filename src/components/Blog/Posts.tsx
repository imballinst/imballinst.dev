import React, { useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import PreviewCompatibleImage, { Fluid } from '../PreviewCompatibleImage';
import { Paper } from '../Paper';
import { peepoTheme } from '../../theme';
import { cls } from '../../helpers/styles';
import { PeepoLink } from '../Links';
import { SectionWrapper } from '../Layout';
import { Filter } from './Filter';
import { useLocation } from '@reach/router';

export type TagCount = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  data: {
    allMarkdownRemark: {
      // TODO(aji): change this with the correct form of the post.
      edges: any[];
    };
    tagsRemark: {
      tags: TagCount[];
    };
  };
};

export type ListBlogItemType = {
  excerpt: string;
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    featuredpost?: boolean;
    featuredimage: { childImageSharp: Fluid };
  };
};

const StyledPaper = styled(Paper)`
  &:not(:first-of-type) {
    margin-top: ${peepoTheme.spacing(8)};
  }
`;

export function ListBlogItem({ post }: { post: ListBlogItemType }) {
  return (
    <StyledPaper>
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
        <div className="mt-4">
          <p>{post.excerpt}</p>
          <div className="block w-full mt-8 text-right">
            <PeepoLink
              className={`${peepoTheme.textSizes.small}`}
              to={post.fields.slug}
            >
              Read more →
            </PeepoLink>
          </div>
        </div>
      </article>
    </StyledPaper>
  );
}

function Posts(props: Props) {
  const { allMarkdownRemark, tagsRemark } = props.data;
  const posts = allMarkdownRemark.edges;
  const tags = tagsRemark.tags;

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <Filter tags={tags} />
      </div>
      <SectionWrapper>
        {posts &&
          posts.map(({ node: post }) => (
            <ListBlogItem key={post.id} post={post} />
          ))}
      </SectionWrapper>
    </div>
  );
}

export default () => {
  const location = useLocation();

  return (
    <StaticQuery
      query={graphql`
        query PostsQuery {
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
          tagsRemark: allMarkdownRemark(limit: 1000) {
            tags: group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `}
      render={data => <Posts data={data} />}
    />
  );
};
