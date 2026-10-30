import * as React from 'react';
import { useContext } from 'react';

import type { StatusModalOrientation, StatusModalStatus } from './StatusModal.types';

export type StatusModalContextValue = {
  status: StatusModalStatus;
  orientation: StatusModalOrientation;
  showCloseButton: boolean;
};

export const useStatusModal = () => {
  const context = useContext(StatusModalContext);
  if (!context) {
    throw new Error('useStatusModal must be used within a StatusModalProvider');
  }
  return context;
};

const StatusModalContext = React.createContext<StatusModalContextValue>({
  status: 'neutral',
  orientation: 'horizontal',
  showCloseButton: true,
});

export { StatusModalContext };
