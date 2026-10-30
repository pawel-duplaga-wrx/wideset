import { cva } from 'class-variance-authority';
import { cn } from '@/lib/wideset/utils';

export const statusBadgeVariants = cva(
  cn(
    'gap-ws-1 inline-flex shrink-0 items-center justify-center',
    'focus-visible:wds-focus-visible focus-visible:outline-ws-dynamic-primary-strong-default',
  ),
  {
    variants: {
      color: {
        negative: 'bg-ws-semantic-inverse-negative text-ws-semantic-on-inverse-negative',
        positive: 'bg-ws-semantic-inverse-positive text-ws-semantic-on-inverse-positive',
        notice: 'bg-ws-semantic-inverse-notice text-ws-semantic-on-inverse-notice',
        info: 'bg-ws-semantic-inverse-info text-ws-semantic-on-inverse-info',
        neutral: 'bg-ws-semantic-inverse-neutral text-ws-semantic-on-inverse-neutral',
      },
      // Figma's Type=Icon variants drop all padding and pin width to the same
      // Size/N as the height, so the icon-only badge is an exact square.
      size: {
        sm: 'typography-caption-strong-md h-ws-11 min-w-ws-11 gap-ws-2 px-ws-4 has-[>svg:only-child]:w-ws-11 has-[>svg:only-child]:px-0',
        md: 'typography-label-strong-sm h-ws-12 min-w-ws-12 gap-ws-3 px-ws-5 has-[>svg:only-child]:w-ws-12 has-[>svg:only-child]:px-0',
        // Figma pins the label-bearing variants to Size/14 (32) and the icon-only
        // variant to Size/13 (28) — the icon-only case is the narrower exception.
        lg: 'typography-label-strong-sm h-ws-13 min-w-ws-14 gap-ws-3 px-ws-6 has-[>svg:only-child]:w-ws-13 has-[>svg:only-child]:min-w-ws-13 has-[>svg:only-child]:px-0',
      },
      shape: {
        square: '',
        rounded: 'rounded-ws-control-full',
      },
      emphasis: {
        low: '',
        high: '',
      },
    },
    defaultVariants: {
      color: 'neutral',
      shape: 'square',
      size: 'md',
      emphasis: 'low',
    },
    compoundVariants: [
      // Figma: Corner Radius/Control/sm at Small, Control/md at Medium and Large.
      {
        shape: 'square',
        size: 'sm',
        className: 'rounded-ws-control-sm',
      },
      {
        shape: 'square',
        size: ['md', 'lg'],
        className: 'rounded-ws-control-md',
      },
      {
        color: 'negative',
        emphasis: 'low',
        className: 'bg-ws-semantic-negative text-ws-semantic-on-subtle-negative',
      },
      {
        color: 'positive',
        emphasis: 'low',
        className: 'bg-ws-semantic-positive text-ws-semantic-on-subtle-positive',
      },
      {
        color: 'notice',
        emphasis: 'low',
        className: 'bg-ws-semantic-notice text-ws-semantic-on-subtle-notice',
      },
      {
        color: 'info',
        emphasis: 'low',
        className: 'bg-ws-semantic-info text-ws-semantic-on-subtle-info',
      },
      {
        color: 'neutral',
        emphasis: 'low',
        className: 'bg-ws-semantic-neutral text-ws-semantic-on-subtle-neutral',
      },
    ],
  },
);

// Figma insets the icon side by one step at md and lg (paddingLeft Gap/4 vs
// Gap/5 at md, Gap/5 vs Gap/6 at lg) — but only when a label sits beside it.
// The icon-only variant is sized by the root instead, so the inset is excluded
// there with not-last / not-first.
export const statusBadgeIconVariants = cva(``, {
  variants: {
    size: {
      sm: 'h-ws-7 w-ws-7',
      md: 'h-ws-8 w-ws-8 first:not-last:-ml-ws-2 last:not-first:-mr-ws-2',
      lg: 'h-ws-9 w-ws-9 first:not-last:-ml-ws-2 last:not-first:-mr-ws-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
