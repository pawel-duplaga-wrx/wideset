import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { actionBarVariants } from './ActionBar.variants';

/** Floating actions for the current selection. */
export type ActionBarProps = {
  /** Selected item count, or a count and formatter tuple for a custom selection label. */
  amountSelected?: number | [count: number, format: (amount: number) => ReactNode];
  /** Controls visibility of the action bar. Defaults to `false`. */
  isOpen?: boolean;
  /** Called when the close button is activated; clear the selection or hide the bar in response. */
  onClose?: () => void;
  /** Action content rendered after the close button and selected count — typically buttons or icon buttons. */
  children?: ReactNode;
  /** Accessible label for the close button. Defaults to `'Close'`. */
  closeAriaLabel?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'> &
  VariantProps<typeof actionBarVariants> &
  MotionProps;
