import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

import { peepoTheme } from '../theme';
import { cls } from '../helpers/styles';

export type PeepoButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};
type ButtonPaddings = {
  [index: string]: string;
};

const classNames: ButtonPaddings = {
  small: `py-2 px-4 ${peepoTheme.textSizes.base}`,
  medium: `py-4 px-6 ${peepoTheme.textSizes.large}`,
  large: `py-6 px-8 ${peepoTheme.textSizes.large2}`
};

const StyledButton = styled.button`
  width: ${(props: PeepoButtonProps) => (props.fullWidth ? '100%' : 'auto')};
`;

export function PeepoButton({
  children,
  className,
  size = 'small',
  fullWidth
}: PeepoButtonProps) {
  const padding = classNames[size];

  return (
    <StyledButton
      className={cls(peepoTheme.buttonVariant('dark'), padding, className)}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

type PeepoIconButtonProps = Omit<PeepoButtonProps, 'size' | 'className'>;

export function PeepoIconButton({ children, fullWidth }: PeepoIconButtonProps) {
  return (
    <PeepoButton className="rounded-full" fullWidth={fullWidth}>
      {children}
    </PeepoButton>
  );
}
