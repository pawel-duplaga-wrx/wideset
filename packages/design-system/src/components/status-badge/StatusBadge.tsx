import React from 'react';
import { cn } from 'src/lib/utils';

import { StatusBadgeContext } from './StatusBadge.context';
import type { StatusBadgeProps, StatusBadgeWithSubComponents } from './StatusBadge.types';
import { statusBadgeVariants } from './StatusBadge.variants';
import { StatusBadgeIcon } from './StatusBadgeIcon';
import { StatusBadgeLabel } from './StatusBadgeLabel';

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ children, color, size, className, emphasis, shape, ...props }, ref) => {
    return (
      <StatusBadgeContext.Provider value={{ size }}>
        <div
          ref={ref}
          data-slot="status-badge"
          className={cn(statusBadgeVariants({ color, size, emphasis, shape }), className)}
          {...props}
        >
          {children}
        </div>
      </StatusBadgeContext.Provider>
    );
  },
) as StatusBadgeWithSubComponents;

StatusBadge.displayName = 'StatusBadge';
StatusBadge.Icon = StatusBadgeIcon;
StatusBadge.Label = StatusBadgeLabel;

export { StatusBadge };
