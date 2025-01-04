import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const baseClasses = 'font-body break-words';

const variants = {
  variant: {
    body: 'font-body',
    strong: 'font-strong',
  },
  type: {
    p: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
  },
  fontSize: {
    /** 20px */
    L: 'text-L',
    /** 16px */
    M: 'text-M',
    /** 14px */
    S: 'text-S',
    /** 12px */
    XS: 'text-XS',
  },
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

const textVariants = cva(baseClasses, {
  variants,
  defaultVariants: {
    colour: 'neutral-step-0',
    type: 'p',
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;

export interface TextProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>,
      HTMLParagraphElement | HTMLHeadingElement
    >,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement,
  TextProps
>(({ className, variant, fontSize, colour, type, ...props }, ref) => {
  const Comp = type ?? 'p';

  // Split into base styles and variant styles
  const baseStyles = className ?? '';
  const variantStyles = textVariants({ variant, fontSize, colour });

  return (
    <Comp
      // Force the variant styles to come after the base styles
      className={`${baseStyles} ${variantStyles}`}
      ref={ref}
      {...props}
    />
  );
});
Text.displayName = 'Text';

export { Text, textVariants, variants };
