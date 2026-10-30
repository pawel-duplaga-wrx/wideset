import { cva } from 'class-variance-authority';

// The root is always a row — icon | content | dismiss — in both orientations, as
// in Figma. The orientation axis only carries vertical padding: the horizontal
// frame is padded Gap/7 (12px) top and bottom, the vertical one Space/400 (16px).
// Horizontal padding is Space/400 (16px) in both. What actually flips with the
// axis is the content group, handled in InlineAlert.tsx.
export const inlineAlertVariants = cva('rounded-ws-container-md gap-ws-7 px-ws-9 flex', {
  variants: {
    status: {
      error: 'bg-ws-semantic-negative text-ws-semantic-on-subtle-negative',
      warning: 'bg-ws-semantic-notice text-ws-semantic-on-subtle-notice',
      success: 'bg-ws-semantic-positive text-ws-semantic-on-subtle-positive',
      info: 'bg-ws-semantic-info text-ws-semantic-on-subtle-info',
    },
    orientation: {
      horizontal: 'py-ws-7',
      vertical: 'py-ws-9',
    },
  },
  defaultVariants: {
    status: 'info',
    orientation: 'horizontal',
  },
});

export const inlineAlertIconVariants = cva('size-ws-11 shrink-0', {
  variants: {
    status: {
      error: 'text-ws-semantic-negative',
      warning: 'text-ws-semantic-notice',
      success: 'text-ws-semantic-positive',
      info: 'text-ws-semantic-info',
    },
  },
});
