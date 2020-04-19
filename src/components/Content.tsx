import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

// References: https://www.webfx.com/blog/web-design/hyperlink-design/.
// Since we can't quite modify those from the Gatsby config, we override them here.
const ContentDiv = styled.div`
  & p {
    &:not(:last-child) {
      margin-bottom: ${peepoTheme.spacing(4)};
    }
  }
  & a {
    color: ${peepoTheme.colorSets.blue.main.hex};
    &:hover {
      color: ${peepoTheme.colorSets.blue.dark.hex};
    }
  }
  & figure {
    & figcaption {
      font-style: italic;
      font-size: 0.875rem;
      text-align: center;
    }
  }
`;

type HTMLContentProps = {
  content: string;
  className: string;
};

const HTMLContent = ({ content, className }: HTMLContentProps) => (
  <ContentDiv
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

type ContentProps = {
  content: ReactNode;
  className: string;
};

const Content = ({ content, className }: ContentProps) => (
  <ContentDiv className={className}>{content}</ContentDiv>
);

export { HTMLContent };
export default Content;
