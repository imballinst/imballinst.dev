import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { PeepoLink } from '../components/Links';
import { Typography } from '../components/Typography';
import { Paper } from '../components/Paper';
import { SunIcon } from '../icons/SunICon';
import { MoonIcon } from '../icons/MoonIcon';
import { StarIcon } from '../icons/StarIcon';

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
  <div className="flex flex-col align-center mt-24">
    <SunIcon size={100} />
    <MoonIcon size={100} />
    <StarIcon size={20} />
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
