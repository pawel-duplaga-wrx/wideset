import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

export const cardVariants = cva(
  cn('flex w-full flex-col overflow-clip [overflow-clip-margin:border-box]'),
  {
    variants: {
      variant: {
        bordered: 'rounded-ws-container-lg bg-ws-static-container border-ws-static-base border',
        flat: '',
      },
    },
    defaultVariants: {
      variant: 'bordered',
    },
  },
);

export const CARD_HEADER_CLASS = 'ws-card-header';

export const cardHeaderVariants = cva(cn('flex flex-col'), {
  variants: {
    variant: {
      bordered: 'border-ws-static-base px-ws-11 pt-ws-9 pb-ws-8 [&:not(:last-child)]:border-b',
      flat: 'pb-ws-9 [&:not(:first-child)]:pt-ws-9',
    },
  },
  defaultVariants: {
    variant: 'bordered',
  },
});

export const cardContentVariants = cva(cn('min-h-full'), {
  variants: {
    variant: {
      bordered: 'p-ws-11',
      flat: '',
    },
  },
  defaultVariants: {
    variant: 'bordered',
  },
});

export const cardFooterVariants = cva(cn('flex'), {
  variants: {
    variant: {
      bordered:
        'border-ws-static-base px-ws-11 py-ws-9 [&:not(:first-child)]:border-t [.ws-card-header+&]:border-t-0',
      flat: 'pt-ws-9',
    },
  },
  defaultVariants: {
    variant: 'bordered',
  },
});

export const cardMediaVariants = cva(cn('overflow-hidden'), {
  variants: {
    variant: {
      bordered: '-mx-px [&:first-child]:-mt-px [&:last-child]:-mb-px',
      flat: 'rounded-ws-container-md',
    },
  },
  defaultVariants: {
    variant: 'bordered',
  },
});
