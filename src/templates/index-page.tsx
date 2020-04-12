import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { PeepoLink } from '../components/Links';
import { Typography } from '../components/Typography';

type IndexPageTemplateProps = {
  title: string;
  heading: string;
  readBlogText: string;
};

export const IndexPageTemplate = ({
  title,
  heading,
  readBlogText
}: IndexPageTemplateProps) => (
  <div className="flex flex-col align-center justify-center">
    <Typography variant="h1">{title}</Typography>
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
    <PeepoLink fullWidth to="/blog" withButton size="medium">
      {readBlogText}
    </PeepoLink>
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
