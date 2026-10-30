import { createContext, useContext } from 'react';

import type { StatusBadgeContextType } from './StatusBadge.types';

export const StatusBadgeContext = createContext<StatusBadgeContextType | undefined>(undefined);

export const useStatusBadgeContext = () => {
  const context = useContext(StatusBadgeContext);
  if (context === undefined) {
    throw new Error('useStatusBadgeContext must be used within a <StatusBadge>');
  }
  return context;
};
