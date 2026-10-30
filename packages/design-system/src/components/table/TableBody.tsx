import { cn } from 'src/lib/utils';

import type { TableBodyProps } from './Table.types';

export const TableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <tbody data-slot="table-body" {...props} className={cn(className)}>
      {children}
    </tbody>
  );
};

TableBody.displayName = 'Table.Body';
