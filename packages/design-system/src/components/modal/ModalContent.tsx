import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { ModalContext } from './Modal.context';
import type { ModalContentProps } from './Modal.types';
import { modalContainerMotionVariants, modalContainerVariants } from './Modal.variants';
import { ModalClose } from './ModalClose';
import { ModalOverlay } from './ModalOverlay';

const ModalContent = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Content>,
  ModalContentProps
>((props, ref) => {
  const hasAriaDescribedBy = Object.hasOwn(props, 'aria-describedby');

  const {
    className,
    children,
    'aria-describedby': ariaDescribedBy,
    showCloseButton = true,
    closeAriaLabel = 'Close modal',
    persistent = false,
    autoFocusOnOpen = true,
    defaultMotion,
    onOpenAutoFocus,
    onPointerDownOutside,
    onEscapeKeyDown,
    ...restProps
  } = props;
  const motion = useDefaultMotion(defaultMotion);

  return (
    <ModalPrimitive.Portal>
      <ModalOverlay defaultMotion={motion} />
      <ModalPrimitive.Content
        ref={ref}
        data-slot="modal-content"
        {...(hasAriaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {})}
        className={cn(
          modalContainerVariants(),
          modalContainerMotionVariants({ enabled: motion }),
          className,
        )}
        onOpenAutoFocus={(event) => {
          if (!autoFocusOnOpen) event.preventDefault();
          onOpenAutoFocus?.(event);
        }}
        onPointerDownOutside={(event) => {
          if (persistent) event.preventDefault();
          onPointerDownOutside?.(event);
        }}
        onEscapeKeyDown={(event) => {
          if (persistent) event.preventDefault();
          onEscapeKeyDown?.(event);
        }}
        {...restProps}
      >
        <ModalContext.Provider value={{ showCloseButton, motion }}>
          {children}
          {/* After {children} so tab order stays right. The container is fixed,
              so this needs no `relative` anywhere. */}
          {showCloseButton && (
            <ModalClose aria-label={closeAriaLabel} className="top-ws-9 right-ws-11 absolute" />
          )}
        </ModalContext.Provider>
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  );
});
ModalContent.displayName = 'Modal.Content';

export { ModalContent };
