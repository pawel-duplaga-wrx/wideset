import { createContext, useContext } from 'react';

import type { SegmentedControlContextValue } from './SegmentedControl.types';

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export const useSegmentedControlContext = () => {
  const context = useContext(SegmentedControlContext);

  if (!context) {
    throw new Error('useSegmentedControlContext must be used within a <SegmentedControl>');
  }

  return context;
};
