import { cva } from 'class-variance-authority';
import { cn } from '@/lib/wideset/utils';

import { switchThumbTravelMotion, switchTrackMotion } from '@/lib/wideset/motion/recipes';

export const switchVariants = cva(
  cn(
    'group focus-visible:wds-focus-visible focus-visible:outline-ws-dynamic-primary-strong-default relative cursor-pointer focus-visible:select-none disabled:pointer-events-none disabled:cursor-default',
    'rounded-full',
    'bg-ws-dynamic-secondary-alpha-strong-default hover:bg-ws-dynamic-secondary-alpha-strong-hover focus-visible:bg-ws-dynamic-secondary-alpha-strong-default active:bg-ws-dynamic-secondary-alpha-strong-pressed disabled:bg-ws-dynamic-secondary-disabled',
    'radix-state-checked:disabled:bg-ws-dynamic-primary-disabled radix-state-checked:bg-ws-dynamic-primary-default radix-state-checked:hover:bg-ws-dynamic-primary-hover radix-state-checked:active:bg-ws-dynamic-primary-pressed',
  ),
  {
    variants: {
      size: {
        sm: 'h-ws-control-sm w-ws-control-xl',
        lg: 'h-ws-control-md w-ws-control-xxl',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

export const switchThumbVariants = cva(
  cn(
    'absolute top-1/2 left-0 shrink-0 -translate-y-1/2 transform rounded-full',
    'shadow-ws-medium bg-(--ws-dynamic-text-on-primary-default)',
    'group-disabled:bg-(--ws-dynamic-text-on-primary-disabled) group-disabled:shadow-none',
  ),
  {
    variants: {
      size: {
        sm: cn(
          'h-ws-control-xs w-ws-control-xs translate-x-(--spacing-ws-2)',
          'radix-state-checked:translate-x-[calc(100%+var(--spacing-ws-2))]',
        ),
        lg: cn(
          'h-ws-control-sm w-ws-control-sm translate-x-(--spacing-ws-2)',
          'radix-state-checked:translate-x-[calc(100%-var(--spacing-ws-2))]',
        ),
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

export const switchMotionVariants = cva('', {
  variants: {
    enabled: { true: switchTrackMotion, false: '' },
  },
  defaultVariants: { enabled: true },
});

export const switchThumbMotionVariants = cva('', {
  variants: {
    enabled: { true: switchThumbTravelMotion, false: '' },
    size: { sm: '', lg: '' },
  },
  compoundVariants: [
    {
      enabled: true,
      size: 'sm',
      className: cn(
        'group-[:active:not(:disabled)]:h-[calc(var(--spacing-ws-control-xs)*0.75)]',
        'group-[:active:not(:disabled)]:w-[calc(var(--spacing-ws-control-xs)*1.3)]',
        'group-[:active:not(:disabled)[data-state=checked]]:translate-x-[calc(100%+var(--spacing-ws-2)-var(--spacing-ws-control-xs)*0.6)]',
      ),
    },
    {
      enabled: true,
      size: 'lg',
      className: cn(
        'group-[:active:not(:disabled)]:h-[calc(var(--spacing-ws-control-sm)*0.75)]',
        'group-[:active:not(:disabled)]:w-[calc(var(--spacing-ws-control-sm)*1.3)]',
        'group-[:active:not(:disabled)[data-state=checked]]:translate-x-[calc(100%-var(--spacing-ws-2)-var(--spacing-ws-control-sm)*0.6)]',
      ),
    },
  ],
  defaultVariants: { enabled: true, size: 'lg' },
});
