import { createContext, useContext } from 'react';

import type { ProgressTrackerContextValue } from './ProgressTracker.types';

export const ProgressTrackerContext = createContext<ProgressTrackerContextValue | undefined>(
  undefined,
);

export const useProgressTrackerContext = () => {
  const context = useContext(ProgressTrackerContext);

  if (!context) {
    throw new Error('useProgressTrackerContext must be used within a ProgressTracker');
  }

  return context;
};
