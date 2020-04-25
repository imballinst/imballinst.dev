import React, { DetailedHTMLProps } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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
  title: string;
  image?: {
    src: string;
    height: number;
    width: number;
  };
  pathname?: string;
};

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  image: metaImage,
  title,
  pathname
}: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null;
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null;

  let helmetMeta: MetaType = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      name: 'keywords',
      content: site.siteMetadata.keywords.join(',')
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
      content: site.siteMetadata.author
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

  if (metaImage) {
    helmetMeta = helmetMeta.concat([
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'og:image:width',
        content: metaImage.width
      },
      {
        property: 'og:image:height',
        content: metaImage.height
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
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
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
