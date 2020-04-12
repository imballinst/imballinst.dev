import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Typography } from '../components/Typography';

type AboutPageTemplateProps = {
  title: string;
  content: string;
  contentComponent?: React.ElementType;
};

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent
}: AboutPageTemplateProps) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      <Typography variant="h1">{title}</Typography>
      <PageContent className="content" content={content} />
    </section>
  );
};

type AboutPageProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
};

const AboutPage = ({ data }: AboutPageProps) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
