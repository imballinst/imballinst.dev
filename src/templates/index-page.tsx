import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { PeepoLink } from '../components/Links';
import { Typography } from '../components/Typography';
import { Paper } from '../components/Paper';

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
  <div className="flex flex-col align-center justify-center pt-12">
    <Paper>
      <Typography variant="h1" className="text-center">
        {title}
      </Typography>
      <Typography variant="h3" className="text-center">
        {heading}
      </Typography>
      <PeepoLink fullWidth to="/blog" withButton size="large" className="mt-12">
        {readBlogText}
      </PeepoLink>
    </Paper>
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
