import { cva } from 'class-variance-authority';

export const tagVariants = cva('inline-flex w-fit items-center', {
  variants: {
    size: {
      sm: 'typography-caption-strong-md h-ws-11 gap-ws-2',
      md: 'typography-label-strong-sm h-ws-12 gap-ws-3',
      lg: 'typography-label-strong-sm h-ws-13 gap-ws-3',
    },
    color: {
      brand: 'text-ws-non-semantic-brand-on-subtle',
      red: 'text-ws-non-semantic-red-on-subtle',
      pink: 'text-ws-non-semantic-pink-on-subtle',
      violet: 'text-ws-non-semantic-violet-on-subtle',
      purple: 'text-ws-non-semantic-purple-on-subtle',
      indigo: 'text-ws-non-semantic-indigo-on-subtle',
      blue: 'text-ws-non-semantic-blue-on-subtle',
      cyan: 'text-ws-non-semantic-cyan-on-subtle',
      teal: 'text-ws-non-semantic-teal-on-subtle',
      green: 'text-ws-non-semantic-green-on-subtle',
      lime: 'text-ws-non-semantic-lime-on-subtle',
      yellow: 'text-ws-non-semantic-yellow-on-subtle',
      orange: 'text-ws-non-semantic-orange-on-subtle',
      secondary: 'text-ws-dynamic-secondary-default',
    },
    // Figma's Filled variant carries no stroke at all (strokes: []), so the
    // border belongs to the Border preset rather than the base.
    preset: {
      filled: '',
      border: 'bg-ws-static-highlight-subtle border',
    },
    shape: {
      square: '',
      rounded: 'rounded-ws-control-full',
    },
    truncate: {
      true: 'max-w-full min-w-0',
      false: 'whitespace-nowrap',
    },
    iconOnly: {
      true: 'justify-center',
      false: '',
    },
  },
  compoundVariants: [
    {
      iconOnly: false,
      size: 'sm',
      className: 'px-ws-4',
    },
    // At md and lg Figma insets the icon side by one step (paddingLeft Gap/4 vs
    // Gap/5 at md, Gap/5 vs Gap/6 at lg) when an icon leads. Small is symmetric.
    // The second selector covers truncate={true}, where Tag wraps all children
    // — the icon included — in a single span, so the icon is no longer a direct
    // child of the root.
    {
      iconOnly: false,
      size: 'md',
      className:
        'px-ws-5 [&>[data-slot=tag-icon]:first-child]:-ml-ws-2 [&>span>[data-slot=tag-icon]:first-child]:-ml-ws-2',
    },
    {
      iconOnly: false,
      size: 'lg',
      className:
        'px-ws-6 [&>[data-slot=tag-icon]:first-child]:-ml-ws-2 [&>span>[data-slot=tag-icon]:first-child]:-ml-ws-2',
    },
    {
      iconOnly: true,
      size: 'sm',
      className: 'w-ws-11 px-0',
    },
    {
      iconOnly: true,
      size: 'md',
      className: 'w-ws-12 px-0',
    },
    {
      iconOnly: true,
      size: 'lg',
      className: 'w-ws-13 px-0',
    },
    {
      size: ['lg', 'md'],
      shape: 'square',
      className: 'rounded-ws-control-md',
    },
    {
      size: 'sm',
      shape: 'square',
      className: 'rounded-ws-control-sm',
    },
    {
      color: 'brand',
      preset: 'filled',
      className: 'bg-ws-non-semantic-brand-subtle',
    },
    {
      color: 'red',
      preset: 'filled',
      className: 'bg-ws-non-semantic-red-subtle',
    },
    {
      color: 'pink',
      preset: 'filled',
      className: 'bg-ws-non-semantic-pink-subtle',
    },
    {
      color: 'violet',
      preset: 'filled',
      className: 'bg-ws-non-semantic-violet-subtle',
    },
    {
      color: 'purple',
      preset: 'filled',
      className: 'bg-ws-non-semantic-purple-subtle',
    },
    {
      color: 'indigo',
      preset: 'filled',
      className: 'bg-ws-non-semantic-indigo-subtle',
    },
    {
      color: 'blue',
      preset: 'filled',
      className: 'bg-ws-non-semantic-blue-subtle',
    },
    {
      color: 'cyan',
      preset: 'filled',
      className: 'bg-ws-non-semantic-cyan-subtle',
    },
    {
      color: 'teal',
      preset: 'filled',
      className: 'bg-ws-non-semantic-teal-subtle',
    },
    {
      color: 'green',
      preset: 'filled',
      className: 'bg-ws-non-semantic-green-subtle',
    },
    {
      color: 'lime',
      preset: 'filled',
      className: 'bg-ws-non-semantic-lime-subtle',
    },
    {
      color: 'yellow',
      preset: 'filled',
      className: 'bg-ws-non-semantic-yellow-subtle',
    },
    {
      color: 'orange',
      preset: 'filled',
      className: 'bg-ws-non-semantic-orange-subtle',
    },
    {
      color: 'secondary',
      preset: 'filled',
      className: 'bg-ws-dynamic-secondary-alpha-strong-default',
    },
    {
      color: 'brand',
      preset: 'border',
      className: 'border-ws-non-semantic-brand-default',
    },
    {
      color: 'red',
      preset: 'border',
      className: 'border-ws-non-semantic-red-default',
    },
    {
      color: 'pink',
      preset: 'border',
      className: 'border-ws-non-semantic-pink-default',
    },
    {
      color: 'violet',
      preset: 'border',
      className: 'border-ws-non-semantic-violet-default',
    },
    {
      color: 'purple',
      preset: 'border',
      className: 'border-ws-non-semantic-purple-default',
    },
    {
      color: 'indigo',
      preset: 'border',
      className: 'border-ws-non-semantic-indigo-default',
    },
    {
      color: 'blue',
      preset: 'border',
      className: 'border-ws-non-semantic-blue-default',
    },
    {
      color: 'cyan',
      preset: 'border',
      className: 'border-ws-non-semantic-cyan-default',
    },
    {
      color: 'teal',
      preset: 'border',
      className: 'border-ws-non-semantic-teal-default',
    },
    {
      color: 'green',
      preset: 'border',
      className: 'border-ws-non-semantic-green-default',
    },
    {
      color: 'lime',
      preset: 'border',
      className: 'border-ws-non-semantic-lime-default',
    },
    {
      color: 'yellow',
      preset: 'border',
      className: 'border-ws-non-semantic-yellow-default',
    },
    {
      color: 'orange',
      preset: 'border',
      className: 'border-ws-non-semantic-orange-default',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'brand',
    preset: 'filled',
    shape: 'square',
    truncate: false,
    iconOnly: false,
  },
});

export const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'h-ws-7 w-ws-7',
      md: 'h-ws-8 w-ws-8',
      lg: 'h-ws-9 w-ws-9',
    },
    color: {
      brand: 'text-ws-non-semantic-brand-on-subtle',
      red: 'text-ws-non-semantic-red-on-subtle',
      pink: 'text-ws-non-semantic-pink-on-subtle',
      violet: 'text-ws-non-semantic-violet-on-subtle',
      purple: 'text-ws-non-semantic-purple-on-subtle',
      indigo: 'text-ws-non-semantic-indigo-on-subtle',
      blue: 'text-ws-non-semantic-blue-on-subtle',
      cyan: 'text-ws-non-semantic-cyan-on-subtle',
      teal: 'text-ws-non-semantic-teal-on-subtle',
      green: 'text-ws-non-semantic-green-on-subtle',
      lime: 'text-ws-non-semantic-lime-on-subtle',
      yellow: 'text-ws-non-semantic-yellow-on-subtle',
      orange: 'text-ws-non-semantic-orange-on-subtle',
      secondary: 'text-ws-dynamic-secondary-default',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'brand',
  },
});

export const iconButtonVariants = cva('rounded-full p-0', {
  variants: {
    size: {
      sm: 'size-ws-9',
      md: 'size-ws-10',
      lg: 'size-ws-12',
    },
  },
});

export const iconButtonIconVariants = cva('w-auto p-0', {
  variants: {
    size: {
      sm: 'size-ws-6',
      md: 'size-ws-7',
      lg: 'size-ws-9',
    },
    color: {
      brand: 'text-ws-non-semantic-brand-on-subtle',
      red: 'text-ws-non-semantic-red-on-subtle',
      pink: 'text-ws-non-semantic-pink-on-subtle',
      violet: 'text-ws-non-semantic-violet-on-subtle',
      purple: 'text-ws-non-semantic-purple-on-subtle',
      indigo: 'text-ws-non-semantic-indigo-on-subtle',
      blue: 'text-ws-non-semantic-blue-on-subtle',
      cyan: 'text-ws-non-semantic-cyan-on-subtle',
      teal: 'text-ws-non-semantic-teal-on-subtle',
      green: 'text-ws-non-semantic-green-on-subtle',
      lime: 'text-ws-non-semantic-lime-on-subtle',
      yellow: 'text-ws-non-semantic-yellow-on-subtle',
      orange: 'text-ws-non-semantic-orange-on-subtle',
      secondary: 'text-ws-dynamic-secondary-default',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'brand',
  },
});
