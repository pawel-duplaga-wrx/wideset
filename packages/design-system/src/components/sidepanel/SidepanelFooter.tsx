import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { SidepanelFooterProps } from './Sidepanel.types';

const SidepanelFooter = React.forwardRef<HTMLDivElement, SidepanelFooterProps>(
  ({ className, divider = true, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sidepanel-footer"
      className={cn(
        'gap-ws-5 p-ws-12 flex',
        divider && 'border-ws-static-base border-t',
        className,
      )}
      {...props}
    />
  ),
);
SidepanelFooter.displayName = 'Sidepanel.Footer';

export { SidepanelFooter };
