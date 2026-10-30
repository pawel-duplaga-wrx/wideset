import { createContext, useContext } from 'react';

import type { TextInputContextValue } from './TextInput.types';

export const TextInputContext = createContext<TextInputContextValue | undefined>(undefined);

export const useTextInputContext = () => {
  const context = useContext(TextInputContext);

  if (context === undefined) {
    throw new Error('useTextInputContext must be used within a <TextInput>');
  }

  return context;
};
