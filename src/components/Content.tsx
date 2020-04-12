import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

// References: https://www.webfx.com/blog/web-design/hyperlink-design/.
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
