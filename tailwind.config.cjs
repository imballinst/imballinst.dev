const colors = require('tailwindcss/colors');
const config = require('tailwindcss/defaultConfig');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './plugins/**/*.mjs',
    './public/assets/common-images/*.svg'
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      red: colors.red,
      teal: {
        50: '#E6FFFA',
        100: '#B2F5EA',
        200: '#81E6D9',
        300: '#4FD1C5',
        400: '#38B2AC',
        500: '#319795',
        600: '#2C7A7B',
        700: '#285E61',
        800: '#234E52',
        900: '#1D4044'
      }
    },
    transitionDuration: {
      ...config.theme.transitionDuration,
      250: '250ms',
      DEFAULT: '250ms'
    },
    extend: {
      width: {
        wmd: '48rem',
        wlg: '60rem'
      }
    }
  }
};
