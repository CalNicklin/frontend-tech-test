/**
 * Design system -
 * IMO the naming of the colors given in the test readme is too semantic.
 * For example, 'green pill text' means the text is forever green with that token.
 * On my experience working with design, the colour palette is named as e.g. Brand-1[step-2] for hue and shading.
 * Then, we can easily swap out the color for a different value, but keep the name.
 * This makes it easier to manage the design system changes e.g. if swapping out a brand key color for a different value.
 * So, I've mocked up a micro design system as such.
 *
 * E.g. if we decided that all the 'S' value of font size was too small,
 * we could easily swap out the value for a different one, without losing its meaningful name
 */

export const colors = {
  white: '#ffffff',
  brand1: {
    step0: '#253648',
    step1: '#0F81A3',
    step2: '#66AEC5',
  },
  brand2: {
    step0: '#15693B',
    step1: '#DDF9EA',
  },
  brand3: {
    step0: '#764C25',
    step1: '#FDEFE2',
  },
  neutral: {
    step0: '#747F8A',
    step1: '#EEEFF1',
  },
} as const;

export const fontSizes = {
  /** 20px */
  L: '1.25rem',
  /** 16px */
  M: '1rem',
  /** 14px */
  S: '0.875rem',
  /** 12px */
  XS: '0.75rem',
} as const;

export const fontWeights = {
  normal: '400',
  bold: '700',
} as const;

export const spacing = {
  /** 24px */
  L: '1.5rem',
  /** 16px */
  M: '1rem',
  /** 10px */
  S: '0.625rem',
  /** 8px */
  XS: '0.5rem',
  /** 4px */
  XXS: '0.25rem',
} as const;

export const lineHeights = {
  /** 20px */
  L: '1.25rem',
  /** 16px */
  M: '1rem',
  /** 14px */
  S: '0.875rem',
  /** 12px */
  XS: '0.75rem',
} as const;

export const radii = {
  M: '0.5rem',
  S: '0.25rem',
} as const;

export const shadows = {
  default: '0 0.5rem 0.75rem rgba(0,0,0,0.16)',
} as const;

export const breakpoints = {
  S: '375px',
  M: '768px',
  L: '1024px',
  XL: '1280px',
} as const;

export type ColorKeys = keyof typeof colors extends string
  ? `${keyof typeof colors}-${string}`
  : never;

export type FontSizeKeys = keyof typeof fontSizes;
export type LineHeightKeys = keyof typeof lineHeights;
export type SpacingKeys = keyof typeof spacing;
export type RadiiKeys = keyof typeof radii;
export type ShadowsKeys = keyof typeof shadows;
export type BreakpointsKeys = keyof typeof breakpoints;
