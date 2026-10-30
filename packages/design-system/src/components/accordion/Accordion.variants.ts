import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

export const accordionTriggerVariants = cva(
  cn(
    'bg-ws-dynamic-secondary-alpha-default gap-ws-7 py-ws-8 box-border flex w-full cursor-pointer text-left outline-hidden',
    'group/trigger text-ws-static-strong typography-label-strong-sm',
    'radix-disabled:text-ws-static-subtle radix-disabled:cursor-default',
  ),
  {
    variants: {
      contained: {
        true: 'radix-disabled:pointer-events-none px-ws-9',
        false: 'radix-disabled:hover:no-underline hover:underline',
      },
    },
    defaultVariants: {
      contained: false,
    },
  },
);

export const accordionChevronMotionVariants = cva('', {
  variants: {
    enabled: {
      true: 'transition-transform duration-(--ws-motion-duration-fast) ease-(--ws-motion-ease-smooth-out)',
      false: '',
    },
  },
  defaultVariants: { enabled: true },
});

export const accordionContentMotionVariants = cva('', {
  variants: {
    enabled: {
      true: cn(
        'overflow-hidden',
        'data-[state=open]:animate-[ws-accordion-down_var(--ws-motion-duration-fast)_var(--ws-motion-ease-smooth-out)]',
        'data-[state=closed]:animate-[ws-accordion-up_var(--ws-motion-duration-quick)_var(--ws-motion-ease-smooth-out)]',
      ),
      false: '',
    },
  },
  defaultVariants: { enabled: true },
});
