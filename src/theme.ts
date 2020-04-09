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
};

// The first array element refers to the color, the second one refers to its TailwindCSS equivalent.
const colorSets: ColorSets = {
  dark: {
    dark: { hex: '#1a202c', twClass: 'bg-gray-900' },
    main: { hex: '#234e52', twClass: 'bg-teal-900' },
    light: { hex: '#2c7a7b', twClass: 'bg-teal-700' },
    contrastText: { hex: '#fff', twClass: 'text-white' },
    contrastTextHover: { hex: '#cbd5e0', twClass: 'text-gray-400' }
  }
};

export const peepoTheme = {
  colorSets,
  // Follow Tailwind CSS' values.
  spacing: (spacingValue: number) => `${spacingValue / 8}rem`,
  buttonVariant: (mode: ThemeMode) => {
    const colorSet = colorSets[mode];

    return `${colorSet.main.twClass} hover:${colorSet.dark.twClass} ${colorSet.contrastText.twClass} font-bold rounded`;
  },
  navbarLinkVariant: (mode: ThemeMode) => {
    const colorSet = colorSets[mode];

    return `${colorSet.contrastText.twClass} hover:${colorSet.contrastTextHover.twClass} font-bold`;
  },
  topbarHeight: 56,
  pageHorizontalSpacing: 'px-8 md:px-16 lg:px-24',
  pageVerticalSpacing: 'pt-16' // due to topbar.
};
