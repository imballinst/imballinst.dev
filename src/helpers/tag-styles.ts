export const TEXT_COLOR = 'text-black dark:text-gray-200';
const ALTERNATIVE_TEXT_COLORS = {
  black: 'text-black dark:text-gray-200',
  gray: 'text-gray-600 dark:text-gray-400',
  teal: 'text-teal-600 dark:text-teal-300'
};

export const DEFAULT_ATTRS = {
  h1: `${TEXT_COLOR} text-3xl font-bold my-6`,
  h2: `${TEXT_COLOR} text-2xl font-bold my-4`,
  h3: `${TEXT_COLOR} text-xl font-semibold my-2`,
  h4: `${TEXT_COLOR} text-lg font-semibold`,
  h5: `${TEXT_COLOR} text-base`,
  h6: `${TEXT_COLOR} text-sm`,
  p: `${TEXT_COLOR} my-2 first:mt-0 last:mb-0`,
  strong: `${TEXT_COLOR} font-semibold`
};

export const DEFAULT_MARGINS = {
  h1: `my-6`,
  h2: `my-4`,
  h3: `my-2`,
  h4: ``,
  h5: ``,
  h6: ``,
  p: `my-2 first:mt-0 last:mb-0`,
  strong: ``
};

export type ColorSchemes = 'black' | keyof typeof ALTERNATIVE_TEXT_COLORS;

export function changeTextColorScheme(
  classnames: string,
  colorScheme: ColorSchemes
) {
  return classnames.replace(TEXT_COLOR, ALTERNATIVE_TEXT_COLORS[colorScheme]);
}
