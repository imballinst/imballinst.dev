import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { ImageBlurb } from '../common-types';
import useSiteMetadata from '../components/SiteMetadata';

type BlogPostProps = {
  data: {
    markdownRemark: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        featuredImageResized: ImageBlurb;
      };
      fields: {
        slug: string;
      };
    };
  };
};

const LatestBlogPost = ({ data }: BlogPostProps) => {
  const { markdownRemark: post } = data;
  const siteMetadata = useSiteMetadata();

  useEffect(() => {
    if (post.fields.slug !== undefined && window !== undefined) {
      window.location.replace(`${siteMetadata.siteUrl}/${post.fields.slug}`);
    }
  }, [post.fields.slug]);

  return (
    <Layout noPadding>
      <SEO
        title={`Latest blog post in ${siteMetadata.title}`}
        description={post.frontmatter.description}
        image={post.frontmatter.featuredImageResized}
      />
    </Layout>
  );
};

export default LatestBlogPost;

export const pageQuery = graphql`
  query LatestBlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        featuredImageResized: featuredimage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        tags
      }
    }
  }
`;
