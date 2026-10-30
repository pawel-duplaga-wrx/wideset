import { cn } from 'src/lib/utils';

import { Button } from '../button/Button';
import { useToastState } from './Toast.context';
import type { ToastActionProps } from './Toast.types';
import { toastActionVariants } from './Toast.variants';

const ToastAction = ({
  preset = 'border',
  variant = 'inverse',
  size = 'sm',
  children,
  className,
  ...props
}: ToastActionProps) => {
  const toastState = useToastState();

  return (
    <Button
      data-slot="toast-action"
      preset={preset}
      variant={variant}
      size={size}
      className={cn(
        toastActionVariants({ status: toastState.status, variant: toastState.variant }),
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

ToastAction.displayName = 'Toast.Action';

export { ToastAction };
