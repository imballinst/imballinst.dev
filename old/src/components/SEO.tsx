import React, { DetailedHTMLProps } from 'react';
import Helmet from 'react-helmet';
import { getSrc } from 'gatsby-plugin-image';

import useSiteMetadata from './SiteMetadata';
import { ImageBlurb } from '../common-types';
import peepoLogo from '../img/peepo-logo.jpg';
import { useLocation } from '@reach/router';

type MetaType = DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[];

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title?: string;
  image?: ImageBlurb;
  pathname?: string;
};

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  image: featuredImageResized,
  title,
  pathname
}: SEOProps) {
  const siteMetadata = useSiteMetadata();
  const isNotRootRoute = useLocation().pathname !== '/';

  const metaTitle = title || siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const image = featuredImageResized
    ? `${siteMetadata.siteUrl}${getSrc(featuredImageResized)}`
    : `${siteMetadata.siteUrl}${peepoLogo}`;
  const canonical = pathname ? `${siteMetadata.siteUrl}${pathname}` : null;

  let helmetMeta: MetaType = [
    // Social media metas.
    {
      name: `description`,
      content: metaDescription
    },
    {
      name: 'keywords',
      content: siteMetadata.keywords.join(',')
    },
    // OpenGraph.
    {
      property: `og:title`,
      content: metaTitle
    },
    {
      property: 'og:image',
      content: image
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    // Twitter.
    {
      name: `twitter:creator`,
      content: siteMetadata.authorTwitter
    },
    {
      name: `twitter:title`,
      content: metaTitle
    },
    {
      name: `twitter:description`,
      content: metaDescription
    },
    {
      name: `twitter:image`,
      content: image
    }
  ];

  if (featuredImageResized) {
    helmetMeta = helmetMeta.concat([
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'og:image:width',
        content: featuredImageResized.width
      },
      {
        property: 'og:image:height',
        content: featuredImageResized.height
      }
    ] as MetaType);
  } else {
    helmetMeta = helmetMeta.concat(meta);
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title || siteMetadata.title}
      titleTemplate={isNotRootRoute ? `%s | ${siteMetadata.title}` : undefined}
      link={
        canonical
          ? [
              {
                rel: 'canonical',
                href: canonical
              }
            ]
          : []
      }
      meta={helmetMeta}
    />
  );
}

export default SEO;