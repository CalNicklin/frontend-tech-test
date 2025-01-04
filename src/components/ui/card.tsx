import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@client/utils';

const baseClasses = cn('font-body text-neutral-step0 flex bg-white rounded-M');

const variants = {
  variant: {
    insight: 'flex-col p-L justify-center gap-M shadow-default w-full h-full bg-white',
  },
};

const cardVariants = cva(baseClasses, {
  variants,
});

export type CardVariantProps = VariantProps<typeof cardVariants>;

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardVariantProps
>(({ children, className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = 'Card';
