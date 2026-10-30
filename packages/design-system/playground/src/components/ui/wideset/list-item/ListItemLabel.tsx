'use client';

import { cn } from '@/lib/wideset/utils';

import type { ListItemLabelProps } from './ListItem.types';

export const ListItemLabel = ({ children, className, ...props }: ListItemLabelProps) => (
  <div
    data-slot="list-item-label"
    className={cn('typography-label-sm min-w-0 flex-1 truncate', className)}
    {...props}
  >
    {children}
  </div>
);

ListItemLabel.displayName = 'ListItem.Label';
