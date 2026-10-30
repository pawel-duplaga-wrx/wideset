import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { StatusModalOverlayProps } from './StatusModal.types';
import {
  statusModalOverlayClassName,
  statusModalOverlayMotionVariants,
} from './StatusModal.variants';

const StatusModalOverlay = React.forwardRef<
  React.ComponentRef<typeof ModalPrimitive.Overlay>,
  StatusModalOverlayProps
>(({ className, defaultMotion, ...props }, ref) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <ModalPrimitive.Overlay
      data-slot="status-modal-overlay"
      className={cn(
        statusModalOverlayClassName,
        statusModalOverlayMotionVariants({ enabled: motion }),
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
StatusModalOverlay.displayName = 'StatusModal.Overlay';

export { StatusModalOverlay };
