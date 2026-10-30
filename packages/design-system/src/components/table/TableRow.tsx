import { cn } from 'src/lib/utils';

import { TableContext, useTableContext } from './Table.context';
import type { TableRowProps } from './Table.types';

export const TableRow = ({ children, className, selected, ...props }: TableRowProps) => {
  const tableContext = useTableContext();
  const { selectionMode, interactive, striped } = tableContext;

  return (
    <TableContext.Provider value={{ ...tableContext, selected }}>
      <tr
        data-slot="table-row"
        {...props}
        {...(selectionMode && { 'aria-selected': selected })}
        className={cn(
          (interactive || selectionMode) && 'group/row cursor-pointer',
          striped &&
            'even:bg-ws-dynamic-tertiary-alpha-strong-default odd:bg-ws-dynamic-secondary-alpha-default',
          className,
        )}
      >
        {children}
      </tr>
    </TableContext.Provider>
  );
};

TableRow.displayName = 'Table.Row';
