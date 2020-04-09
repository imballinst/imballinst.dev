// Since TailwindCSS do not support CSS-in-JS, we do this.
// I don't want to use CSS because Gatsby builds rather slowly for some reason when using CSS.
// When I update `p` tag with CSS, it takes 4 seconds, while if I add a className, it takes under 1 second.
const colors = {
  primary: {
    dark: '#1a202c', // bg-gray-900.
    main: '#234e52', // bg-teal-900.
    light: '#2c7a7b', // bg-teal-700.
    contrastText: '#fff', // text-white.
    contrastTextAlt: '#cbd5e0' // text-gray-400.
  }
};

export const peepoTheme = {
  colors,
  // Follow Tailwind CSS' values.
  spacing: (spacingValue: number) => `${spacingValue / 8}rem`,
  palette: {
    // Dark.
    primary: {
      // Background.
      dark: `bg-gray-900`,
      main: `bg-teal-900`,
      light: `bg-teal-700`,
      // Text.
      contrastText: 'text-white', // #fff.
      contrastTextAlt: 'text-gray-400' // #cbd5e0.
    }
  },
  topbarHeight: 56,
  pageHorizontalSpacing: 'px-8 md:px-16 lg:px-24'
};
