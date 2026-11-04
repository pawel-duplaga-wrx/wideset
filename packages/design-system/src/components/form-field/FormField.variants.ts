import { cva } from 'class-variance-authority';

export const formFieldVariants = cva('flex', {
  variants: {
    variant: {
      vertical: 'flex-col gap-[0.375rem]',
      horizontal: 'gap-ws-5 flex-row items-start',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

export const formFieldLabelVariants = cva('', {
  variants: {
    variant: {
      vertical: '',
      // ws-3 (4px) plus the helper text's own Gap/3 top padding keeps 8px label → helper text.
      horizontal: 'gap-ws-3 flex w-full max-w-[10rem] shrink-0 flex-col',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

// ws-2 (2px) plus the helper text's own Gap/3 top padding keeps 6px control → helper text.
export const formFieldContentVariants = cva('gap-ws-2 flex flex-col', {
  variants: {
    variant: {
      vertical: '',
      horizontal: 'min-w-0 flex-1',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});
