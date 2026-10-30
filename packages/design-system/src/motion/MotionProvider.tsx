import { createContext, useContext } from 'react';

import type { MotionProviderProps } from './Motion.types';

const MotionContext = createContext(true);

export const MotionProvider = ({ enabled = true, children }: MotionProviderProps) => (
  <MotionContext.Provider value={enabled}>{children}</MotionContext.Provider>
);

export const useDefaultMotion = (localValue?: boolean): boolean => {
  const inheritedValue = useContext(MotionContext);
  return localValue ?? inheritedValue;
};
