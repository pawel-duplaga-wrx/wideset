'use client';

import * as React from 'react';
import { useContext } from 'react';

export type ModalContextValue = {
  showCloseButton: boolean;
  motion?: boolean;
};

const ModalContext = React.createContext<ModalContextValue>({ showCloseButton: true });

export const useModal = () => useContext(ModalContext);

export { ModalContext };
