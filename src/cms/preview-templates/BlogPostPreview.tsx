import React from 'react';
import { BlogPostTemplate } from '../../templates/blog-post';
import { GetInType } from '../../common-types';

type BlogPostPreviewProps = {
  entry: {
    getIn: GetInType;
  };
  widgetFor: (param: string) => string;
};

const BlogPostPreview = ({ entry, widgetFor }: BlogPostPreviewProps) => {
  const tags = entry.getIn(['data', 'tags']);

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  );
};

export default BlogPostPreview;
