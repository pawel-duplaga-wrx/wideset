import { createContext, useContext } from 'react';

import type { RadioButtonContextType } from './RadioButton.types';

export const RadioButtonContext = createContext<RadioButtonContextType | undefined>(undefined);

export const useRadioButtonContext = () => {
  const context = useContext(RadioButtonContext);

  if (context === undefined) {
    throw new Error('useRadioButtonContext must be used within a RadioButton');
  }

  return context;
};
