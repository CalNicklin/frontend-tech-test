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
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-in-from-right':
          'slide-in-from-right 0.3s cubic-bezier(.455, .03, .515, .955);',
        'slide-out-to-right':
          'slide-out-to-right 0.3s cubic-bezier(.455, .03, .515, .955);',
        in: 'fade-in 0.2s ease-out',
        out: 'fade-out 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
