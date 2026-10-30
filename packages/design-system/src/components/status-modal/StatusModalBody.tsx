import * as ModalPrimitive from '@radix-ui/react-dialog';
import { cn } from 'src/lib/utils';

import { useStatusModal } from './StatusModal.context';
import type { StatusModalBodyProps } from './StatusModal.types';
import { statusModalCloseGutter } from './StatusModal.variants';

const StatusModalBody = ({ orientation, className, ...props }: StatusModalBodyProps) => {
  const { status, orientation: contextOrientation, showCloseButton } = useStatusModal();
  const resolvedOrientation = orientation ?? contextOrientation;
  // Mirrors StatusModal.Title: with no badge row above it, the horizontal
  // layout puts the description alongside the close button.
  const sharesRowWithClose =
    resolvedOrientation === 'horizontal' && status === 'neutral' && showCloseButton;

  return (
    <ModalPrimitive.Description asChild>
      <div
        data-slot="status-modal-body"
        className={cn(
          'typography-body-md text-ws-static-base mt-ws-5',
          resolvedOrientation === 'horizontal' ? 'px-ws-11' : 'px-ws-22',
          sharesRowWithClose && statusModalCloseGutter,
          className,
        )}
        {...props}
      />
    </ModalPrimitive.Description>
  );
};
StatusModalBody.displayName = 'StatusModal.Body';

export { StatusModalBody };
