import { cva } from 'class-variance-authority';

export const fileItemVariants = cva('gap-ws-7 flex flex-col', {
  variants: {
    variant: {
      uncontained: '',
      contained: 'rounded-ws-container-md py-ws-7 pr-ws-7 pl-ws-9',
    },
    state: {
      uploading: '',
      success: '',
      error: '',
    },
  },
  defaultVariants: {
    variant: 'contained',
    state: 'success',
  },
  compoundVariants: [
    {
      variant: 'contained',
      state: 'uploading',
      className: 'bg-ws-dynamic-tertiary-alpha-strong-default',
    },
    {
      variant: 'contained',
      state: 'success',
      className: 'bg-ws-dynamic-tertiary-alpha-strong-default',
    },
    {
      variant: 'contained',
      state: 'error',
      className: 'bg-ws-dynamic-danger-alpha-strong-default',
    },
  ],
});

/* The row gap is state-dependent in Figma: `Gap/9` (16px) while uploading,
   `Gap/7` (12px) once the upload has settled into success or error. */
export const fileItemContentVariants = cva('flex items-center', {
  variants: {
    state: {
      uploading: 'gap-ws-9',
      success: 'gap-ws-7',
      error: 'gap-ws-7',
    },
  },
  defaultVariants: {
    state: 'success',
  },
});
