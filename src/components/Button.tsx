import React, { ReactNode } from 'react';
import { peepoTheme } from '../theme';

type PeepoButtonProps = {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
};
type ButtonPaddings = {
  [index: string]: string;
};

const paddings: ButtonPaddings = {
  small: `py-2 px-4`,
  medium: `py-4 px-6`,
  large: `py-6 px-8`
};

export function PeepoButton({ children, size = 'small' }: PeepoButtonProps) {
  const padding = paddings[size];

  return (
    <button className={`${peepoTheme.buttonVariant('dark')} ${padding}`}>
      {children}
    </button>
  );
}
