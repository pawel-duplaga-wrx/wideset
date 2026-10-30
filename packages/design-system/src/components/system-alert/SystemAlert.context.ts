import { createContext, useContext } from 'react';

import type { SystemAlertContextValue } from './SystemAlert.types';

export const SystemAlertContext = createContext<SystemAlertContextValue | undefined>(undefined);

export const useSystemAlertContext = () => {
  const context = useContext(SystemAlertContext);

  if (context === undefined) {
    throw new Error('useSystemAlertContext must be used within a SystemAlert');
  }

  return context;
};
