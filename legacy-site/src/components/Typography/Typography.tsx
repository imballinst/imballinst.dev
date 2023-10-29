import type { JSX } from 'preact';
import {
  changeTextColorScheme,
  DEFAULT_ATTRS,
  DEFAULT_MARGINS,
  TEXT_COLOR,
  ColorSchemes
} from '../../helpers/tag-styles';

type Child = JSX.Element | string | undefined;

export interface TextProps {
  as?: keyof typeof DEFAULT_ATTRS;
  id?: string;
  children: Child | Child[];
  className?: string;
  colorScheme?: ColorSchemes;
}

export function Text({
  as: Element = 'p',
  children,
  className = '',
  colorScheme = 'black',
  ...htmlProps
}: TextProps) {
  let classNames = DEFAULT_ATTRS[Element] || TEXT_COLOR;

  if (colorScheme !== 'black') {
    classNames = changeTextColorScheme(classNames, colorScheme);
  }

  // Remove unnecessary margins, if overridden.
  if (/m[a-z]?-\d/g.test(className)) {
    classNames = classNames.replace(DEFAULT_MARGINS[Element] || '', '');
  }

  return (
    <Element className={`${classNames} ${className} w-full`} {...htmlProps}>
      {children}
    </Element>
  );
}
