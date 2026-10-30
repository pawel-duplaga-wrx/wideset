import { cva } from 'class-variance-authority';

export const clearButtonOffsetVariants = cva('', {
  variants: {
    size: {
      sm: 'right-ws-14',
      md: 'right-ws-16',
      lg: 'right-ws-18',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
