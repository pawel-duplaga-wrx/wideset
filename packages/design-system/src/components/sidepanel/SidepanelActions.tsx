import * as React from 'react';
import { cn } from 'src/lib/utils';

const SidepanelActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidepanel-actions"
      className={cn('top-ws-12 right-ws-12 gap-ws-5 absolute flex items-center', className)}
      {...props}
    />
  ),
);
SidepanelActions.displayName = 'Sidepanel.Actions';

export { SidepanelActions };
