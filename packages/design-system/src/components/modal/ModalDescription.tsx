import * as ModalPrimitive from '@radix-ui/react-dialog';
import { cn } from 'src/lib/utils';

const ModalDescription = ({ className, ...props }: ModalPrimitive.DialogDescriptionProps) => (
  <ModalPrimitive.Description
    data-slot="modal-description"
    className={cn('text-ws-static-subtle typography-body-md mt-ws-5 pb-ws-2', className)}
    {...props}
  />
);
ModalDescription.displayName = 'Modal.Description';

export { ModalDescription };
