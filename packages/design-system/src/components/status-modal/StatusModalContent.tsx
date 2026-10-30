import * as ModalPrimitive from '@radix-ui/react-dialog';
import { RiCloseLine } from '@remixicon/react';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { IconButton } from '../button/IconButton';
import { StatusModalContext, useStatusModal } from './StatusModal.context';
import type { StatusModalContentProps } from './StatusModal.types';
import {
  statusModalContainerMotionVariants,
  statusModalContainerVariants,
} from './StatusModal.variants';
import { StatusModalOverlay } from './StatusModalOverlay';

const StatusModalContent = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Content>,
  StatusModalContentProps
>((props, ref) => {
  const hasAriaDescribedBy = Object.hasOwn(props, 'aria-describedby');

  const {
    className,
    children,
    'aria-describedby': ariaDescribedBy,
    showCloseButton,
    persistent = false,
    autoFocusOnOpen = true,
    closeAriaLabel = 'Close status modal',
    status,
    orientation,
    defaultMotion,
    ...restProps
  } = props;
  const motion = useDefaultMotion(defaultMotion);

  const {
    status: contextStatus,
    orientation: contextOrientation,
    showCloseButton: contextShowCloseButton,
  } = useStatusModal();
  const resolvedStatus = status ?? contextStatus;
  const resolvedOrientation = orientation ?? contextOrientation;
  const resolvedShowCloseButton = showCloseButton ?? contextShowCloseButton;

  const handleOpenAutoFocus = (event: Event) => {
    if (!autoFocusOnOpen) {
      event.preventDefault();
    }
  };

  const handleClose = (event: Event) => {
    if (persistent) {
      event.preventDefault();
    }
  };

  return (
    <ModalPrimitive.Portal>
      <StatusModalOverlay defaultMotion={motion} />
      <ModalPrimitive.Content
        ref={ref}
        data-slot="status-modal-content"
        {...(hasAriaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {})}
        className={cn(
          statusModalContainerVariants({
            status: resolvedStatus,
            orientation: resolvedOrientation,
          }),
          statusModalContainerMotionVariants({ enabled: motion }),
          className,
        )}
        onOpenAutoFocus={handleOpenAutoFocus}
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
        {...restProps}
      >
        <StatusModalContext.Provider
          value={{
            status: resolvedStatus,
            orientation: resolvedOrientation,
            showCloseButton: resolvedShowCloseButton,
          }}
        >
          {children}
        </StatusModalContext.Provider>

        {resolvedShowCloseButton && (
          <ModalPrimitive.Close className="top-ws-11 right-ws-11 absolute" asChild>
            <IconButton
              data-slot="status-modal-close"
              aria-label={closeAriaLabel}
              icon={RiCloseLine}
              preset="border"
              variant="secondary"
              size="sm"
              type="button"
              className="size-ws-forms-sm p-0"
              defaultMotion={motion}
            />
          </ModalPrimitive.Close>
        )}
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  );
});
StatusModalContent.displayName = 'StatusModal.Content';

export { StatusModalContent };
