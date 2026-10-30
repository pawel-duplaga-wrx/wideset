import { createContext, useContext } from 'react';

import type { SwitchContextType } from './Switch.types';

export const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

export const useSwitchContext = () => {
  const context = useContext(SwitchContext);

  if (context === undefined) {
    throw new Error('useSwitchContext must be used within a <Switch>');
  }

  return context;
};
