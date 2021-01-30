// TODO: move this to under src/pages to take advantage of https://www.gatsbyjs.org/docs/graphql-api/#pagequery.
import React, { ReactNode } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled, { StyledComponent } from '@emotion/styled';

import PreviewCompatibleImage, { Fluid } from '../PreviewCompatibleImage';
import { Paper, PaperProps } from '../Paper';
import { peepoTheme } from '../../theme';
import { cls } from '../../helpers/styles';
import { PeepoLink } from '../Links';
import { SectionWrapper } from '../Layout';

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
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    featuredpost?: boolean;
    featuredimage: { childImageSharp: Fluid };
    description: string;
  };
};

const StyledPaper = styled(Paper)`
  &:not(:first-of-type) {
    margin-top: ${peepoTheme.spacing(8)};
  }
`;

const DefaultTitleElement = ({ children }: { children: ReactNode }) => (
  <div className="block w-full mt-2">{children}</div>
);

export function ListBlogItem({
  post,
  WrapperComponents
}: {
  post: ListBlogItemType;
  WrapperComponents?: {
    Root?: any;
    Title?: any;
  };
}) {
  const { Root = StyledPaper, Title = DefaultTitleElement } =
    WrapperComponents || {};

  return (
    <Root>
      <article
        className={cls({
          featured: post.frontmatter.featuredpost
        })}
      >
        <header>
          <PeepoLink
            className={`${peepoTheme.textSizes.large2} font-semibold`}
            to={post.fields.slug}
          >
            {post.frontmatter.featuredimage ? (
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`
                }}
              />
            ) : null}
            <Title>{post.frontmatter.title}</Title>
          </PeepoLink>
          <div className="block w-full">
            <span className={`${peepoTheme.textSizes.small} text-gray-600`}>
              {post.frontmatter.date}
            </span>
          </div>
        </header>
        <div className="mt-4">
          <p>{post.frontmatter.description}</p>
        </div>
      </article>
    </Root>
  );
}

function Posts(props: Props) {
  const { allMarkdownRemark } = props.data;
  const posts = allMarkdownRemark.edges;

  return (
    <div className="flex flex-col relative">
      <SectionWrapper>
        {posts.map((post: any) => (
          <ListBlogItem key={post.node.id} post={post.node} />
        ))}
      </SectionWrapper>
    </div>
  );
}

export default () => (
  <StaticQuery
    query={graphql`
      query PostsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              visibility: { eq: "public" }
            }
          }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 300, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                tags
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
