import { cva } from 'class-variance-authority';

import { hoverTintMotion } from '../../motion/recipes';

export const sliderThumbMotionVariants = cva('', {
  variants: {
    enabled: { true: hoverTintMotion, false: '' },
  },
  defaultVariants: { enabled: true },
});
