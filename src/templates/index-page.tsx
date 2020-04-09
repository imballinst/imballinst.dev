import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import { ImageBlurb } from '../common-types';
import { PeepoButton } from '../components/Button';

type IndexPageTemplateProps = {
  title: string;
  image: ImageBlurb;
  heading: string;
  readBlogText: string;
};

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  readBlogText
}: IndexPageTemplateProps) => (
  <div>
    <div className="full-width-image margin-top-0">
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column'
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {heading}
        </h3>
        <PeepoButton size="medium">{readBlogText}</PeepoButton>
      </div>
    </div>
  </div>
);

type IndexPageProps = {
  data: {
    markdownRemark: {
      frontmatter: IndexPageTemplateProps;
    };
  };
};

const IndexPage = ({ data }: IndexPageProps) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        readBlogText={frontmatter.readBlogText}
      />
    </Layout>
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
  }
`;
