import { cn } from 'src/lib/utils';

import { useTableContext } from './Table.context';
import type { TableHeadProps } from './Table.types';

export const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  const { stickyHeader, hasBackground } = useTableContext();

  return (
    <thead
      data-slot="table-head"
      {...props}
      className={cn(
        stickyHeader && cn('z-ws-sticky sticky top-0', hasBackground && 'bg-ws-static-container'),
        className,
      )}
    >
      {children}
    </thead>
  );
};

TableHead.displayName = 'Table.Head';
