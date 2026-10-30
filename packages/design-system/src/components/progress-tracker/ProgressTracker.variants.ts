import { cva } from 'class-variance-authority';

export const progressTrackerStepVariants = cva(
  // Figma models the bar as an 8px interactive box (Size/5) whose visible line is
  // 4px — the remaining height is a Gap/2 inset on every side. `bg-clip-content`
  // paints only that inner 4px band, so the hit area is 8px without the bar
  // looking any thicker. Adjacent bars butt together (container gap 0); the 4px
  // visual separation is the two 2px insets meeting.
  'outline-ws-dynamic-primary-strong-default h-ws-5 p-ws-2 w-full rounded-full bg-clip-content outline-offset-2 transition-colors focus-visible:outline-2',
  {
    variants: {
      status: {
        incomplete: 'bg-(--ws-dynamic-stroke-secondary-default)',
        completed: 'bg-ws-dynamic-success-default',
        active: 'bg-(--ws-dynamic-stroke-primary-strong-default)',
        error: 'bg-(--ws-dynamic-stroke-danger-strong-default)',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    compoundVariants: [
      {
        interactive: true,
        status: 'incomplete',
        class:
          'hover:bg-(--ws-dynamic-stroke-secondary-hover) active:bg-(--ws-dynamic-stroke-secondary-pressed)',
      },
      {
        interactive: true,
        status: 'completed',
        class: 'hover:bg-ws-dynamic-success-hover active:bg-ws-dynamic-success-pressed',
      },
      {
        interactive: true,
        status: 'active',
        class:
          'hover:bg-(--ws-dynamic-stroke-primary-strong-hover) active:bg-(--ws-dynamic-stroke-primary-strong-pressed)',
      },
      {
        interactive: true,
        status: 'error',
        class:
          'hover:bg-(--ws-dynamic-stroke-danger-strong-hover) active:bg-(--ws-dynamic-stroke-danger-strong-pressed)',
      },
    ],
    defaultVariants: {
      status: 'incomplete',
      interactive: false,
    },
  },
);
