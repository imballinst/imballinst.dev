import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';

export type PaperProps = {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1;
  border?: boolean;
  Component?: 'div' | 'ol';
};

export function Paper({
  children,
  className,
  Component = 'div',
  elevation = 0,
  border
}: PaperProps) {
  console.log(border);
  return (
    <Component
      className={cls(
        'p-4 flex',
        elevation > 0 ? 'shadow-md' : undefined,
        border ? 'border rounded' : undefined,
        className
      )}
    >
      {children}
    </Component>
  );
}
