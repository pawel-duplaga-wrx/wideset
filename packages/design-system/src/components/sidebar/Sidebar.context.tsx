import * as React from 'react';

import type { SidebarContextValue } from './Sidebar.types';

export const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a <Sidebar>');
  }

  return context;
};
