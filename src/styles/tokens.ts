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
  L: '1.5rem',
  M: '1rem',
  S: '0.625rem',
  XS: '0.5rem',
  XXS: '0.25rem',
} as const;

export const lineHeights = {
  L: '1.25rem',
  M: '1rem',
  S: '0.875rem',
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
