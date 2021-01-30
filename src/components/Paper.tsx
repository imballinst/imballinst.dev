import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';

export type PaperProps = {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1;
  Component?: 'div' | 'ol';
};

export function Paper({
  children,
  className,
  Component = 'div',
  elevation = 1
}: PaperProps) {
  return (
    <Component
      className={cls(
        'p-4 flex bg-white',
        elevation === 1 ? 'shadow-md' : undefined,
        className
      )}
    >
      {children}
    </Component>
  );
}
