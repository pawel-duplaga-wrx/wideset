import { createContext, useContext } from 'react';

import type { CardContextType } from './Card.types';

export const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (context === undefined) {
    throw new Error('useCardContext must be used within a Card');
  }
  return context;
};
