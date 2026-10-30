import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

export const progressStepperVariants = cva('flex w-full', {
  variants: {
    orientation: {
      horizontal: 'gap-ws-9 items-center justify-between',
      vertical: 'gap-ws-3 flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const progressStepperStepVariants = cva(
  cn(
    'gap-ws-9 flex items-center',
    'outline-ws-dynamic-primary-strong-default focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  {
    variants: {
      status: {
        completed: '',
        incomplete: '',
        active: '',
        error: '',
      },
      disabled: {
        false: '',
        true: 'pointer-events-none',
      },
      withLine: {
        false: '',
        true: 'grow',
      },
      orientation: {
        // Figma: horizontal item has cornerRadius 0, vertical Corner Radius/Control/lg.
        horizontal: 'rounded-none',
        vertical: 'rounded-ws-control-lg cursor-pointer',
      },
    },
    compoundVariants: [
      {
        status: 'completed',
        orientation: 'vertical',
        class:
          'focus-visible:outline-ws-dynamic-primary-strong-default focus-visible:bg-ws-dynamic-secondary-alpha-default',
      },
      {
        status: 'incomplete',
        orientation: 'vertical',
        class:
          'hover:bg-ws-dynamic-secondary-alpha-hover active:bg-ws-dynamic-secondary-alpha-pressed focus-visible:bg-ws-dynamic-secondary-alpha-default',
      },
      {
        status: 'active',
        orientation: 'vertical',
        class:
          'bg-ws-dynamic-tertiary-alpha-strong-default hover:bg-ws-dynamic-tertiary-alpha-strong-hover active:bg-ws-dynamic-tertiary-alpha-strong-pressed focus-visible:bg-ws-dynamic-secondary-alpha-default',
      },
      {
        status: 'error',
        orientation: 'vertical',
        class: 'focus-visible:outline-ws-dynamic-danger-strong-default',
      },
    ],
    defaultVariants: {
      disabled: false,
      withLine: false,
      orientation: 'horizontal',
    },
  },
);

export const progressStepperIconVariants = cva(
  cn(
    'flex shrink-0 items-center justify-center',
    'rounded-full',
    'outline-ws-dynamic-primary-strong-default',
    'typography-label-strong-sm',
  ),
  {
    variants: {
      status: {
        completed:
          'bg-ws-dynamic-success-default text-ws-dynamic-on-success-default hover:bg-ws-dynamic-success-hover active:bg-ws-dynamic-success-pressed group-hover:bg-ws-dynamic-success-hover group-active:bg-ws-dynamic-success-pressed',
        incomplete:
          'bg-ws-dynamic-secondary-default text-ws-dynamic-on-secondary-default hover:bg-ws-dynamic-secondary-hover active:bg-ws-dynamic-secondary-pressed group-hover:bg-ws-dynamic-secondary-hover group-active:bg-ws-dynamic-secondary-pressed',
        active:
          'bg-ws-dynamic-primary-alpha-strong-default text-ws-dynamic-primary-default hover:bg-ws-dynamic-primary-alpha-strong-hover active:bg-ws-dynamic-primary-alpha-strong-pressed group-hover:bg-ws-dynamic-primary-alpha-strong-hover group-active:bg-ws-dynamic-primary-alpha-strong-pressed',
        error:
          'bg-ws-dynamic-danger-default hover:bg-ws-dynamic-danger-hover active:bg-ws-dynamic-danger-pressed group-hover:bg-ws-dynamic-danger-hover group-active:bg-ws-dynamic-danger-pressed text-ws-dynamic-on-danger-default outline-ws-dynamic-danger-strong-default',
      },
      orientation: {
        horizontal:
          'size-ws-14 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2',
        vertical: 'size-ws-12',
      },
      disabled: {
        true: 'pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        orientation: 'vertical',
        status: ['incomplete', 'active'],
        class:
          'border-ws-dynamic-secondary-default hover:border-ws-dynamic-secondary-hover active:border-ws-dynamic-secondary-pressed group-hover:border-ws-dynamic-secondary-hover group-active:border-ws-dynamic-secondary-pressed border bg-transparent group-hover:bg-transparent group-active:bg-transparent hover:bg-transparent active:bg-transparent',
      },
      {
        status: 'completed',
        disabled: true,
        class: 'bg-ws-dynamic-success-disabled text-ws-dynamic-on-success-disabled',
      },
      {
        status: ['active', 'incomplete'],
        disabled: true,
        class:
          'text-ws-dynamic-on-secondary-disabled border-ws-dynamic-secondary-disabled border bg-transparent',
      },
      {
        orientation: 'vertical',
        status: 'error',
        class:
          'bg-ws-static-foreground group-hover:bg-ws-static-foreground group-active:bg-ws-static-foreground hover:bg-ws-static-foreground active:bg-ws-static-foreground text-(--ws-dynamic-stroke-danger-strong-default) group-hover:text-(--ws-dynamic-text-danger-default) group-active:text-(--ws-dynamic-text-danger-hover) hover:text-(--ws-dynamic-text-danger-default) active:text-(--ws-dynamic-text-danger-hover)',
      },
    ],
    defaultVariants: {
      disabled: false,
      orientation: 'horizontal',
    },
  },
);

export const progressStepperIconContentVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'size-ws-11',
      vertical: 'size-ws-9',
    },
    status: {
      completed: '',
      incomplete: '',
      active: '',
      error: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    orientation: 'horizontal',
  },
});
