'use client';

import * as ModalPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/wideset/utils';

import { useDefaultMotion } from '@/lib/wideset/motion/MotionProvider';
import type { ModalOverlayProps } from './Modal.types';
import { modalOverlayClassName, modalOverlayMotionVariants } from './Modal.variants';

const ModalOverlay = ({ className, defaultMotion, ...props }: ModalOverlayProps) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <ModalPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        modalOverlayClassName,
        modalOverlayMotionVariants({ enabled: motion }),
        className,
      )}
      {...props}
    />
  );
};
ModalOverlay.displayName = 'Modal.Overlay';

export { ModalOverlay };
