import { FluidObject } from 'gatsby-image';

export type ImageBlurb = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

// This is from Immutable.js.
export type GetInType = (params: string[]) => any;

export type SiteMetadata = {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  siteUrl: string;
};
