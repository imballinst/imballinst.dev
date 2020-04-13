import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';

import Navbar from './Navbar';
import '../all.css';
import useSiteMetadata from './SiteMetadata';
import { peepoTheme } from '../theme';

// Wrapper for bottom padding. When it is scrollable, the bottom-padding will not be visible.
export const SectionWrapper = styled.section`
  & > :last-child {
    margin-bottom: ${peepoTheme.spacing(8)};
  }

  @media (min-width: ${peepoTheme.maxOptimalWidth}) {
    margin-bottom: ${peepoTheme.spacing(12)};
  }
`;

// Layout.
type Props = {
  children: ReactNode;
};

const Content = styled.div`
  height: calc(100vh - ${peepoTheme.topbarHeight}px - 2rem);
  margin-top: ${peepoTheme.topbarHeight}px;

  & > * {
    width: ${peepoTheme.maxOptimalWidth};
  }

  @media (min-width: ${peepoTheme.maxOptimalWidth}) {
    height: calc(100vh - ${peepoTheme.topbarHeight}px - 3rem);
  }
`;

function TemplateWrapper({ children }: Props) {
  const { title, description } = useSiteMetadata();

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <Content
        className={`${peepoTheme.pageVerticalSpacing} ${peepoTheme.pageHorizontalSpacing} flex flex-row justify-center`}
      >
        {children}
      </Content>
    </div>
  );
}

export default TemplateWrapper;
