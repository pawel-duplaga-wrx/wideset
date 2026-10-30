import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { buttonVariants } from './Button.variants';
import type { ButtonIcon } from './ButtonIcon';
import type { ButtonTruncatedText } from './ButtonTruncatedText';

export type ButtonContextValue = {
  size: VariantProps<typeof buttonVariants>['size'];
  preset: VariantProps<typeof buttonVariants>['preset'];
};

/** An action button with optional composed content. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps &
  VariantProps<typeof buttonVariants> & {
    /** Whether to render the button styling onto its child element via Radix Slot. */
    asChild?: boolean;
    /** Button label or custom content rendered inside the root. */
    children?: ReactNode;
    /** Additional CSS classes merged with the button root. */
    className?: string;
    /** Disables the button visually and functionally. */
    disabled?: boolean;
    /** Called when the user activates the button. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** Native button type used for form behavior. */
    type?: 'button' | 'submit' | 'reset';
  };

/** An icon rendered within `Button`. */
export type ButtonIconProps = HTMLAttributes<HTMLDivElement> & {
  /** Icon component rendered inside the button. */
  icon: RemixiconComponentType;
  /** Additional CSS classes merged with the icon wrapper. */
  className?: string;
};

/** Props for `Button.TruncatedText` — a label that truncates with an ellipsis. */
export type ButtonTruncatedTextProps = PropsWithChildren;

export type ButtonWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>
> & {
  Icon: typeof ButtonIcon;
  TruncatedText: typeof ButtonTruncatedText;
};
