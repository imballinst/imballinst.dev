import React, { ReactNode } from 'react';

type HTMLContentProps = {
  content: string;
  className: string;
};

const HTMLContent = ({ content, className }: HTMLContentProps) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

type ContentProps = {
  content: ReactNode;
  className: string;
};

const Content = ({ content, className }: ContentProps) => (
  <div className={className}>{content}</div>
);

export { HTMLContent };
export default Content;
