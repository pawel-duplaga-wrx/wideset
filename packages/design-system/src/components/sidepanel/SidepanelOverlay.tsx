import * as SidepanelPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { SidepanelOverlayProps } from './Sidepanel.types';
import { sidepanelOverlayClassName, sidepanelOverlayMotionVariants } from './Sidepanel.variants';

const SidepanelOverlay = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Overlay>,
  SidepanelOverlayProps
>(({ className, defaultMotion, ...props }, ref) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <SidepanelPrimitive.Overlay
      data-slot="sidepanel-overlay"
      className={cn(
        sidepanelOverlayClassName,
        sidepanelOverlayMotionVariants({ enabled: motion }),
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

SidepanelOverlay.displayName = 'Sidepanel.Overlay';

export { SidepanelOverlay };
