// Palette.
// Dark: gray-900
// Main: teal-900
// Light: teal-700
// Contrast text: white
// Contrast text hover: gray-400

export const peepoTheme = {
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
  }
};
