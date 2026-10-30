'use client';

import { createContext, useContext } from 'react';

import type { TabsContextValue } from './Tabs.types';

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (context === undefined) {
    throw new Error('useTabsContext must be used within a <Tabs>');
  }

  return context;
};
