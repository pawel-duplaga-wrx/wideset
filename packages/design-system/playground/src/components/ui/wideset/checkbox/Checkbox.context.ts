'use client';

import { createContext, useContext } from 'react';

import type { CheckboxContextType } from './Checkbox.types';

export const CheckboxContext = createContext<CheckboxContextType | null>(null);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);

  if (context === null) {
    throw new Error('useCheckboxContext must be used within a Checkbox');
  }

  return context;
};
