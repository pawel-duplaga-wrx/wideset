'use client';

import { cn } from '@/lib/wideset/utils';

import type { ListItemPrefixProps } from './ListItem.types';

export const ListItemPrefix = ({ children, className, ...props }: ListItemPrefixProps) => (
  <div
    data-slot="list-item-prefix"
    className={cn('gap-ws-5 flex shrink-0 items-center', className)}
    {...props}
  >
    {children}
  </div>
);

ListItemPrefix.displayName = 'ListItem.Prefix';
