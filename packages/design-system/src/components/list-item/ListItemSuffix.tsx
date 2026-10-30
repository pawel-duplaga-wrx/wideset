import { cn } from 'src/lib/utils';

import type { ListItemSuffixProps } from './ListItem.types';

export const ListItemSuffix = ({ children, className, ...props }: ListItemSuffixProps) => (
  <div
    data-slot="list-item-suffix"
    className={cn('gap-ws-5 flex shrink-0 items-center', className)}
    {...props}
  >
    {children}
  </div>
);

ListItemSuffix.displayName = 'ListItem.Suffix';
