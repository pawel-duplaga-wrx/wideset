'use client';

import type { VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

import type { listItemVariants } from './ListItem.variants';

export type ListItemContextValue = {
  variant: VariantProps<typeof listItemVariants>['variant'];
  disabled?: boolean;
};

export const ListItemContext = createContext<ListItemContextValue | undefined>(undefined);

export const useListItemContext = () => {
  const context = useContext(ListItemContext);

  if (context === undefined) {
    throw new Error('useListItemContext must be used within a ListItem');
  }

  return context;
};
