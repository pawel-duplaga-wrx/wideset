import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

import { hoverTintMotion, pressMotion } from '../../motion/recipes';

export const dateRangePickerPresetMotionVariants = cva('', {
  variants: {
    enabled: { true: cn(hoverTintMotion, pressMotion), false: '' },
  },
  defaultVariants: { enabled: true },
});
