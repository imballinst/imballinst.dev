import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';
import { peepoTheme } from '../theme';

const variantClasses = {
  h1: `${peepoTheme.textSizes.large4} font-bold`,
  h2: `${peepoTheme.textSizes.large3} font-bold`,
  h3: `${peepoTheme.textSizes.large2}`,
  h4: `${peepoTheme.textSizes.large}`,
  h5: `${peepoTheme.textSizes.base}`,
  h6: `${peepoTheme.textSizes.small}`,
  body: `${peepoTheme.textSizes.base}`
};

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
  className?: string;
  children: ReactNode;
};

function getComponent(variant: TypographyProps['variant']) {
  if (variant === 'body') {
    return 'p';
  }

  return variant;
}

export function Typography({ variant, className, children }: TypographyProps) {
  const Component = getComponent(variant);
  const classNames = cls(variantClasses[variant], className);

  return <Component className={classNames}>{children}</Component>;
}
