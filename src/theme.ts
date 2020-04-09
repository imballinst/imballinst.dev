const colors = {
  primary: {
    dark: '#1a202c', // bg-gray-900.
    main: '#234e52', // bg-teal-900.
    light: '#2c7a7b', // bg-teal-700.
    contrastText: '#fff' // text-white.
  }
};

export const peepoTheme = {
  colors,
  // Follow Tailwind CSS' values.
  spacing: (spacingValue: number) => `${spacingValue / 8}rem`,
  palette: {
    dark: {
      // Background.
      dark: `bg-gray-900`,
      main: `bg-teal-900`,
      light: `bg-teal-700`,
      // Text.
      contrastText: 'text-white', // #fff.
      contrastTextAlt: 'text-gray-400' // #cbd5e0.
    }
  },
  topbarHeight: 56
};
