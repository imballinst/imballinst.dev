import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetadata } from '../common-types';

const useSiteMetadata = (): SiteMetadata => {
  const {
    site
  }: {
    site: { siteMetadata: SiteMetadata };
  } = useStaticQuery(
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

  return site.siteMetadata;
};

export default useSiteMetadata;
