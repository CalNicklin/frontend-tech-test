import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const baseClasses = cn('flex items-center justify-center');

const variants = {
  colour: {
    'brand1-step0': 'bg-brand1-step0',
    'brand1-step1': 'bg-brand1-step1',
    'brand1-step2': 'bg-brand1-step2',
    'brand2-step0': 'bg-brand2-step0',
    'brand2-step1': 'bg-brand2-step1',
    'brand3-step0': 'bg-brand3-step0',
    'brand3-step1': 'bg-brand3-step1',
    'neutral-step0': 'bg-neutral-step0',
    'neutral-step1': 'bg-neutral-step1',
  },
  padding: {
    none: '',
    XS: 'p-XS',
    S: 'p-S',
    M: 'p-M',
    L: 'p-L',
  },
};
const pillVariants = cva(baseClasses, {
  variants,
  defaultVariants: {
    padding: 'XS',
  },
});

export type PillVariantProps = VariantProps<typeof pillVariants>;

export const Pill = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PillVariantProps
>(({ children, className, colour, padding, ...props }, ref) => {
  // Split into base styles and variant styles
  const baseStyles = className ?? '';
  const variantStyles = pillVariants({ colour, padding });

  return (
    <div ref={ref} className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </div>
  );
});
Pill.displayName = 'Pill';
