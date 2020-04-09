import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'gatsby';
import { peepoTheme } from '../theme';

type PeepoLinkProps = { to: string; children: ReactNode; withButton?: boolean };

export function PeepoLink({ to, children, withButton }: PeepoLinkProps) {
  let rendered;

  if (withButton) {
    rendered = (
      <button className={peepoTheme.buttonVariant('dark')}>{children}</button>
    );
  } else {
    rendered = children;
  }

  return <Link to={to}>{rendered}</Link>;
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
