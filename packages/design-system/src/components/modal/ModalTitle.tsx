import * as ModalPrimitive from '@radix-ui/react-dialog';
import { cn } from 'src/lib/utils';

const ModalTitle = ({ className, ...props }: ModalPrimitive.DialogTitleProps) => (
  <ModalPrimitive.Title
    data-slot="modal-title"
    className={cn('text-ws-static-strong typography-subtitle-sm pt-ws-2 last:pb-ws-2', className)}
    {...props}
  />
);
ModalTitle.displayName = 'Modal.Title';

export { ModalTitle };
