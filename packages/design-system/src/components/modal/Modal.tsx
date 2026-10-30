import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import type { ModalProps, ModalTriggerProps } from './Modal.types';
import { ModalBody } from './ModalBody';
import { ModalClose } from './ModalClose';
import { ModalContent } from './ModalContent';
import { ModalDescription } from './ModalDescription';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalOverlay } from './ModalOverlay';
import { ModalTitle } from './ModalTitle';

// Build the compound as its OWN component object — do NOT alias and mutate
// ModalPrimitive.Root directly. @radix-ui/react-dialog's Root is a shared
// singleton also used by Sidepanel (and StatusModal), so attaching sub-components
// to it would make Modal and Sidepanel the same object, with the last writer
// winning on every shared name (Content, Header, …). Wrapping Root in a fresh
// component keeps each namespace isolated.
const Modal = ((props: ModalProps) => (
  <ModalPrimitive.Root {...props} />
)) as React.FC<ModalProps> & {
  Body: typeof ModalBody;
  Close: typeof ModalClose;
  Content: typeof ModalContent;
  Description: typeof ModalDescription;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
  Overlay: typeof ModalOverlay;
  Title: typeof ModalTitle;
  Trigger: typeof ModalTrigger;
};

Modal.displayName = 'Modal';
Modal.Body = ModalBody;
Modal.Close = ModalClose;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Overlay = ModalOverlay;
Modal.Title = ModalTitle;
export const ModalTrigger = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Trigger>,
  ModalTriggerProps
>((props, ref) => <ModalPrimitive.Trigger ref={ref} data-slot="modal-trigger" {...props} />);
ModalTrigger.displayName = 'Modal.Trigger';
Modal.Trigger = ModalTrigger;

export { Modal };
