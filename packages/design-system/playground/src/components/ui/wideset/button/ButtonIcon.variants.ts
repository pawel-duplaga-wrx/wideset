import { cva } from 'class-variance-authority';

export const buttonIconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'h-ws-9 w-ws-9',
      sm: 'h-ws-9 w-ws-9',
      md: 'h-ws-11 w-ws-11',
      lg: 'h-ws-11 w-ws-11',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
