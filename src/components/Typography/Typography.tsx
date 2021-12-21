import { ReactNode } from 'react';
import {
  changeTextColorScheme,
  DEFAULT_ATTRS,
  DEFAULT_MARGINS,
  TEXT_COLOR,
  ColorSchemes
} from '../../helpers/tag-styles';

export function Text({
  as: Element = 'p',
  children,
  className = '',
  colorScheme = 'black'
}: {
  as?: keyof typeof DEFAULT_ATTRS;
  children: ReactNode;
  className?: string;
  colorScheme?: ColorSchemes;
}) {
  let classNames = DEFAULT_ATTRS[Element] || TEXT_COLOR;

  if (colorScheme !== 'black') {
    classNames = changeTextColorScheme(classNames, colorScheme);
  }

  // Remove unnecessary margins, if overridden.
  if (/m[a-z]?-\d/g.test(className)) {
    classNames = classNames.replace(DEFAULT_MARGINS[Element] || '', '');
  }

  return (
    <Element className={`${classNames} ${className} w-full`}>
      {children}
    </Element>
  );
}
