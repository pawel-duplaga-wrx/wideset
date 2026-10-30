import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { TooltipDescriptionProps } from './Tooltip.types';
import { tooltipDescriptionVariants } from './Tooltip.variants';
import { TooltipContext } from './TooltipContext';

export const TooltipDescription = React.forwardRef<HTMLParagraphElement, TooltipDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { variant, size } = React.useContext(TooltipContext);

    return (
      <p
        ref={ref}
        data-slot="tooltip-description"
        className={cn(tooltipDescriptionVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

TooltipDescription.displayName = 'Tooltip.Description';
