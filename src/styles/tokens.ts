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
    'step-0': '#EEEFF1',
  },
} as const;

export const fontSizes = {
  XL: '1.25rem',
  L: '1rem',
  M: '0.875rem',
  S: '0.75rem',
} as const;

export const fontWeights = {
  normal: '400',
  bold: '700',
} as const;

export const spacing = {
  XL: '1.5rem',
  L: '1rem',
  M: '0.625rem',
  S: '0.5rem',
  XS: '0.25rem',
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
