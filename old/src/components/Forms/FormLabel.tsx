import React, { ReactNode } from 'react';
import { peepoTheme } from '../../theme';

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export const FormLabel = ({ children, htmlFor }: FormLabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`${peepoTheme.textSizes.small} cursor-pointer`}
  >
    {children}
  </label>
);
