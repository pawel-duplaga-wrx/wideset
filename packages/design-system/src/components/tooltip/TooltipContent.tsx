import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { TooltipContentProps } from './Tooltip.types';
import {
  tooltipArrowVariants,
  tooltipContentMotionVariants,
  tooltipContentVariants,
} from './Tooltip.variants';
import { TooltipContext, TooltipPortalContext } from './TooltipContext';

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset, children, portalContainer, defaultMotion, ...props }, ref) => {
  const { variant, size, arrow, motion: tooltipMotion } = React.useContext(TooltipContext);
  const motion = useDefaultMotion(defaultMotion ?? tooltipMotion);
  const insidePortal = React.useContext(TooltipPortalContext);

  const content = (
    // Reset for descendants: the flag only applies to the Content placed directly in a Portal.
    <TooltipPortalContext.Provider value={false}>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset ?? (arrow ? 7 : 3)}
        className={cn(
          tooltipContentVariants({ variant, size }),
          tooltipContentMotionVariants({ enabled: motion }),
          className,
        )}
        {...props}
      >
        {children}
        {arrow && (
          <div
            data-slot="tooltip-arrow"
            className={cn(tooltipArrowVariants({ variant }))}
            data-testid="tooltip-arrow"
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPortalContext.Provider>
  );

  // Portals to document.body by default, like Select.Content: rendered in place the tooltip is
  // clipped by a Modal / Sidepanel and trapped in their stacking context, below z-ws-popout.
  // Inside Tooltip.Portal it renders into that one, so the wrapper's container and forceMount win.
  // The Portal gates mounting on its own forceMount, so Content forceMount must reach it too.
  return insidePortal ? (
    content
  ) : (
    <TooltipPrimitive.Portal container={portalContainer} forceMount={props.forceMount}>
      {content}
    </TooltipPrimitive.Portal>
  );
});

TooltipContent.displayName = 'Tooltip.Content';
