import type { TableFootProps } from './Table.types';

export const TableFoot = ({ children, className, ...props }: TableFootProps) => {
  return (
    <tfoot data-slot="table-foot" {...props} className={className}>
      {children}
    </tfoot>
  );
};

TableFoot.displayName = 'Table.Foot';
