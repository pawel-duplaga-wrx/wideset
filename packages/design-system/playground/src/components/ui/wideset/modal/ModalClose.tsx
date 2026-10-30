'use client';

import * as ModalPrimitive from '@radix-ui/react-dialog';
import { RiCloseLine } from '@remixicon/react';
import { cn } from '@/lib/wideset/utils';

import { IconButton } from '../button/IconButton';
import { useModal } from './Modal.context';
import type { ModalCloseProps } from './Modal.types';

// One name, two jobs: `asChild` keeps the plain Radix pass-through used by
// footer actions, while the bare form renders the styled X from Figma. The
// styled branch sets no position, so it also drops into a header action row.
const ModalClose = ({ asChild, className, children, ...props }: ModalCloseProps) => {
  const { motion } = useModal();

  return asChild ? (
    <ModalPrimitive.Close asChild data-slot="modal-close" className={className} {...props}>
      {children}
    </ModalPrimitive.Close>
  ) : (
    <ModalPrimitive.Close asChild>
      <IconButton
        icon={RiCloseLine}
        preset="border"
        variant="secondary"
        size="sm"
        type="button"
        aria-label="Close modal"
        className={cn('size-ws-forms-sm shrink-0 p-0', className)}
        defaultMotion={motion}
        data-slot="modal-close"
        {...props}
      />
    </ModalPrimitive.Close>
  );
};
ModalClose.displayName = 'Modal.Close';

export { ModalClose };
