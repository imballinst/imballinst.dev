export const DEFAULT_BG = 'bg-gray-50 dark:bg-gray-800';

export const TEXT_COLOR = 'text-black dark:text-gray-200';
const ALTERNATIVE_TEXT_COLORS = {
  black: TEXT_COLOR,
  gray: 'text-gray-600 dark:text-gray-400',
  teal: 'text-teal-600 dark:text-teal-300',
  red: 'text-red-600 dark:text-red-400',
  staticTeal: 'text-teal-300',
  staticGray: 'text-gray-200'
};

export const BUTTON_COLOR_SCHEMES = {
  white: `${ALTERNATIVE_TEXT_COLORS.black} ${DEFAULT_BG} hover:bg-gray-200 dark:hover:bg-gray-700`,
  teal: `text-white bg-teal-600 hover:bg-teal-500 disabled:bg-teal-200/50`
};

export const DEFAULT_ATTRS = {
  h1: `${TEXT_COLOR} text-3xl font-bold my-6`,
  h2: `${TEXT_COLOR} text-2xl font-bold my-4`,
  h3: `${TEXT_COLOR} text-xl font-semibold my-2`,
  h4: `${TEXT_COLOR} text-lg font-semibold`,
  h5: `${TEXT_COLOR} text-base`,
  h6: `${TEXT_COLOR} text-sm`,
  p: `${TEXT_COLOR} my-2 first:mt-0 last:mb-0`,
  strong: `${TEXT_COLOR} font-semibold`,
  div: '',
  span: ''
};

export const DEFAULT_MARGINS = {
  h1: `my-6`,
  h2: `my-4`,
  h3: `my-2`,
  h4: ``,
  h5: ``,
  h6: ``,
  p: `my-2 first:mt-0 last:mb-0`,
  strong: ``,
  div: '',
  span: ''
};

export type ColorSchemes = 'black' | keyof typeof ALTERNATIVE_TEXT_COLORS;
export type ButtonColorSchemes = keyof typeof BUTTON_COLOR_SCHEMES;

export function changeTextColorScheme(classnames: string, colorScheme: ColorSchemes) {
  return classnames.replace(TEXT_COLOR, ALTERNATIVE_TEXT_COLORS[colorScheme]);
}

export function changeButtonColorScheme(classnames: string, colorScheme: ButtonColorSchemes) {
  return classnames.replace(BUTTON_COLOR_SCHEMES.white, BUTTON_COLOR_SCHEMES[colorScheme]);
}
