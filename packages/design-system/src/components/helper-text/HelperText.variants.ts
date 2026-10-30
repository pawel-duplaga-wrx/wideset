import { cva } from 'class-variance-authority';

export const helperTextVariants = cva('typography-body-sm gap-ws-3 flex items-center', {
  variants: {
    state: {
      default: 'text-ws-static-subtle',
      error: 'text-ws-semantic-negative',
      warning: 'text-ws-semantic-notice',
      success: 'text-ws-semantic-positive',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const helperTextIconVariants = cva('h-ws-control-sm w-ws-control-sm', {
  variants: {
    state: {
      error: 'text-ws-semantic-negative',
      warning: 'text-ws-semantic-notice',
      success: 'text-ws-semantic-positive',
    },
  },
});
