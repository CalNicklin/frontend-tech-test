import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  shadows,
  breakpoints,
  radii,
} from './src/styles/tokens';

/**
 * NOTE: We intentionally strip out the standard Tailwind colors and only use our own as per design system.
 * This is to prevent using colors that are not part of the design system, but we still get the awesome Intellisense from Tailwind with our own colors.
 * There are a few extra variables there i.e. white, black, which we add in as we have removed the standard Tailwind colors.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      ...breakpoints,
    },
    colors: {
      ...colors,
    },
    fontFamily: {
      body: ['CSClarity', 'system-ui', 'sans-serif'],
      strong: ['CSClarity-bold', 'system-ui', 'sans-serif'],
    },
    extend: {
      spacing: {
        ...spacing,
      },
      borderRadius: {
        ...radii,
      },
      fontSize: {
        ...fontSizes,
      },
      fontWeight: {
        ...fontWeights,
      },
      boxShadow: {
        default: shadows.default,
      },
    },
  },
  plugins: [],
};
