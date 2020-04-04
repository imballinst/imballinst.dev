import { FluidObject } from 'gatsby-image';

export type ImageBlurb = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

// This is from Immutable.js.
export type GetInType = (params: string[]) => any;
