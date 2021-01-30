import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';

export type PaperProps = {
  children: ReactNode;
  className?: string;
  Component?: 'div' | 'ol';
};

export function Paper({ children, className, Component = 'div' }: PaperProps) {
  return (
    <Component
      className={cls('shadow-md p-4 flex flex-col bg-white', className)}
    >
      {children}
    </Component>
  );
}
