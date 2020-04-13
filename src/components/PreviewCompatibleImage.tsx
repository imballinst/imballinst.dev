import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

export type Fluid = { fluid: FluidObject };

type Props = {
  imageInfo: {
    alt?: string;
    childImageSharp?: Fluid;
    image: string | { childImageSharp: Fluid };
    style?: object;
  };
};

const THUMBNAIL_IMAGE_HEIGHT = '200px';

const StyledGatsbyImage = styled(Img)`
  height: ${THUMBNAIL_IMAGE_HEIGHT};
`;
const StyledImage = styled.img`
  height: ${THUMBNAIL_IMAGE_HEIGHT};
`;

const PreviewCompatibleImage = ({ imageInfo }: Props) => {
  const { alt = '', childImageSharp, image } = imageInfo;

  if (typeof image === 'object') {
    return <StyledGatsbyImage fluid={image.childImageSharp.fluid} alt={alt} />;
  }

  if (childImageSharp) {
    return <StyledGatsbyImage fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (image && typeof image === 'string') {
    return <StyledImage src={image} alt={alt} />;
  }

  return null;
};

export default PreviewCompatibleImage;
