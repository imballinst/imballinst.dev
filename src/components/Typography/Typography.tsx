import { ElementType, ReactNode } from 'react';

export function Text({
  as: Element = 'p',
  children,
  className = '',
  colorScheme = 'black'
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  colorScheme?: 'black' | 'gray';
}) {
  let classNames = 'text-black dark:text-gray-200';

  if (colorScheme === 'gray') {
    classNames = 'text-gray-500 dark:text-gray-400';
  }

  return (
    <Element className={`${classNames} ${className} w-full`}>
      {children}
    </Element>
  );
}
