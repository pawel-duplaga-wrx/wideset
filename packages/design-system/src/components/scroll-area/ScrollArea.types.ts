import type * as RadixScrollArea from '@radix-ui/react-scroll-area';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ScrollAreaProps = Omit<
  ComponentPropsWithoutRef<typeof RadixScrollArea.Root>,
  'children'
> & {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  indicatorHidden?: boolean;
};
