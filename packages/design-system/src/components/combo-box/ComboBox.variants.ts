import { cva } from 'class-variance-authority';

import { fieldFocusMotion } from '../../motion/recipes';

export const comboBoxTriggerMotionVariants = cva('', {
  variants: {
    enabled: { true: fieldFocusMotion, false: '' },
  },
  defaultVariants: { enabled: true },
});

export const comboBoxContentMotionVariants = cva('', {
  variants: {
    enabled: { true: 'origin-(--radix-popover-content-transform-origin)', false: '' },
  },
  defaultVariants: { enabled: true },
});
