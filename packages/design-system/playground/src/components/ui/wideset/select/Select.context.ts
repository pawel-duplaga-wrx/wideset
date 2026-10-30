'use client';

import { createContext, useContext } from 'react';

import type { SelectContextValue } from './Select.types';

export const SelectContext = createContext<SelectContextValue>({});

export const useSelectContext = () => useContext(SelectContext);
