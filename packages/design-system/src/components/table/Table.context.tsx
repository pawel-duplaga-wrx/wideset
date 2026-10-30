import { createContext, useContext } from 'react';

import type { TableContextType } from './Table.types';

export const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (context === undefined) {
    throw new Error('useTableContext must be used within a Table');
  }

  return context;
};
