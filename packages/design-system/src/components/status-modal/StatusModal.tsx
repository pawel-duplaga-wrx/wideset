import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { StatusModalContext } from './StatusModal.context';
import type {
  StatusModalCloseProps,
  StatusModalProps,
  StatusModalTriggerProps,
} from './StatusModal.types';
import { StatusModalBody } from './StatusModalBody';
import { StatusModalContent } from './StatusModalContent';
import { StatusModalFooter } from './StatusModalFooter';
import { StatusModalOverlay } from './StatusModalOverlay';
import { StatusModalTitle } from './StatusModalTitle';

const StatusModal = (({
  status = 'neutral',
  orientation = 'horizontal',
  showCloseButton = true,
  children,
  ...props
}: StatusModalProps) => (
  <StatusModalContext.Provider value={{ status, orientation, showCloseButton }}>
    <ModalPrimitive.Root {...props}>{children}</ModalPrimitive.Root>
  </StatusModalContext.Provider>
)) as React.FC<StatusModalProps> & {
  Body: typeof StatusModalBody;
  Close: typeof StatusModalClose;
  Content: typeof StatusModalContent;
  Footer: typeof StatusModalFooter;
  Overlay: typeof StatusModalOverlay;
  Title: typeof StatusModalTitle;
  Trigger: typeof StatusModalTrigger;
};

StatusModal.displayName = 'StatusModal';
StatusModal.Body = StatusModalBody;
export const StatusModalClose = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Close>,
  StatusModalCloseProps
>((props, ref) => <ModalPrimitive.Close ref={ref} data-slot="status-modal-close" {...props} />);
StatusModalClose.displayName = 'StatusModal.Close';
StatusModal.Close = StatusModalClose;
StatusModal.Content = StatusModalContent;
StatusModal.Footer = StatusModalFooter;
StatusModal.Overlay = StatusModalOverlay;
StatusModal.Title = StatusModalTitle;
export const StatusModalTrigger = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Trigger>,
  StatusModalTriggerProps
>((props, ref) => <ModalPrimitive.Trigger ref={ref} data-slot="status-modal-trigger" {...props} />);
StatusModalTrigger.displayName = 'StatusModal.Trigger';
StatusModal.Trigger = StatusModalTrigger;

export { StatusModal };
