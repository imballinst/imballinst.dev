// Since TailwindCSS do not support CSS-in-JS, we do this.
// I don't want to use CSS because Gatsby builds rather slowly for some reason when using CSS.
// When I update `p` tag with CSS, it takes 4 seconds, while if I add a className, it takes under 1 second.

type ThemeMode = 'dark';
type ColorSetElement = {
  twClass: string;
  hex: string;
};
type ColorSet = {
  dark: ColorSetElement;
  main: ColorSetElement;
  light: ColorSetElement;
  contrastText: ColorSetElement;
  contrastTextHover: ColorSetElement;
};
type ColorSets = {
  [index: string]: ColorSet;
  dark: ColorSet;
  blue: ColorSet;
};

// The first array element refers to the color, the second one refers to its TailwindCSS equivalent.
const colorSets: ColorSets = {
  dark: {
    dark: { hex: '#1a202c', twClass: 'bg-teal-900' },
    main: { hex: '#234e52', twClass: 'bg-teal-800' },
    light: { hex: '#2c7a7b', twClass: 'bg-teal-700' },
    contrastText: { hex: '#fff', twClass: 'text-white' },
    contrastTextHover: { hex: '#cbd5e0', twClass: 'text-gray-300' }
  },
  blue: {
    dark: { hex: '#3182ce', twClass: 'bg-teal-600' },
    main: { hex: '#4299e1', twClass: 'bg-teal-500' },
    light: { hex: '#63b3ed', twClass: 'bg-teal-400' },
    contrastText: { hex: '#000', twClass: 'text-white' },
    contrastTextHover: { hex: '#cbd5e0', twClass: 'text-gray-300' }
  }
};

const textSizes = {
  large4: 'text-3xl', // 1.875rem.
  large3: 'text-2xl', // 1.5rem.
  large2: 'text-xl', // 1.25rem.
  large: 'text-lg', // 1.125rem.
  base: 'text-base', // 1rem.
  small: 'text-sm' // .875rem.
};

export const peepoTheme = {
  colorSets,
  textSizes,
  /**
   * Imagine this function as TailwindCSS' margin and padding values.
   * For example, if `spacingValue` is 4, then it is `1rem`.
   * Equivalently, `*-4` in Tailwind equals to `1rem`.
   */
  spacing: (spacingValue: number) => `${spacingValue / 4}rem`,
  buttonVariant: (mode: ThemeMode) => {
    const colorSet = colorSets[mode];

    return `${colorSet.main.twClass} hover:${colorSet.dark.twClass} ${colorSet.contrastText.twClass} font-bold rounded`;
  },
  navbarLinkVariant: (mode: ThemeMode) => {
    const colorSet = colorSets[mode];

    return `${colorSet.contrastText.twClass} hover:${colorSet.contrastTextHover.twClass} font-bold`;
  },
  topbarHeight: 56,
  pageHorizontalSpacing: 'px-16 sm:px-24 md:px-32',
  pageVerticalSpacing: 'py-4 lg:py-8',
  maxOptimalWidth: '768px'
};
