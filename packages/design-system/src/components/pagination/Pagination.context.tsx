import { createContext, useContext } from 'react';

import type { PaginationContextValue } from './Pagination.types';

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (context === undefined) {
    throw new Error('usePaginationContext must be used within a <Pagination>');
  }

  return context;
};

export { PaginationContext, usePaginationContext };
