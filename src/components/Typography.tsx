import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';

const variantClasses = {
  h1: 'text-3xl font-bold', // 1.875rem.
  h2: 'text-2xl font-bold', // 1.5rem.
  h3: 'text-xl', // 1.25rem.
  h4: 'text-lg', // 1.125rem.
  h5: 'text-base', // 1rem.
  h6: 'text-sm', // .875rem.
  body: 'text-base'
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
