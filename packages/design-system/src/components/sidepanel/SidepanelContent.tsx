import * as React from 'react';
import { cn } from 'src/lib/utils';

import { ScrollArea } from '../scroll-area/ScrollArea';
import type { SidepanelContentProps } from './Sidepanel.types';

const SidepanelContent = React.forwardRef<HTMLDivElement, SidepanelContentProps>(
  ({ className, wrapperClassName, ...props }, ref) => (
    <ScrollArea className={cn('min-h-0 min-w-0 grow', wrapperClassName)}>
      <div
        ref={ref}
        data-slot="sidepanel-content"
        className={cn('p-ws-12 min-h-full', className)}
        {...props}
      />
    </ScrollArea>
  ),
);

SidepanelContent.displayName = 'Sidepanel.Content';

export { SidepanelContent };
