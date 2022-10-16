import type { JSX } from 'preact';
import {
  ButtonColorSchemes,
  BUTTON_COLOR_SCHEMES,
  changeButtonColorScheme
} from '../../helpers/tag-styles';

export function Button({
  children,
  colorScheme = 'white',
  className = '',
  ...props
}: {
  children: JSX.Element | JSX.Element[] | string;
  colorScheme?: ButtonColorSchemes;
  className?: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  let colorClassNames = BUTTON_COLOR_SCHEMES.white;
  let customCursor = '';

  if (colorScheme !== 'white') {
    colorClassNames = changeButtonColorScheme(colorClassNames, colorScheme);
  }

  if (props.disabled) {
    customCursor = 'cursor-not-allowed';
  }

  return (
    <button
      type="button"
      className={`${colorClassNames} px-3 py-2 rounded-lg transition-colors flex flex-row items-center ${className} ${customCursor}`}
      {...props}
    >
      {children}
    </button>
  );
}
