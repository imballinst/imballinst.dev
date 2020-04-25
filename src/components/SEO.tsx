import React, { DetailedHTMLProps } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from './SiteMetadata';
import { ResizedImageBlurb } from '../common-types';
import normalLogo from '../img/peepo-logo.jpg';
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
  image?: ResizedImageBlurb;
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
    ? `${siteMetadata.siteUrl}${featuredImageResized.childImageSharp.resize.src}`
    : `${siteMetadata.siteUrl}${normalLogo}`;
  const canonical = pathname ? `${siteMetadata.siteUrl}${pathname}` : null;

  let helmetMeta: MetaType = [
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
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ];

  if (featuredImageResized) {
    helmetMeta = helmetMeta.concat([
      {
        property: 'og:image:width',
        content: featuredImageResized.childImageSharp.resize.width
      },
      {
        property: 'og:image:height',
        content: featuredImageResized.childImageSharp.resize.height
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
