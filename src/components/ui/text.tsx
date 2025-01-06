import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  type FontSizeKeys,
  type LineHeightKeys,
  type ColorKeys,
} from '@/styles/tokens';

/**
 * I like implementing typesafe Text, UI components with CVA.
 * It's especially useful for components with many variants like buttons, text, etc.
 * Because it can be nicely setup in Storybook, and we lock in the available variants with intellisense, and can easily add new ones.
 *
 * The available variants are tied to the design system and I'd expect an agreement between
 * dev and design to ensure the naming is consistent.
 *
 */

const baseClasses = 'font-body break-words';

const variants = {
  variant: {
    body: 'font-body font-normal',
    strong: 'font-strong font-bold',
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
  } satisfies Record<FontSizeKeys, string>,
  lineHeight: {
    /** 20px */
    L: 'leading-L',
    /** 16px */
    M: 'leading-M',
    /** 14px */
    S: 'leading-S',
    /** 12px */
    XS: 'leading-XS',
  } satisfies Record<LineHeightKeys, string>,
  colour: {
    'brand1-step0': 'text-brand1-step0',
    'brand1-step1': 'text-brand1-step1',
    'brand1-step2': 'text-brand1-step2',
    'brand2-step0': 'text-brand2-step0',
    'brand2-step1': 'text-brand2-step1',
    'brand3-step0': 'text-brand3-step0',
    'brand3-step1': 'text-brand3-step1',
    'neutral-step0': 'text-neutral-step0',
    'neutral-step1': 'text-neutral-step1',
  } satisfies Record<ColorKeys, string>,
} as const;

const textVariants = cva(baseClasses, {
  variants,
  defaultVariants: {
    colour: 'neutral-step0',
    type: 'p',
    fontSize: 'S',
    lineHeight: 'L',
    variant: 'body',
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
>(
  (
    { className, variant, fontSize, lineHeight, colour, type, ...props },
    ref,
  ) => {
    const Comp = type ?? 'p';

    // Split into base styles and variant styles
    const baseStyles = className ?? '';
    const variantStyles = textVariants({
      variant,
      fontSize,
      colour,
      lineHeight,
    });

    return (
      <Comp
        // Force the variant styles to come after the base styles
        className={`${baseStyles} ${variantStyles}`}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';

export { Text, textVariants, variants };
