import { cn } from 'src/lib/utils';

import type { ToastDescriptionProps } from './Toast.types';

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => (
  <span
    data-slot="toast-description"
    className={cn('text-ws-static-subtle', className)}
    {...props}
  />
);

ToastDescription.displayName = 'Toast.Description';

export { ToastDescription };
export type { ToastDescriptionProps };
