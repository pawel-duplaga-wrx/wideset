import { cva } from 'class-variance-authority';

import { fillTravelMotion } from '../../motion/recipes';

export const progressBarIndicatorVariants = cva('size-full flex-1 rounded-full', {
  variants: {
    variant: {
      default: 'bg-ws-dynamic-primary-default',
      success: 'bg-(--ws-semantic-stroke-positive)',
      error: 'bg-(--ws-semantic-stroke-negative)',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const progressBarCircleIconVariants = cva('size-ws-control-md', {
  variants: {
    variant: {
      success: 'text-(--ws-dynamic-stroke-success-strong-default)',
      error: 'text-(--ws-dynamic-text-danger-default)',
    },
  },
});

export const progressBarIndicatorMotionVariants = cva('', {
  variants: {
    enabled: { true: fillTravelMotion, false: '' },
  },
  defaultVariants: { enabled: true },
});

export const progressBarCircleMotionVariants = cva('', {
  variants: {
    enabled: { true: 'transition-[stroke-dashoffset] ease-linear', false: '' },
  },
  defaultVariants: { enabled: true },
});
