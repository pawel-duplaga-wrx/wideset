'use client';

import { cn } from '@/lib/wideset/utils';

import type { ModalFooterProps } from './Modal.types';

const ModalFooter = ({ className, variant = 'default', ...props }: ModalFooterProps) => (
  <div
    data-slot="modal-footer"
    className={cn(
      'gap-ws-5 flex',
      variant === 'default'
        ? 'border-ws-static-base px-ws-11 py-ws-9 justify-end border-t'
        : 'bg-ws-static-alpha-subtle px-ws-12 py-ws-9 justify-between',
      className,
    )}
    {...props}
  />
);
ModalFooter.displayName = 'Modal.Footer';

export { ModalFooter };
