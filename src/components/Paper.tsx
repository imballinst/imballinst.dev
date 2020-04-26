import React, { ReactNode } from 'react';
import { cls } from '../helpers/styles';

type PaperProps = {
  children: ReactNode;
  className?: string;
};

export function Paper({ children, className }: PaperProps) {
  return (
    <div className={cls('shadow-md p-4 flex flex-col bg-white', className)}>
      {children}
    </div>
  );
}
