import { createContext, useContext } from 'react';

import type { ButtonContextValue } from './Button.types';

export const ButtonContext = createContext<ButtonContextValue | undefined>(undefined);

export const useButtonContext = () => {
  const context = useContext(ButtonContext);

  if (context === undefined) {
    throw new Error('useButtonContext must be used within a Button');
  }

  return context;
};
