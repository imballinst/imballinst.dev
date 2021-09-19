import React, { ReactNode, Ref, forwardRef } from 'react';
import styled from '@emotion/styled';

import { peepoTheme } from '../theme';
import { cls } from '../helpers/styles';

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
  disableBackgroundHover?: boolean;
  disableElevation?: boolean;
  type?: 'button' | 'submit';
  ref?: Ref<HTMLButtonElement>;
  onClick?: () => void;
};

export interface PeepoButtonProps extends CommonButtonProps {
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
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
  type = 'button',
  size = 'small',
  disableElevation,
  disableBackgroundHover,
  ...props
}: PeepoButtonProps) {
  const padding = classNames[size];

  return (
    <StyledButton
      {...props}
      type={type}
      className={cls(
        peepoTheme.buttonVariant('dark', { disableBackgroundHover }),
        padding,
        className,
        disableElevation ? 'shadow' : undefined
      )}
    >
      {children}
    </StyledButton>
  );
}

export const PeepoIconButton = forwardRef<
  HTMLButtonElement,
  CommonButtonProps & {
    variant?: 'default' | 'navbar';
  }
>(
  (
    {
      children,
      type = 'button',
      className,
      disableBackgroundHover,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        {...props}
        ref={ref}
        type={type}
        className={cls(
          variant === 'navbar'
            ? peepoTheme.buttonNavbarVariant('dark', { disableBackgroundHover })
            : peepoTheme.buttonVariant('dark'),
          peepoTheme.textSizes.small,
          'rounded-full',
          className
        )}
      >
        {children}
      </StyledButton>
    );
  }
);
