import { cva } from 'class-variance-authority';

import { sidebarCollapseMotion } from '../../motion/recipes';

export const sidebarVariants = cva(
  'bg-ws-static-foreground border-ws-static-subtle gap-ws-7 px-ws-5 py-ws-7 relative flex h-full flex-col overflow-hidden border-r',
  {
    variants: {
      collapsed: {
        true: 'w-[3.25rem] items-center',
        false: 'w-[16.25rem]',
      },
    },
    defaultVariants: { collapsed: false },
  },
);

export const sidebarMotionVariants = cva('', {
  variants: {
    enabled: { true: sidebarCollapseMotion, false: '' },
  },
  defaultVariants: { enabled: true },
});
