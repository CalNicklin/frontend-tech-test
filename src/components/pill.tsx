import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@client/utils';

const baseClasses = cn('flex bg-neutral-step1 rounded-S p-XS');

const variants = {
  colour: {
    'brand1-step0': 'text-brand1-step0',
    'brand1-step1': 'text-brand1-step1',
    'brand1-step2': 'text-brand1-step2',
    'brand2-step0': 'text-brand2-step0',
    'brand2-step1': 'text-brand2-step1',
    'brand3-step0': 'text-brand3-step0',
    'brand3-step1': 'text-brand3-step1',
    'neutral-step-0': 'text-neutral-step-0',
    'neutral-step-1': 'text-neutral-step-1',
  },
};
const pillVariants = cva(baseClasses, {
  variants,
});

export type PillVariantProps = VariantProps<typeof pillVariants>;

export const Pill = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PillVariantProps
>(({ children, className, colour, ...props }, ref) => (
  <div ref={ref} className={cn(pillVariants({ colour, className }))} {...props}>
    {children}
  </div>
));
Pill.displayName = 'Pill';
