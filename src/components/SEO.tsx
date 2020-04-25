import React, { DetailedHTMLProps } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from './SiteMetadata';
import { ResizedImageBlurb } from '../common-types';

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

  const metaDescription = description || siteMetadata.description;
  const image = featuredImageResized
    ? `${siteMetadata.siteUrl}/${featuredImageResized.childImageSharp.src}`
    : `${siteMetadata.siteUrl}/static/img/peepo-metadata.jpg`;
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
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ];

  if (featuredImageResized) {
    helmetMeta = helmetMeta.concat([
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'og:image:width',
        content: featuredImageResized.childImageSharp.width
      },
      {
        property: 'og:image:height',
        content: featuredImageResized.childImageSharp.height
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
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
      title={siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
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
