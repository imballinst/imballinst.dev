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
  elevation = 0
}: PaperProps) {
  return (
    <Component
      className={cls(
        'p-4 flex',
        elevation > 0 ? 'shadow-md' : undefined,
        elevation === 0 ? 'border rounded' : undefined,
        className
      )}
    >
      {children}
    </Component>
  );
}
