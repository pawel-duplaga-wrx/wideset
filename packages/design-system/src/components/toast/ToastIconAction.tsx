import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import { IconButton } from '../button/IconButton';
import { useToastState } from './Toast.context';
import type { ToastIconActionProps } from './Toast.types';
import { toastDismissVariants } from './Toast.variants';

/**
 * Icon-only control for the toast's top-right actions cluster (Figma's
 * "Actions" frame — e.g. a "more options" trigger rendered before the dismiss
 * X). Styled identically to the dismiss button; forwards its ref and props so
 * it can host `DropdownMenu.Trigger asChild`.
 */
const ToastIconAction = forwardRef<HTMLButtonElement, ToastIconActionProps>(
  ({ className, ...props }, ref) => {
    const { status, variant } = useToastState();

    return (
      <IconButton
        ref={ref}
        data-slot="toast-icon-action"
        preset="ghost"
        variant={variant === 'expanded' ? 'secondary' : 'inverse'}
        size="sm"
        className={cn(toastDismissVariants({ status, variant }), className)}
        {...props}
      />
    );
  },
);

ToastIconAction.displayName = 'Toast.IconAction';

export { ToastIconAction };
