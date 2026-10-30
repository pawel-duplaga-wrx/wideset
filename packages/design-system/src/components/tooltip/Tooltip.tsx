import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { TooltipProps, TooltipTriggerProps } from './Tooltip.types';
import { TooltipContent } from './TooltipContent';
import { TooltipContext } from './TooltipContext';
import { TooltipDescription } from './TooltipDescription';
import { TooltipLabel } from './TooltipLabel';
import { TooltipPortal } from './TooltipPortal';

const Tooltip = ({
  children,
  variant = 'default',
  size = 'md',
  delayDuration = 100,
  arrow = true,
  defaultMotion,
  ...props
}: TooltipProps) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipContext.Provider value={{ variant, size, arrow, motion }}>
        <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
      </TooltipContext.Provider>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.displayName = 'Tooltip';
Tooltip.Content = TooltipContent;
export const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>((props, ref) => <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />);
TooltipTrigger.displayName = 'Tooltip.Trigger';
Tooltip.Trigger = TooltipTrigger;
Tooltip.Portal = TooltipPortal;
Tooltip.Label = TooltipLabel;
Tooltip.Description = TooltipDescription;

export { Tooltip, TooltipPortal };
