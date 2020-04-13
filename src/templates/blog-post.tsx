import React, { ReactNode } from 'react';
import kebabCase from 'lodash.kebabcase';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Typography } from '../components/Typography';

type BlogPostTemplateProps = {
  content: ReactNode;
  contentComponent?: React.ElementType;
  description: string;
  tags: string[];
  title: string;
  helmet?: ReactNode;
};

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet
}: BlogPostTemplateProps) => {
  const PostContent = contentComponent || Content;

  return (
    <section>
      {helmet || ''}
      <Typography variant="h1">{title}</Typography>
      <p>{description}</p>
      <PostContent content={content} />
      {tags && tags.length ? (
        <div style={{ marginTop: `4rem` }}>
          <h4>Tags</h4>
          <ul className="taglist">
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

type BlogPostProps = {
  data: {
    markdownRemark: {
      id: string;
      html: string;
      frontmatter: {
        date: string;
        title: string;
        description: string;
        tags: string[];
      };
    };
  };
};

const BlogPost = ({ data }: BlogPostProps) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
