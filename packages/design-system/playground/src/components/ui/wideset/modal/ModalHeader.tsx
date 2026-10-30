'use client';

import { cn } from '@/lib/wideset/utils';

import { useModal } from './Modal.context';
import type { ModalHeaderProps } from './Modal.types';
import { modalCloseGutter } from './Modal.variants';

const ModalHeader = ({ className, children, ...props }: ModalHeaderProps) => {
  const { showCloseButton } = useModal();

  return (
    <div
      data-slot="modal-header"
      className={cn(
        'border-ws-static-base px-ws-11 pt-ws-9 pb-ws-8 flex flex-col border-b',
        // Our header wraps a Modal.Description, so unlike a single-line title
        // it collides with the close button unless the space is reserved.
        showCloseButton && modalCloseGutter,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
ModalHeader.displayName = 'Modal.Header';

export { ModalHeader };
