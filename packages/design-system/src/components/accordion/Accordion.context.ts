import { createContext, useContext } from 'react';

import type { AccordionContextType } from './Accordion.types';

export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error('useAccordionContext must be used within a <Accordion>');
  }
  return context;
};
