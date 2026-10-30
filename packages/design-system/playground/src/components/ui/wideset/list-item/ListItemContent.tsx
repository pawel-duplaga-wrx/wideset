'use client';

import { cn } from '@/lib/wideset/utils';

import type { ListItemContentProps } from './ListItem.types';

export const ListItemContent = ({ children, className, ...props }: ListItemContentProps) => (
  <div
    data-slot="list-item-content"
    className={cn('mr-auto flex flex-col truncate', className)}
    {...props}
  >
    {children}
  </div>
);

ListItemContent.displayName = 'ListItem.Content';
