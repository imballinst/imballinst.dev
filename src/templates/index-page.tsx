import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';

import Layout, { SectionWrapper } from '../components/Layout';
import { Typography } from '../components/Typography';
import { Paper } from '../components/Paper';
import { ListBlogItem, ListBlogItemType } from '../components/Blog/Posts';
import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

type IndexContent = {
  frontmatter: {
    title: string;
    heading: string;
    readBlogText: string;
  };
};

type IndexPageTemplateProps = {
  indexContent: IndexContent;
  latestPosts: ListBlogItemType[];
};

// Alternate wrapper for ListBlogItemType.
// The default of its wrapper is for column listing. Here, we need row listing.
const StyledPaper = styled(Paper)`
  @media (max-width: 1024px) {
    &:not(:first-of-type) {
      margin-top: ${peepoTheme.spacing(4)};
    }
  }

  @media (min-width: 1024px) {
    &:not(:first-of-type) {
      margin-left: ${peepoTheme.spacing(4)};
    }
  }
`;

const PostRootElement = ({ children }: { children: ReactNode }) => (
  <StyledPaper className="w-full lg:w-1/3">{children}</StyledPaper>
);

const PostTitleElement = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 1024px) {
    height: 48px;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

export const IndexPageTemplate = ({
  indexContent,
  latestPosts
}: IndexPageTemplateProps) => {
  return (
    <SectionWrapper className="flex flex-col align-center">
      <Typography variant="h3" className="font-bold leading-none">
        Latest Blog Posts
      </Typography>

      <div className="flex flex-row flex-wrap lg:flex-no-wrap mt-2">
        {latestPosts.map(post => (
          <ListBlogItem
            post={post}
            WrapperComponents={{
              Root: PostRootElement,
              Title: PostTitleElement
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

type IndexPageProps = {
  data: {
    markdownRemark: IndexContent;
    allMarkdownRemark: {
      edges: {
        node: ListBlogItemType;
      }[];
    };
  };
};

const HomeBanner = styled.div`
  margin-top: ${peepoTheme.topbarHeight}px;
`;

const HomeBannerContent = styled.div`
  width: ${peepoTheme.maxOptimalWidth};
`;

const IndexPage = ({ data }: IndexPageProps) => {
  const { markdownRemark, allMarkdownRemark } = data;
  const latestPosts = allMarkdownRemark.edges.map(edge => edge.node);

  return (
    <>
      <HomeBanner
        className={`p-4 ${peepoTheme.pageHorizontalSpacing} flex flex-row justify-center`}
      >
        <HomeBannerContent>
          <Typography variant="body" textSize="h1" className="leading-none">
            {markdownRemark.frontmatter.title}
          </Typography>
          <Typography variant="body" textSize="h3">
            {markdownRemark.frontmatter.heading}
          </Typography>
        </HomeBannerContent>
      </HomeBanner>
      <Layout noMargin>
        <IndexPageTemplate
          indexContent={markdownRemark}
          latestPosts={latestPosts}
        />
      </Layout>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        readBlogText
      }
    }
    allMarkdownRemark(
      limit: 3
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
            featuredimage {
              childImageSharp {
                gatsbyImageData(quality: 40, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;
