import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { SidepanelHeaderProps } from './Sidepanel.types';

const SidepanelHeader = React.forwardRef<HTMLDivElement, SidepanelHeaderProps>(
  ({ className, divider = true, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidepanel-header"
      className={cn(
        'p-ws-12 flex flex-col',
        divider && 'border-ws-static-base border-b',
        className,
      )}
      {...props}
    />
  ),
);
SidepanelHeader.displayName = 'Sidepanel.Header';

export { SidepanelHeader };
