import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { peepoTheme } from '../theme';

// References: https://www.webfx.com/blog/web-design/hyperlink-design/.
// Since we can't quite modify those from the Gatsby config, we override them here.
const ContentDiv = styled.div`
  & .gatsby-highlight,
  & figure {
    margin-left: ${peepoTheme.spacing(-4)};
    margin-right: ${peepoTheme.spacing(-4)};
    margin-bottom: ${peepoTheme.spacing(4)};
  }
  & hr {
    margin-bottom: ${peepoTheme.spacing(4)};
  }
  & h1,
  h2,
  h3 {
    & > code {
      font-size: unset;
    }
  }
  & blockquote {
    background: #f7f7f7;
    font-style: italic;
    margin: 0 ${peepoTheme.spacing(-4)} ${peepoTheme.spacing(4)};
    /* TODO(imballinst): refactor this. */
    padding: ${peepoTheme.spacing(4)} ${peepoTheme.spacing(4)}
      ${peepoTheme.spacing(4)} ${peepoTheme.spacing(8)};

    & p::before,
    & p::after {
      content: '"';
    }
  }
  & p:not(:empty),
  & .gatsby-highlight {
    &:not(:last-child) {
      margin-bottom: ${peepoTheme.spacing(4)};
    }
  }
  & a {
    color: ${peepoTheme.colorSets.blue.main.hex};
    &:hover {
      color: ${peepoTheme.colorSets.blue.dark.hex};
      text-decoration: underline;
    }
  }
  & figure {
    & figcaption {
      padding: 0 1rem;
      font-style: italic;
      font-size: 0.875rem;
      text-align: center;
      white-space: normal;
      word-wrap: break-word;

      & > .text-base {
        font-size: 0.875rem !important;

        & > code {
          font-size: 0.75rem !important;
          font-weight: 700;
        }
      }
    }
  }
  ol,
  ul {
    list-style: decimal;
    margin-left: ${peepoTheme.spacing(8)};
    margin-bottom: ${peepoTheme.spacing(4)};

    li {
      padding-left: ${peepoTheme.spacing(2)};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
  & table {
    &:not(:last-child) {
      margin-bottom: ${peepoTheme.spacing(4)};
    }

    & thead {
      border-bottom: 1px solid ${peepoTheme.borderColorSets.dark.light.hex};

      & th {
        padding: ${peepoTheme.spacing(2)};
      }
    }
    & tbody {
      & tr:not(:last-child) {
        border-bottom: 1px solid ${peepoTheme.borderColorSets.dark.light.hex};
      }

      & td {
        padding: ${peepoTheme.spacing(2)};
      }
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
