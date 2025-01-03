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
  20: '1.25rem',
  16: '1rem',
  14: '0.875rem',
  12: '0.75rem',
} as const;

export enum FontWeights {
  Normal = 'normal',
  Bold = 'bold',
}

export const spacing = {
  24: '1.5rem',
  16: '1rem',
  10: '0.625rem',
  8: '0.5rem',
  4: '0.25rem',
} as const;

export const shadows = {
  default: '0 0.5rem 0.75rem rgba(0,0,0,0.16)',
} as const;

export const breakpoints = {
  small: '375px',
  medium: '768px',
  large: '1024px',
  extraLarge: '1280px',
} as const;
