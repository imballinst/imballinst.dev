import React, { AnchorHTMLAttributes } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import { PeepoButton, PeepoButtonProps } from './Button';
import { peepoTheme } from '../theme';

interface PeepoLinkProps extends PeepoButtonProps {
  to: string;
  className?: string;
  withButton?: boolean;
}

const StyledLink = styled(Link)`
  display: ${(props: PeepoLinkProps) => (props.fullWidth ? 'block' : 'inline')};
  width: ${(props: PeepoLinkProps) => (props.fullWidth ? '100%' : 'auto')};
  color: ${peepoTheme.colorSets.blue.main.hex};
  line-height: 1.125;

  &:hover {
    color: ${peepoTheme.colorSets.blue.dark.hex};
  }
`;

export function PeepoLink({
  to,
  children,
  withButton,
  className,
  ...buttonProps
}: PeepoLinkProps) {
  let rendered;

  if (withButton) {
    rendered = <PeepoButton {...buttonProps}>{children}</PeepoButton>;
  } else {
    rendered = children;
  }

  return (
    <StyledLink className={className} to={to}>
      {rendered}
    </StyledLink>
  );
}

export function ExternalPeepoLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href === undefined) {
    throw new Error('No `href` prop was passed to ExternalPeepoLink.');
  }

  // Only allow links that start with http or https.
  const regex = new RegExp(/^https?/);

  if (!regex.test(href)) {
    throw new Error('Invalid href passed ExternalPeepoLink.');
  }

  // Prevent HTML tampering using browser console.
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (href && !regex.test(href)) {
      return alert("You can't open invalid URLs.");
    }

    window.open(href);
  }

  return (
    <a href={href} {...rest} onClick={onClick}>
      {children}
    </a>
  );
}
