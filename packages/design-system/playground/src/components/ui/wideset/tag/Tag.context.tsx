'use client';

import { createContext, useContext } from 'react';

import type { TagContextValue } from './Tag.types';

export const TagContext = createContext<TagContextValue | undefined>(undefined);

export const useTagContext = () => {
  const context = useContext(TagContext);

  if (context === undefined) {
    throw new Error('useTagContext must be used within a Tag');
  }

  return context;
};
