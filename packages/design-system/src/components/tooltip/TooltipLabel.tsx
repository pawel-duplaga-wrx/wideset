import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { TooltipLabelProps } from './Tooltip.types';
import { tooltipLabelVariants } from './Tooltip.variants';
import { TooltipContext } from './TooltipContext';

export const TooltipLabel = React.forwardRef<HTMLSpanElement, TooltipLabelProps>(
  ({ className, ...props }, ref) => {
    const { variant, size } = React.useContext(TooltipContext);

    return (
      <span
        ref={ref}
        data-slot="tooltip-label"
        className={cn(tooltipLabelVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

TooltipLabel.displayName = 'Tooltip.Label';
