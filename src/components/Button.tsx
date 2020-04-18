import React, { ReactNode, RefObject, Ref, forwardRef } from 'react';
import styled from '@emotion/styled';

import { peepoTheme } from '../theme';
import { cls } from '../helpers/styles';

type CommonButtonProps = {
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
  onClick?: () => void;
};

export interface PeepoButtonProps extends CommonButtonProps {
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
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
  ...props
}: PeepoButtonProps) {
  const padding = classNames[size];

  return (
    <StyledButton
      {...props}
      className={cls(
        peepoTheme.buttonVariant('dark'),
        padding,
        className,
        'shadow'
      )}
    >
      {children}
    </StyledButton>
  );
}

export const PeepoIconButton = forwardRef<HTMLButtonElement, CommonButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledButton
        {...props}
        ref={ref}
        className={cls(
          peepoTheme.buttonVariant('dark'),
          peepoTheme.textSizes.small,
          'p-1 shadow rounded-full'
        )}
      >
        {children}
      </StyledButton>
    );
  }
);
