import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import type { helperTextVariants } from './HelperText.variants';

export type HelperTextProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof helperTextVariants> & {
    showIcon?: boolean;
  };
