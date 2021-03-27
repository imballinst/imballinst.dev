import {
  FileNode,
  IGatsbyImageDataParent
} from 'gatsby-plugin-image/dist/src/components/hooks';
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';

export type ImageBlurb = FileNode | IGatsbyImageDataParent | IGatsbyImageData;

// This is from Immutable.js.
export type GetInType = (params: string[]) => any;

export type SiteMetadata = {
  title: string;
  description: string;
  author: string;
  authorTwitter: string;
  keywords: string[];
  siteUrl: string;
};
