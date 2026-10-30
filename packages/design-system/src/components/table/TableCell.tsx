import { cn } from 'src/lib/utils';

import { useTableContext } from './Table.context';
import type { TableCellProps } from './Table.types';
import { getTruncatedTitle } from './Table.utils';
import { cellVariants } from './Table.variants';

export const TableCell = ({
  children,
  className,
  align,
  flushMargin,
  placement,
  truncate,
  ...props
}: TableCellProps) => {
  const {
    align: contextAlign,
    flushMargin: contextFlushMargin,
    placement: contextPlacement,
    truncate: contextTruncate,
    stickyColumn,
    separated,
    size,
    selected,
    interactive,
    hasBackground,
  } = useTableContext();

  const shouldTruncate = truncate ?? contextTruncate;

  return (
    <td
      data-slot="table-cell"
      title={getTruncatedTitle(children, shouldTruncate)}
      {...props}
      className={cn(
        cellVariants({
          align: align ?? contextAlign,
          flushMargin: flushMargin ?? contextFlushMargin,
          placement: placement ?? contextPlacement,
          truncate: shouldTruncate,
          stickyColumn,
          separated,
          size,
          interactive,
          selected,
          hasBackground,
        }),
        className,
      )}
    >
      {children}
    </td>
  );
};

TableCell.displayName = 'Table.Cell';
