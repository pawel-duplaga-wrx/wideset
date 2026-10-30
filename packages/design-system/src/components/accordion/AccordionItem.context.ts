import { createContext, useContext } from 'react';

interface AccordionItemContextType {
  disabled?: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error('useAccordionItemContext must be used within a <Accordion.Item>');
  }
  return context;
};
